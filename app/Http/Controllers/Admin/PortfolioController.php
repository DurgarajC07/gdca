<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = PortfolioItem::query();

        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('client_name', 'like', '%' . $request->search . '%');
            });
        }

        $portfolio = $query->ordered()->latest()->get();
        $categories = PortfolioItem::distinct()->pluck('category')->filter();

        return Inertia::render('Admin/Portfolio/Index', [
            'portfolioItems' => $portfolio,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Portfolio/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'technologies' => 'nullable|array',
            'client_name' => 'nullable|string|max:255',
            'project_url' => 'nullable|url',
            'featured_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'completed_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        PortfolioItem::create($validated);

        return redirect()->route('admin.portfolio.index')
            ->with('success', 'Portfolio item created successfully.');
    }

    public function show(PortfolioItem $portfolio)
    {
        return Inertia::render('Admin/Portfolio/Show', [
            'item' => $portfolio,
        ]);
    }

    public function edit(PortfolioItem $portfolio)
    {
        return Inertia::render('Admin/Portfolio/Edit', [
            'item' => $portfolio,
        ]);
    }

    public function update(Request $request, PortfolioItem $portfolio)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'technologies' => 'nullable|array',
            'client_name' => 'nullable|string|max:255',
            'project_url' => 'nullable|url',
            'featured_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'completed_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        $portfolio->update($validated);

        return redirect()->route('admin.portfolio.index')
            ->with('success', 'Portfolio item updated successfully.');
    }

    public function destroy(PortfolioItem $portfolio)
    {
        $portfolio->delete();

        return redirect()->route('admin.portfolio.index')
            ->with('success', 'Portfolio item deleted successfully.');
    }
}
