<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HomeSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'name' => 'hero',
                'title' => 'Welcome to GDCA',
                'subtitle' => 'Professional Web Development & Digital Solutions',
                'content' => '<p>We create stunning websites and digital experiences that help businesses grow and succeed online. With cutting-edge technology and creative design, we bring your vision to life.</p>',
                'is_active' => true,
                'order' => 1,
                'settings' => json_encode([
                    'button_text' => 'Get Started',
                    'button_link' => '/contact',
                    'secondary_button_text' => 'Learn More',
                    'secondary_button_link' => '/about'
                ]),
                'background_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
            ],
            [
                'name' => 'about',
                'title' => 'About GDCA',
                'subtitle' => 'Your Trusted Digital Partner',
                'content' => '<p>With over 5 years of experience in web development and digital solutions, GDCA has helped numerous businesses establish their online presence and achieve their digital goals.</p><p>Our team of experienced developers, designers, and digital strategists work together to deliver exceptional results that exceed expectations.</p>',
                'is_active' => true,
                'order' => 2,
                'settings' => json_encode([
                    'stats' => [
                        ['label' => 'Projects Completed', 'value' => '50+'],
                        ['label' => 'Years Experience', 'value' => '5+'],
                        ['label' => 'Happy Clients', 'value' => '40+'],
                        ['label' => 'Team Members', 'value' => '10+']
                    ]
                ]),
            ],
            [
                'name' => 'services',
                'title' => 'Our Services',
                'subtitle' => 'Comprehensive Digital Solutions for Your Business',
                'content' => '<p>We offer a wide range of digital services to help your business succeed online.</p>',
                'is_active' => true,
                'order' => 3,
                'settings' => json_encode([
                    'services' => [
                        [
                            'title' => 'Web Development',
                            'description' => 'Custom websites and web applications built with modern technologies.',
                            'icon' => '🚀'
                        ],
                        [
                            'title' => 'Mobile Apps',
                            'description' => 'Native and cross-platform mobile applications for iOS and Android.',
                            'icon' => '📱'
                        ],
                        [
                            'title' => 'UI/UX Design',
                            'description' => 'Beautiful and intuitive user interfaces designed for optimal user experience.',
                            'icon' => '🎨'
                        ],
                        [
                            'title' => 'Digital Marketing',
                            'description' => 'Comprehensive digital marketing strategies to grow your online presence.',
                            'icon' => '📈'
                        ]
                    ]
                ]),
            ],
            [
                'name' => 'portfolio',
                'title' => 'Our Work',
                'subtitle' => 'Take a look at some of our recent projects',
                'content' => '<p>We\'re proud of the work we\'ve done and the success our clients have achieved.</p>',
                'is_active' => true,
                'order' => 4,
            ],
            [
                'name' => 'testimonials',
                'title' => 'What Our Clients Say',
                'subtitle' => 'Don\'t take our word for it - hear from our satisfied clients',
                'content' => '<p>Our clients\' success is our success. Here\'s what they have to say about working with us.</p>',
                'is_active' => true,
                'order' => 5,
            ],
            [
                'name' => 'contact',
                'title' => 'Get In Touch',
                'subtitle' => 'Ready to start your next project? Let\'s discuss how we can help you achieve your goals.',
                'content' => '<p>We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.</p>',
                'is_active' => true,
                'order' => 6,
                'settings' => json_encode([
                    'contact_info' => [
                        'address' => '123 Business St, Suite 100, City, State 12345',
                        'phone' => '+1 (555) 123-4567',
                        'email' => 'hello@gdca.com'
                    ]
                ]),
            ]
        ];

        foreach ($sections as $section) {
            \App\Models\HomeSection::create($section);
        }
    }
}
