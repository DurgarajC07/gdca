<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    /**
     * Generate and return sitemap.xml
     */
    public function generate()
    {
        $sitemap = Sitemap::create();

        // Add published pages
        Page::where('status', 'published')->each(function (Page $page) use ($sitemap) {
            $sitemap->add(
                Url::create(url($page->slug))
                    ->setLastModificationDate($page->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.8)
            );
        });

        // Add static routes if needed
        $sitemap->add(
            Url::create(url('/'))
                ->setLastModificationDate(now())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(1.0)
        );

        return $sitemap->toResponse($request ?? request());
    }
}
