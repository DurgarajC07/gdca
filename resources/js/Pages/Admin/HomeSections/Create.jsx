import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import RichEditor from "@/Components/RichEditor";
import { ArrowLeft, Save } from "lucide-react";

export default function HomeSectionCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        title: '',
        subtitle: '',
        content: '',
        background_image: '',
        is_active: true,
        order: 0,
        settings: {}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.home-sections.store'));
    };

    const sectionTypes = [
        { value: 'hero', label: 'Hero Section' },
        { value: 'about', label: 'About Section' },
        { value: 'services', label: 'Services Section' },
        { value: 'portfolio', label: 'Portfolio Section' },
        { value: 'testimonials', label: 'Testimonials Section' },
        { value: 'contact', label: 'Contact Section' },
        { value: 'custom', label: 'Custom Section' }
    ];

    return (
        <AdminLayout>
            <Head title="Create Home Section" />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.visit(route('admin.home-sections.index'))}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sections
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create Home Section</h1>
                        <p className="text-gray-600">Add a new section to your homepage</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Section Type</Label>
                                        <select
                                            id="name"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a section type</option>
                                            {sectionTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter section title"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="subtitle">Subtitle</Label>
                                        <Textarea
                                            id="subtitle"
                                            value={data.subtitle}
                                            onChange={(e) => setData('subtitle', e.target.value)}
                                            placeholder="Enter section subtitle (optional)"
                                            rows={2}
                                        />
                                        {errors.subtitle && (
                                            <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Content</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="content">Section Content</Label>
                                        <div className="mt-2">
                                            <RichEditor
                                                value={data.content}
                                                onChange={(content) => setData('content', content)}
                                                placeholder="Write your section content here..."
                                                height="400px"
                                            />
                                        </div>
                                        {errors.content && (
                                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="is_active">Active</Label>
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="order">Display Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            min="0"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                        {errors.order && (
                                            <p className="mt-1 text-sm text-red-600">{errors.order}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="background_image">Background Image URL</Label>
                                        <Input
                                            id="background_image"
                                            type="url"
                                            value={data.background_image}
                                            onChange={(e) => setData('background_image', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.background_image && (
                                            <p className="mt-1 text-sm text-red-600">{errors.background_image}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button 
                                        type="submit" 
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {processing ? 'Creating...' : 'Create Section'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
