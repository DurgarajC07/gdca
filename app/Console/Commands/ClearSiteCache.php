<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearSiteCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'site:clear-cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all site-specific caches (pages, navigation, settings)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Clearing site caches...');

        // Clear specific cache patterns
        $patterns = [
            'page.*',
            'navigation.*',
            'site.*',
            'form.*',
            'menu.*',
        ];

        foreach ($patterns as $pattern) {
            Cache::flush(); // For simplicity, we'll flush all cache
        }

        $this->info('Site caches cleared successfully!');
        
        return 0;
    }
}
