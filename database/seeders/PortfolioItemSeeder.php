<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolioItems = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A modern e-commerce solution built with Laravel and React, featuring advanced inventory management and payment processing.',
                'content' => '<p>This comprehensive e-commerce platform was designed to handle high-volume transactions while providing an intuitive user experience for both customers and administrators.</p>',
                'category' => 'Web Development',
                'technologies' => json_encode(['Laravel', 'React', 'MySQL', 'Stripe API', 'AWS']),
                'client_name' => 'TechStore Inc.',
                'project_url' => 'https://example.com/project1',
                'featured_image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
                'completed_at' => '2024-03-15',
                'is_featured' => true,
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Healthcare Management System',
                'description' => 'A comprehensive healthcare management system for clinics and hospitals to manage patients, appointments, and medical records.',
                'content' => '<p>This system streamlines healthcare operations by providing doctors and staff with an integrated platform for patient management.</p>',
                'category' => 'Web Application',
                'technologies' => json_encode(['Laravel', 'Vue.js', 'PostgreSQL', 'Docker', 'Redis']),
                'client_name' => 'MediCare Solutions',
                'project_url' => 'https://example.com/project2',
                'featured_image' => 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
                'completed_at' => '2024-02-20',
                'is_featured' => true,
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Restaurant Mobile App',
                'description' => 'A mobile application for restaurants to manage orders, reservations, and customer relationships.',
                'content' => '<p>This React Native app provides restaurants with a complete solution for mobile ordering and customer engagement.</p>',
                'category' => 'Mobile Development',
                'technologies' => json_encode(['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Stripe']),
                'client_name' => 'Gourmet Bistro',
                'project_url' => 'https://example.com/project3',
                'featured_image' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
                'completed_at' => '2024-01-10',
                'is_featured' => true,
                'is_active' => true,
                'order' => 3,
            ],
            [
                'title' => 'Corporate Website',
                'description' => 'A professional corporate website with CMS functionality for a consulting firm.',
                'content' => '<p>A clean, professional website that showcases the company\'s services and expertise while providing easy content management.</p>',
                'category' => 'Web Design',
                'technologies' => json_encode(['Laravel', 'Tailwind CSS', 'Inertia.js', 'MySQL']),
                'client_name' => 'Business Consultants LLC',
                'project_url' => 'https://example.com/project4',
                'featured_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                'completed_at' => '2023-12-05',
                'is_featured' => true,
                'is_active' => true,
                'order' => 4,
            ],
            [
                'title' => 'Learning Management System',
                'description' => 'An online learning platform with course management, student tracking, and assessment tools.',
                'content' => '<p>A comprehensive LMS that enables educational institutions to deliver online courses effectively.</p>',
                'category' => 'Education Technology',
                'technologies' => json_encode(['Laravel', 'Vue.js', 'MySQL', 'FFmpeg', 'AWS S3']),
                'client_name' => 'EduTech Academy',
                'project_url' => 'https://example.com/project5',
                'featured_image' => 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
                'completed_at' => '2023-11-18',
                'is_featured' => true,
                'is_active' => true,
                'order' => 5,
            ],
            [
                'title' => 'Real Estate Portal',
                'description' => 'A property listing and management portal with advanced search and mapping features.',
                'content' => '<p>This portal connects buyers, sellers, and real estate agents with powerful search and listing management tools.</p>',
                'category' => 'Web Development',
                'technologies' => json_encode(['Laravel', 'React', 'PostgreSQL', 'Google Maps API', 'Elasticsearch']),
                'client_name' => 'Prime Properties',
                'project_url' => 'https://example.com/project6',
                'featured_image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
                'completed_at' => '2023-10-25',
                'is_featured' => true,
                'is_active' => true,
                'order' => 6,
            ]
        ];

        foreach ($portfolioItems as $item) {
            \App\Models\PortfolioItem::create($item);
        }
    }
}
