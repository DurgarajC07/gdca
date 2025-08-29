<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    /**
     * Display a page by its slug.
     */
    public function show(Request $request, $slug = null)
    {
        // Default to 'home' if no slug provided
        if (empty($slug)) {
            $slug = 'home';
        }

        // Try to get page from cache first
        $page = Cache::remember("page.{$slug}", 3600, function () use ($slug) {
            return Page::where('slug', $slug)
                ->where('status', 'published')
                ->first();
        });

        if (!$page) {
            abort(404);
        }

        // If this is the homepage, get additional data
        $homeSections = [];
        $portfolioItems = [];
        $renderComponent = 'Public/Page';
        
        if ($slug === 'home') {
            // Get homepage sections
            $homeSections = Cache::remember('home.sections', 3600, function () {
                return \App\Models\HomeSection::active()->ordered()->get();
            });
            
            // Get featured portfolio items for homepage
            $portfolioItems = Cache::remember('home.portfolio', 3600, function () {
                return \App\Models\PortfolioItem::active()->featured()->ordered()->limit(6)->get();
            });
            
            $renderComponent = 'Public/HomePage';
        }

        // Get navigation data with caching
        $navigationMenu = Cache::remember('navigation.menu', 3600, function () {
            // Get menu items from the main navigation menu
            return MenuItem::with(['page'])
                ->whereHas('menu', function ($query) {
                    $query->where('location', 'header');
                })
                ->whereNull('parent_id')
                ->where('is_active', true)
                ->orderBy('order')
                ->get();
        });

        // Get site settings with caching
        $siteSettings = Cache::remember('site.settings', 3600, function () {
            return SiteSetting::all()->pluck('value', 'key');
        });

        // Get forms referenced in the page content
        $formIds = [];
        preg_match_all('/\[form\s+id=(\d+)\]/', $page->content, $matches);
        if (!empty($matches[1])) {
            $formIds = array_unique($matches[1]);
        }

        $forms = [];
        if (!empty($formIds)) {
            $forms = \App\Models\Form::whereIn('id', $formIds)
                ->where('is_active', true)
                ->get()
                ->keyBy('id');
        }

        return Inertia::render($renderComponent, [
            'page' => $page,
            'navigationMenu' => $navigationMenu,
            'siteSettings' => $siteSettings,
            'forms' => $forms,
            'homeSections' => $homeSections,
            'portfolioItems' => $portfolioItems,
            'seo' => [
                'title' => $page->seo_title ?: $page->title,
                'description' => $page->seo_description,
                'keywords' => $page->seo_keywords,
                'canonical' => url($page->slug),
                'ogImage' => $page->featured_image,
            ],
        ]);
    }
}
