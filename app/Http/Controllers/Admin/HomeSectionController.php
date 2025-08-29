<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeSectionController extends Controller
{
    public function index()
    {
        $sections = HomeSection::ordered()->get();
        
        return Inertia::render('Admin/HomeSections/Index', [
            'sections' => $sections,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/HomeSections/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'content' => 'nullable|string',
            'settings' => 'nullable|array',
            'background_image' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        HomeSection::create($validated);

        return redirect()->route('admin.home-sections.index')
            ->with('success', 'Home section created successfully.');
    }

    public function show(HomeSection $homeSection)
    {
        return Inertia::render('Admin/HomeSections/Show', [
            'section' => $homeSection,
        ]);
    }

    public function edit(HomeSection $homeSection)
    {
        return Inertia::render('Admin/HomeSections/Edit', [
            'section' => $homeSection,
        ]);
    }

    public function update(Request $request, HomeSection $homeSection)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'content' => 'nullable|string',
            'settings' => 'nullable|array',
            'background_image' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        $homeSection->update($validated);

        return redirect()->route('admin.home-sections.index')
            ->with('success', 'Home section updated successfully.');
    }

    public function destroy(HomeSection $homeSection)
    {
        $homeSection->delete();

        return redirect()->route('admin.home-sections.index')
            ->with('success', 'Home section deleted successfully.');
    }
}
