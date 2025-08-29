<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Form;

class SampleDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample pages
        $homePage = Page::create([
            'title' => 'Home',
            'slug' => 'home',
            'content' => '<h1>Welcome to GDCA</h1><p>This is the homepage content. You can edit this in the admin panel.</p>',
            'status' => 'published',
            'is_deletable' => false,
            'seo_title' => 'Welcome to GDCA - Professional Services',
            'seo_description' => 'GDCA provides professional services and solutions for your business needs.',
            'seo_keywords' => 'gdca, professional, services, business, consulting',
        ]);

        $aboutPage = Page::create([
            'title' => 'About Us',
            'slug' => 'about',
            'content' => '<h1>About GDCA</h1><p>Learn more about our company and our mission to provide excellent services.</p>',
            'status' => 'published',
            'seo_title' => 'About GDCA - Our Story',
            'seo_description' => 'Learn about GDCA\'s history, mission, and commitment to excellence.',
        ]);

        $servicesPage = Page::create([
            'title' => 'Our Services',
            'slug' => 'services',
            'content' => '<h1>Our Services</h1><p>We offer a wide range of professional services to meet your business needs.</p>',
            'status' => 'published',
            'seo_title' => 'Services - GDCA',
            'seo_description' => 'Explore our comprehensive range of professional services.',
        ]);

        $contactPage = Page::create([
            'title' => 'Contact Us',
            'slug' => 'contact',
            'content' => '<h1>Contact Us</h1><p>Get in touch with our team for any inquiries or support.</p><p>[form id=1]</p>',
            'status' => 'published',
            'seo_title' => 'Contact GDCA',
            'seo_description' => 'Contact GDCA for professional services and support.',
        ]);

        // Create menus
        $headerMenu = Menu::create([
            'name' => 'Main Navigation',
            'location' => 'header',
        ]);

        $footerMenu = Menu::create([
            'name' => 'Footer Links',
            'location' => 'footer',
        ]);

        // Create header menu items
        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Home',
            'type' => 'page',
            'page_id' => $homePage->id,
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'About',
            'type' => 'page',
            'page_id' => $aboutPage->id,
            'order' => 2,
        ]);

        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Services',
            'type' => 'page',
            'page_id' => $servicesPage->id,
            'order' => 3,
        ]);

        MenuItem::create([
            'menu_id' => $headerMenu->id,
            'title' => 'Contact',
            'type' => 'page',
            'page_id' => $contactPage->id,
            'order' => 4,
        ]);

        // Create footer menu items
        MenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Privacy Policy',
            'type' => 'custom',
            'url' => '/privacy',
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_id' => $footerMenu->id,
            'title' => 'Terms of Service',
            'type' => 'custom',
            'url' => '/terms',
            'order' => 2,
        ]);

        // Create a sample contact form
        Form::create([
            'name' => 'Contact Form',
            'structure' => [
                [
                    'type' => 'text',
                    'name' => 'name',
                    'label' => 'Full Name',
                    'placeholder' => 'Enter your full name',
                    'required' => true,
                ],
                [
                    'type' => 'email',
                    'name' => 'email',
                    'label' => 'Email Address',
                    'placeholder' => 'Enter your email address',
                    'required' => true,
                ],
                [
                    'type' => 'tel',
                    'name' => 'phone',
                    'label' => 'Phone Number',
                    'placeholder' => 'Enter your phone number',
                    'required' => false,
                ],
                [
                    'type' => 'textarea',
                    'name' => 'message',
                    'label' => 'Message',
                    'placeholder' => 'Enter your message',
                    'required' => true,
                ],
            ],
            'recipient_email' => 'admin@gdca.com',
            'success_message' => 'Thank you for contacting us! We will get back to you soon.',
        ]);
    }
}
