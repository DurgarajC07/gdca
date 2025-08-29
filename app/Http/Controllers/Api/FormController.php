<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    /**
     * Display the specified form structure.
     */
    public function show(Form $form)
    {
        return response()->json([
            'id' => $form->id,
            'name' => $form->name,
            'structure' => $form->structure,
            'success_message' => $form->success_message,
        ]);
    }
}
