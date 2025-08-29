<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    /**
     * Display the site settings interface.
     */
    public function index()
    {
        $settings = SiteSetting::pluck('value', 'key')->toArray();
        $settingsGroups = $this->getSettingsGroups();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'settingsGroups' => $settingsGroups,
        ]);
    }

    /**
     * Update site settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($validated['settings'] as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()
            ->with('success', 'Settings updated successfully.');
    }

    /**
     * Define the settings groups and their structure.
     */
    private function getSettingsGroups()
    {
        return [
            'general' => [
                [
                    'name' => 'Site Information',
                    'settings' => [
                        [
                            'key' => 'site_name',
                            'label' => 'Site Name',
                            'type' => 'text',
                            'description' => 'The name of your website',
                            'placeholder' => 'GDCA Website',
                            'required' => true,
                        ],
                        [
                            'key' => 'site_description',
                            'label' => 'Site Description',
                            'type' => 'textarea',
                            'description' => 'A brief description of your website',
                            'placeholder' => 'A professional website for GDCA',
                        ],
                        [
                            'key' => 'contact_email',
                            'label' => 'Contact Email',
                            'type' => 'email',
                            'description' => 'Primary contact email address',
                            'placeholder' => 'contact@gdca.com',
                        ],
                        [
                            'key' => 'contact_phone',
                            'label' => 'Contact Phone',
                            'type' => 'text',
                            'description' => 'Primary contact phone number',
                            'placeholder' => '+1 (555) 123-4567',
                        ],
                        [
                            'key' => 'address',
                            'label' => 'Address',
                            'type' => 'textarea',
                            'description' => 'Physical address',
                            'placeholder' => '123 Main St, City, State 12345',
                        ],
                    ],
                ],
            ],
            'appearance' => [
                [
                    'name' => 'Theme Settings',
                    'settings' => [
                        [
                            'key' => 'primary_color',
                            'label' => 'Primary Color',
                            'type' => 'color',
                            'description' => 'Main brand color',
                            'default_value' => '#3b82f6',
                        ],
                        [
                            'key' => 'secondary_color',
                            'label' => 'Secondary Color',
                            'type' => 'color',
                            'description' => 'Secondary brand color',
                            'default_value' => '#64748b',
                        ],
                        [
                            'key' => 'logo',
                            'label' => 'Logo',
                            'type' => 'image',
                            'description' => 'Main site logo',
                        ],
                        [
                            'key' => 'favicon',
                            'label' => 'Favicon',
                            'type' => 'image',
                            'description' => 'Site favicon (16x16 or 32x32 px)',
                        ],
                    ],
                ],
                [
                    'name' => 'Layout Settings',
                    'settings' => [
                        [
                            'key' => 'header_fixed',
                            'label' => 'Fixed Header',
                            'type' => 'boolean',
                            'description' => 'Make the header stick to the top when scrolling',
                        ],
                        [
                            'key' => 'show_breadcrumbs',
                            'label' => 'Show Breadcrumbs',
                            'type' => 'boolean',
                            'description' => 'Display breadcrumb navigation',
                        ],
                        [
                            'key' => 'footer_text',
                            'label' => 'Footer Text',
                            'type' => 'textarea',
                            'description' => 'Custom footer text',
                            'placeholder' => '© 2024 GDCA. All rights reserved.',
                        ],
                    ],
                ],
            ],
            'seo' => [
                [
                    'name' => 'Search Engine Optimization',
                    'settings' => [
                        [
                            'key' => 'meta_title',
                            'label' => 'Default Meta Title',
                            'type' => 'text',
                            'description' => 'Default title for SEO',
                            'placeholder' => 'GDCA - Professional Services',
                        ],
                        [
                            'key' => 'meta_description',
                            'label' => 'Default Meta Description',
                            'type' => 'textarea',
                            'description' => 'Default description for SEO',
                            'placeholder' => 'Professional services and consulting',
                        ],
                        [
                            'key' => 'meta_keywords',
                            'label' => 'Meta Keywords',
                            'type' => 'text',
                            'description' => 'Comma-separated keywords',
                            'placeholder' => 'gdca, consulting, professional, services',
                        ],
                        [
                            'key' => 'og_image',
                            'label' => 'Open Graph Image',
                            'type' => 'image',
                            'description' => 'Default image for social media sharing',
                        ],
                    ],
                ],
                [
                    'name' => 'Analytics',
                    'settings' => [
                        [
                            'key' => 'google_analytics_id',
                            'label' => 'Google Analytics ID',
                            'type' => 'text',
                            'description' => 'Google Analytics tracking ID',
                            'placeholder' => 'GA-XXXXXXXXXX',
                        ],
                        [
                            'key' => 'google_tag_manager_id',
                            'label' => 'Google Tag Manager ID',
                            'type' => 'text',
                            'description' => 'Google Tag Manager container ID',
                            'placeholder' => 'GTM-XXXXXXX',
                        ],
                    ],
                ],
            ],
            'media' => [
                [
                    'name' => 'Upload Settings',
                    'settings' => [
                        [
                            'key' => 'max_upload_size',
                            'label' => 'Max Upload Size (MB)',
                            'type' => 'number',
                            'description' => 'Maximum file upload size in megabytes',
                            'default_value' => '10',
                        ],
                        [
                            'key' => 'allowed_file_types',
                            'label' => 'Allowed File Types',
                            'type' => 'text',
                            'description' => 'Comma-separated file extensions',
                            'placeholder' => 'jpg,png,gif,pdf,doc,docx',
                        ],
                    ],
                ],
            ],
            'email' => [
                [
                    'name' => 'SMTP Settings',
                    'settings' => [
                        [
                            'key' => 'mail_from_address',
                            'label' => 'From Email',
                            'type' => 'email',
                            'description' => 'Default sender email address',
                            'placeholder' => 'noreply@gdca.com',
                        ],
                        [
                            'key' => 'mail_from_name',
                            'label' => 'From Name',
                            'type' => 'text',
                            'description' => 'Default sender name',
                            'placeholder' => 'GDCA Website',
                        ],
                    ],
                ],
            ],
            'security' => [
                [
                    'name' => 'Security Settings',
                    'settings' => [
                        [
                            'key' => 'maintenance_mode',
                            'label' => 'Maintenance Mode',
                            'type' => 'boolean',
                            'description' => 'Put the site in maintenance mode',
                        ],
                        [
                            'key' => 'maintenance_message',
                            'label' => 'Maintenance Message',
                            'type' => 'textarea',
                            'description' => 'Message shown during maintenance',
                            'placeholder' => 'We are currently performing maintenance. Please check back soon.',
                        ],
                        [
                            'key' => 'recaptcha_site_key',
                            'label' => 'reCAPTCHA Site Key',
                            'type' => 'text',
                            'description' => 'Google reCAPTCHA site key',
                        ],
                        [
                            'key' => 'recaptcha_secret_key',
                            'label' => 'reCAPTCHA Secret Key',
                            'type' => 'text',
                            'description' => 'Google reCAPTCHA secret key',
                        ],
                    ],
                ],
            ],
            'advanced' => [
                [
                    'name' => 'Custom Code',
                    'settings' => [
                        [
                            'key' => 'custom_css',
                            'label' => 'Custom CSS',
                            'type' => 'textarea',
                            'description' => 'Custom CSS code',
                            'placeholder' => '/* Your custom CSS here */',
                        ],
                        [
                            'key' => 'custom_js',
                            'label' => 'Custom JavaScript',
                            'type' => 'textarea',
                            'description' => 'Custom JavaScript code',
                            'placeholder' => '// Your custom JavaScript here',
                        ],
                        [
                            'key' => 'head_scripts',
                            'label' => 'Head Scripts',
                            'type' => 'textarea',
                            'description' => 'Scripts to include in the head section',
                            'placeholder' => '<script>...</script>',
                        ],
                        [
                            'key' => 'footer_scripts',
                            'label' => 'Footer Scripts',
                            'type' => 'textarea',
                            'description' => 'Scripts to include before closing body tag',
                            'placeholder' => '<script>...</script>',
                        ],
                    ],
                ],
            ],
        ];
    }
}
