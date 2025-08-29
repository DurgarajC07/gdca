<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MenuItem::with(['children', 'page'])
            ->whereNull('parent_id')
            ->orderBy('order');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $menuItems = $query->get();

        return Inertia::render('Admin/MenuItems/Index', [
            'menuItems' => $menuItems,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pages = Page::where('is_published', true)
            ->orderBy('title')
            ->get(['id', 'title']);

        $menuItems = MenuItem::whereNull('parent_id')
            ->orderBy('order')
            ->get(['id', 'title']);

        return Inertia::render('Admin/MenuItems/Create', [
            'pages' => $pages,
            'menuItems' => $menuItems,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:page,url,route',
            'page_id' => 'nullable|exists:pages,id',
            'url' => 'nullable|url',
            'route' => 'nullable|string',
            'parent_id' => 'nullable|exists:menu_items,id',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
            'target' => 'in:_self,_blank',
            'css_class' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        // Validate based on type
        if ($validated['type'] === 'page' && empty($validated['page_id'])) {
            return back()->withErrors(['page_id' => 'Page is required when type is page.']);
        }

        if ($validated['type'] === 'url' && empty($validated['url'])) {
            return back()->withErrors(['url' => 'URL is required when type is url.']);
        }

        if ($validated['type'] === 'route' && empty($validated['route'])) {
            return back()->withErrors(['route' => 'Route is required when type is route.']);
        }

        // Set order if not provided
        if (!isset($validated['order'])) {
            $maxOrder = MenuItem::where('parent_id', $validated['parent_id'] ?? null)->max('order') ?? -1;
            $validated['order'] = $maxOrder + 1;
        }

        MenuItem::create($validated);

        return redirect()->route('admin.menu-items.index')
            ->with('success', 'Menu item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MenuItem $menuItem)
    {
        $menuItem->load(['children', 'page', 'parent']);

        return Inertia::render('Admin/MenuItems/Show', [
            'menuItem' => $menuItem,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MenuItem $menuItem)
    {
        $pages = Page::where('is_published', true)
            ->orderBy('title')
            ->get(['id', 'title']);

        $menuItems = MenuItem::whereNull('parent_id')
            ->where('id', '!=', $menuItem->id)
            ->orderBy('order')
            ->get(['id', 'title']);

        return Inertia::render('Admin/MenuItems/Edit', [
            'menuItem' => $menuItem,
            'pages' => $pages,
            'menuItems' => $menuItems,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:page,url,route',
            'page_id' => 'nullable|exists:pages,id',
            'url' => 'nullable|url',
            'route' => 'nullable|string',
            'parent_id' => 'nullable|exists:menu_items,id',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
            'target' => 'in:_self,_blank',
            'css_class' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        // Validate based on type
        if ($validated['type'] === 'page' && empty($validated['page_id'])) {
            return back()->withErrors(['page_id' => 'Page is required when type is page.']);
        }

        if ($validated['type'] === 'url' && empty($validated['url'])) {
            return back()->withErrors(['url' => 'URL is required when type is url.']);
        }

        if ($validated['type'] === 'route' && empty($validated['route'])) {
            return back()->withErrors(['route' => 'Route is required when type is route.']);
        }

        // Prevent setting self as parent
        if (isset($validated['parent_id']) && $validated['parent_id'] == $menuItem->id) {
            return back()->withErrors(['parent_id' => 'Cannot set item as its own parent.']);
        }

        // Prevent circular references
        if (isset($validated['parent_id'])) {
            $parent = MenuItem::find($validated['parent_id']);
            if ($parent && $parent->parent_id == $menuItem->id) {
                return back()->withErrors(['parent_id' => 'Cannot create circular reference.']);
            }
        }

        $menuItem->update($validated);

        return redirect()->route('admin.menu-items.index')
            ->with('success', 'Menu item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MenuItem $menuItem)
    {
        // Delete children first
        $menuItem->children()->delete();
        
        // Delete the menu item
        $menuItem->delete();

        return redirect()->route('admin.menu-items.index')
            ->with('success', 'Menu item and its children deleted successfully.');
    }

    /**
     * Reorder menu items
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:menu_items,id',
            'items.*.order' => 'required|integer|min:0',
            'items.*.parent_id' => 'nullable|exists:menu_items,id',
        ]);

        foreach ($validated['items'] as $item) {
            MenuItem::where('id', $item['id'])->update([
                'order' => $item['order'],
                'parent_id' => $item['parent_id'],
            ]);
        }

        return response()->json(['success' => true]);
    }
}
