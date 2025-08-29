<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'pages' => Page::count(),
            'publishedPages' => Page::where('status', 'published')->count(),
            'menuItems' => MenuItem::count(),
            'forms' => Form::count(),
            'submissions' => FormSubmission::count(),
            'subscribers' => Subscriber::where('status', 'subscribed')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}
