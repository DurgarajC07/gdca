<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use Illuminate\Http\Request;

class FormSubmissionController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FormSubmission $submission)
    {
        $submission->delete();

        return redirect()->back()
            ->with('success', 'Submission deleted successfully.');
    }
}
