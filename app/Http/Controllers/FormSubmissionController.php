<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class FormSubmissionController extends Controller
{
    /**
     * Handle form submission.
     */
    public function store(Request $request, Form $form)
    {
        // Get the form structure to validate against
        $rules = [];
        foreach ($form->structure as $field) {
            $fieldRules = [];
            
            if ($field['required'] ?? false) {
                $fieldRules[] = 'required';
            }
            
            switch ($field['type']) {
                case 'email':
                    $fieldRules[] = 'email';
                    break;
                case 'number':
                    $fieldRules[] = 'numeric';
                    break;
                case 'tel':
                    $fieldRules[] = 'string';
                    break;
                default:
                    $fieldRules[] = 'string';
            }
            
            if (!empty($fieldRules)) {
                $rules[$field['name']] = implode('|', $fieldRules);
            }
        }

        $validator = Validator::make($request->all(), $rules);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Store the submission
        $submission = FormSubmission::create([
            'form_id' => $form->id,
            'data' => $request->only(array_column($form->structure, 'name')),
            'ip_address' => $request->ip(),
        ]);

        // Send notification email
        if ($form->recipient_email) {
            $this->sendNotificationEmail($form, $submission);
        }

        return response()->json([
            'success' => true,
            'message' => $form->success_message ?: 'Thank you for your submission!'
        ]);
    }

    /**
     * Handle newsletter subscription.
     */
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:subscribers,email'
        ]);

        Subscriber::create([
            'email' => $request->email,
        ]);

        return back()->with('success', 'Thank you for subscribing to our newsletter!');
    }

    /**
     * Handle newsletter unsubscription.
     */
    public function unsubscribe($token)
    {
        $subscriber = Subscriber::where('token', $token)->firstOrFail();
        $subscriber->update(['status' => 'unsubscribed']);

        return redirect('/')->with('success', 'You have been unsubscribed successfully.');
    }

    /**
     * Send notification email for form submission.
     */
    private function sendNotificationEmail(Form $form, FormSubmission $submission)
    {
        $data = [
            'form_name' => $form->name,
            'submission_data' => $submission->data,
            'submitted_at' => $submission->created_at->format('Y-m-d H:i:s'),
            'ip_address' => $submission->ip_address,
        ];

        // Simple mail sending - you can enhance this with email templates later
        Mail::raw(
            "New form submission for: {$form->name}\n\n" .
            "Submitted at: {$data['submitted_at']}\n" .
            "IP Address: {$data['ip_address']}\n\n" .
            "Data:\n" . json_encode($submission->data, JSON_PRETTY_PRINT),
            function ($message) use ($form) {
                $message->to($form->recipient_email)
                        ->subject("New Form Submission: {$form->name}");
            }
        );
    }
}
