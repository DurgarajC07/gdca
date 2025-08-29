<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Form::withCount('submissions');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $forms = $query->latest()->get();

        return Inertia::render('Admin/Forms/Index', [
            'forms' => $forms,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Forms/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.id' => 'required|string',
            'fields.*.type' => 'required|string',
            'fields.*.label' => 'required|string',
            'fields.*.name' => 'required|string',
            'fields.*.placeholder' => 'nullable|string',
            'fields.*.required' => 'boolean',
            'fields.*.options' => 'nullable|array',
            'success_message' => 'required|string',
            'is_active' => 'boolean',
            'email_notifications' => 'boolean',
            'notification_email' => 'nullable|email',
        ]);

        // Clean up field data - remove id and ensure proper structure
        $fields = array_map(function ($field) {
            unset($field['id']); // Remove frontend-only id
            return $field;
        }, $validated['fields']);

        // Store fields as structure
        $validated['structure'] = $fields;
        unset($validated['fields']);

        Form::create($validated);

        return redirect()->route('admin.forms.index')
            ->with('success', 'Form created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        $form->load(['submissions' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('Admin/Forms/Show', [
            'form' => $form,
            'submissions' => $form->submissions,
            'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form)
    {
        // Add frontend IDs to fields for the form builder
        $fields = collect($form->fields)->map(function ($field, $index) {
            $field['id'] = 'field_' . $index . '_' . time();
            return $field;
        })->toArray();

        $form->fields = $fields;

        return Inertia::render('Admin/Forms/Edit', [
            'form' => $form,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Form $form)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.id' => 'nullable|string',
            'fields.*.type' => 'required|string',
            'fields.*.label' => 'required|string',
            'fields.*.name' => 'required|string',
            'fields.*.placeholder' => 'nullable|string',
            'fields.*.required' => 'boolean',
            'fields.*.options' => 'nullable|array',
            'success_message' => 'required|string',
            'is_active' => 'boolean',
            'email_notifications' => 'boolean',
            'notification_email' => 'nullable|email',
        ]);

        // Clean up field data - remove id and ensure proper structure
        $fields = array_map(function ($field) {
            unset($field['id']); // Remove frontend-only id
            return $field;
        }, $validated['fields']);

        // Store fields as structure
        $validated['structure'] = $fields;
        unset($validated['fields']);

        $form->update($validated);

        return redirect()->route('admin.forms.index')
            ->with('success', 'Form updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        // Delete all submissions first
        $form->submissions()->delete();
        
        // Delete the form
        $form->delete();

        return redirect()->route('admin.forms.index')
            ->with('success', 'Form and all submissions deleted successfully.');
    }

    /**
     * Export form submissions as CSV
     */
    public function export(Form $form)
    {
        $submissions = $form->submissions()->latest()->get();
        
        if ($submissions->isEmpty()) {
            return redirect()->back()
                ->with('error', 'No submissions to export.');
        }

        $filename = str_replace(' ', '_', strtolower($form->name)) . '_submissions_' . now()->format('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($submissions, $form) {
            $file = fopen('php://output', 'w');
            
            // Get all possible field names
            $fieldNames = collect($form->fields)->pluck('name')->toArray();
            $headers = array_merge(['Submitted At'], $fieldNames);
            
            fputcsv($file, $headers);

            foreach ($submissions as $submission) {
                $row = [$submission->created_at->format('Y-m-d H:i:s')];
                
                foreach ($fieldNames as $fieldName) {
                    $value = $submission->data[$fieldName] ?? '';
                    if (is_array($value)) {
                        $value = implode(', ', $value);
                    }
                    $row[] = $value;
                }
                
                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
