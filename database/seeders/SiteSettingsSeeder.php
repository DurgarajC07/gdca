<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            ['key' => 'site.name', 'value' => 'GDCA Website', 'group' => 'General'],
            ['key' => 'site.tagline', 'value' => 'Your trusted partner', 'group' => 'General'],
            ['key' => 'site.description', 'value' => 'Welcome to our professional website', 'group' => 'General'],
            ['key' => 'site.email', 'value' => 'info@gdca.com', 'group' => 'General'],
            ['key' => 'site.phone', 'value' => '+1 (555) 123-4567', 'group' => 'General'],
            ['key' => 'site.address', 'value' => '123 Main Street, City, State 12345', 'group' => 'General'],
            
            // Theme Settings
            ['key' => 'theme.primary_color', 'value' => '#3B82F6', 'group' => 'Theme'],
            ['key' => 'theme.secondary_color', 'value' => '#64748B', 'group' => 'Theme'],
            ['key' => 'theme.font_family', 'value' => 'Inter', 'group' => 'Theme'],
            
            // Homepage Settings
            ['key' => 'home.hero_title', 'value' => 'Welcome to GDCA', 'group' => 'Homepage'],
            ['key' => 'home.hero_subtitle', 'value' => 'Your trusted partner for professional services', 'group' => 'Homepage'],
            ['key' => 'home.hero_cta_text', 'value' => 'Get Started', 'group' => 'Homepage'],
            ['key' => 'home.hero_cta_url', 'value' => '/contact', 'group' => 'Homepage'],
            
            // SEO Settings
            ['key' => 'seo.meta_title', 'value' => 'GDCA - Professional Services', 'group' => 'SEO'],
            ['key' => 'seo.meta_description', 'value' => 'Professional services and solutions for your business needs.', 'group' => 'SEO'],
            ['key' => 'seo.meta_keywords', 'value' => 'professional, services, business, consulting', 'group' => 'SEO'],
            
            // Social Media
            ['key' => 'social.facebook', 'value' => '', 'group' => 'Social'],
            ['key' => 'social.twitter', 'value' => '', 'group' => 'Social'],
            ['key' => 'social.linkedin', 'value' => '', 'group' => 'Social'],
            ['key' => 'social.instagram', 'value' => '', 'group' => 'Social'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
