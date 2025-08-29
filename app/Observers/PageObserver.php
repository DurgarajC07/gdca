<?php

namespace App\Observers;

use App\Models\Page;
use Illuminate\Support\Facades\Cache;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     */
    public function created(Page $page): void
    {
        $this->clearPageCache($page);
    }

    /**
     * Handle the Page "updated" event.
     */
    public function updated(Page $page): void
    {
        $this->clearPageCache($page);
    }

    /**
     * Handle the Page "deleted" event.
     */
    public function deleted(Page $page): void
    {
        $this->clearPageCache($page);
    }

    /**
     * Clear relevant caches when page changes
     */
    private function clearPageCache(Page $page): void
    {
        // Clear specific page cache
        Cache::forget("page.{$page->slug}");
        
        // Clear navigation cache as pages might be in menus
        Cache::forget('navigation.menu');
        
        // Clear sitemap cache
        Cache::forget('sitemap');
    }
}
