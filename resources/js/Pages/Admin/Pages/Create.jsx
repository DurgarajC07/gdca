import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import RichTextEditor from '@/Components/RichTextEditor';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        is_deletable: true,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
    });

    // Auto-generate slug from title
    useEffect(() => {
        if (data.title && !data.slug) {
            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setData('slug', slug);
        }
    }, [data.title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/pages');
    };

    return (
        <AdminLayout>
            <Head title="Create Page - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" asChild>
                            <Link href="/admin/pages">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Pages
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
                            <p className="text-gray-600">Create a new page for your website</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <Label htmlFor="title">Page Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter page title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div>
                                    <Label htmlFor="slug">URL Slug</Label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                            /
                                        </span>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder="page-slug"
                                            className={`rounded-l-none ${errors.slug ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.slug && (
                                        <p className="text-sm text-red-600 mt-1">{errors.slug}</p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        Leave empty to auto-generate from title
                                    </p>
                                </div>

                                {/* Content */}
                                <div>
                                    <Label htmlFor="content">Page Content *</Label>
                                    <RichTextEditor
                                        value={data.content}
                                        onChange={(value) => setData('content', value)}
                                        placeholder="Enter page content..."
                                        className={errors.content ? 'border-red-500 rounded-md' : ''}
                                    />
                                    {errors.content && (
                                        <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        Use [form id=1] to embed forms in your content.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* SEO Settings */}
                        <Card className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="seo_title">SEO Title</Label>
                                    <Input
                                        id="seo_title"
                                        value={data.seo_title}
                                        onChange={(e) => setData('seo_title', e.target.value)}
                                        placeholder="Custom title for search engines"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="seo_description">SEO Description</Label>
                                    <Textarea
                                        id="seo_description"
                                        value={data.seo_description}
                                        onChange={(e) => setData('seo_description', e.target.value)}
                                        placeholder="Description for search engines (max 160 chars)"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="seo_keywords">SEO Keywords</Label>
                                    <Input
                                        id="seo_keywords"
                                        value={data.seo_keywords}
                                        onChange={(e) => setData('seo_keywords', e.target.value)}
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Publication</h3>
                            <div className="space-y-4">
                                {/* Status */}
                                <div>
                                    <Label>Status</Label>
                                    <Select 
                                        value={data.status} 
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Is Deletable */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_deletable"
                                        checked={data.is_deletable}
                                        onCheckedChange={(checked) => setData('is_deletable', checked)}
                                    />
                                    <Label htmlFor="is_deletable" className="text-sm">
                                        Allow deletion of this page
                                    </Label>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2 pt-4 border-t">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {processing ? 'Creating...' : 'Create Page'}
                                    </Button>
                                    
                                    <Button 
                                        variant="outline" 
                                        type="button"
                                        onClick={() => reset()}
                                        className="w-full"
                                    >
                                        Reset Form
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Preview */}
                        <Card className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">URL:</span>
                                    <br />
                                    <code className="bg-gray-100 px-2 py-1 rounded">
                                        /{data.slug || 'page-slug'}
                                    </code>
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>
                                    <br />
                                    <Badge 
                                        variant={data.status === 'published' ? 'default' : 'secondary'}
                                        className="capitalize"
                                    >
                                        {data.status}
                                    </Badge>
                                </div>
                                <div>
                                    <span className="font-medium">Content Length:</span>
                                    <br />
                                    {data.content.length} characters
                                </div>
                            </div>
                        </Card>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
