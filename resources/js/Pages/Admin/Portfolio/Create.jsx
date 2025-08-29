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
import { ArrowLeft, Save, Plus, X } from "lucide-react";

export default function PortfolioCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        detailed_description: '',
        featured_image: '',
        gallery: [],
        technologies: [],
        categories: [],
        client_name: '',
        client_url: '',
        project_url: '',
        github_url: '',
        live_url: '',
        completion_date: '',
        status: 'draft',
        is_featured: false,
        order: 0
    });

    const [newTechnology, setNewTechnology] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newGalleryUrl, setNewGalleryUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.portfolio.store'));
    };

    const addTechnology = () => {
        if (newTechnology.trim() && !data.technologies.includes(newTechnology.trim())) {
            setData('technologies', [...data.technologies, newTechnology.trim()]);
            setNewTechnology('');
        }
    };

    const removeTechnology = (index) => {
        setData('technologies', data.technologies.filter((_, i) => i !== index));
    };

    const addCategory = () => {
        if (newCategory.trim() && !data.categories.includes(newCategory.trim())) {
            setData('categories', [...data.categories, newCategory.trim()]);
            setNewCategory('');
        }
    };

    const removeCategory = (index) => {
        setData('categories', data.categories.filter((_, i) => i !== index));
    };

    const addGalleryImage = () => {
        if (newGalleryUrl.trim() && !data.gallery.includes(newGalleryUrl.trim())) {
            setData('gallery', [...data.gallery, newGalleryUrl.trim()]);
            setNewGalleryUrl('');
        }
    };

    const removeGalleryImage = (index) => {
        setData('gallery', data.gallery.filter((_, i) => i !== index));
    };

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' }
    ];

    return (
        <AdminLayout>
            <Head title="Create Portfolio Item" />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.visit(route('admin.portfolio.index'))}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Portfolio
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create Portfolio Item</h1>
                        <p className="text-gray-600">Add a new project to your portfolio</p>
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
                                        <Label htmlFor="title">Project Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter project title"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Short Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief description of the project"
                                            rows={3}
                                            required
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="featured_image">Featured Image URL</Label>
                                        <Input
                                            id="featured_image"
                                            type="url"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.featured_image && (
                                            <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Detailed Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="detailed_description">Project Details</Label>
                                        <div className="mt-2">
                                            <RichEditor
                                                value={data.detailed_description}
                                                onChange={(content) => setData('detailed_description', content)}
                                                placeholder="Write detailed project description..."
                                                height="300px"
                                            />
                                        </div>
                                        {errors.detailed_description && (
                                            <p className="mt-1 text-sm text-red-600">{errors.detailed_description}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Client Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="client_name">Client Name</Label>
                                            <Input
                                                id="client_name"
                                                type="text"
                                                value={data.client_name}
                                                onChange={(e) => setData('client_name', e.target.value)}
                                                placeholder="Client or company name"
                                            />
                                            {errors.client_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.client_name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="client_url">Client Website</Label>
                                            <Input
                                                id="client_url"
                                                type="url"
                                                value={data.client_url}
                                                onChange={(e) => setData('client_url', e.target.value)}
                                                placeholder="https://client-website.com"
                                            />
                                            {errors.client_url && (
                                                <p className="mt-1 text-sm text-red-600">{errors.client_url}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="live_url">Live URL</Label>
                                            <Input
                                                id="live_url"
                                                type="url"
                                                value={data.live_url}
                                                onChange={(e) => setData('live_url', e.target.value)}
                                                placeholder="https://project-demo.com"
                                            />
                                            {errors.live_url && (
                                                <p className="mt-1 text-sm text-red-600">{errors.live_url}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="github_url">GitHub URL</Label>
                                            <Input
                                                id="github_url"
                                                type="url"
                                                value={data.github_url}
                                                onChange={(e) => setData('github_url', e.target.value)}
                                                placeholder="https://github.com/user/repo"
                                            />
                                            {errors.github_url && (
                                                <p className="mt-1 text-sm text-red-600">{errors.github_url}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="project_url">Project URL</Label>
                                        <Input
                                            id="project_url"
                                            type="url"
                                            value={data.project_url}
                                            onChange={(e) => setData('project_url', e.target.value)}
                                            placeholder="https://project.com"
                                        />
                                        {errors.project_url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.project_url}</p>
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
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            {statusOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="is_featured">Featured</Label>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
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
                                        <Label htmlFor="completion_date">Completion Date</Label>
                                        <Input
                                            id="completion_date"
                                            type="date"
                                            value={data.completion_date}
                                            onChange={(e) => setData('completion_date', e.target.value)}
                                        />
                                        {errors.completion_date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.completion_date}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Technologies</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Add technology"
                                            value={newTechnology}
                                            onChange={(e) => setNewTechnology(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                                        />
                                        <Button type="button" size="sm" onClick={addTechnology}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {data.technologies.map((tech, index) => (
                                            <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                                                <span>{tech}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTechnology(index)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.technologies && (
                                        <p className="text-sm text-red-600">{errors.technologies}</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Categories</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Add category"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                                        />
                                        <Button type="button" size="sm" onClick={addCategory}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {data.categories.map((category, index) => (
                                            <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                                                <span>{category}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeCategory(index)}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.categories && (
                                        <p className="text-sm text-red-600">{errors.categories}</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Gallery Images</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            type="url"
                                            placeholder="Add gallery image URL"
                                            value={newGalleryUrl}
                                            onChange={(e) => setNewGalleryUrl(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                                        />
                                        <Button type="button" size="sm" onClick={addGalleryImage}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                        {data.gallery.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <img 
                                                    src={url} 
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded border"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="w-full h-20 bg-gray-200 rounded border items-center justify-center text-gray-400 text-xs hidden">
                                                    Invalid URL
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.gallery && (
                                        <p className="text-sm text-red-600">{errors.gallery}</p>
                                    )}
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
                                        {processing ? 'Creating...' : 'Create Portfolio Item'}
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
