import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

export default function HomeSectionShow({ section }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this section?')) {
            router.delete(route('admin.home-sections.destroy', section.id));
        }
    };

    const handleToggleStatus = () => {
        router.patch(route('admin.home-sections.update', section.id), {
            is_active: !section.is_active
        });
    };

    return (
        <AdminLayout>
            <Head title={`${section.name} Section`} />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.visit(route('admin.home-sections.index'))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Sections
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 capitalize">{section.name} Section</h1>
                            <p className="text-gray-600">{section.title}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Badge variant={section.is_active ? "default" : "secondary"}>
                            {section.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleStatus}
                        >
                            {section.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={route('admin.home-sections.edit', section.id)}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Section Type</Label>
                                        <p className="text-lg font-medium capitalize">{section.name}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Display Order</Label>
                                        <p className="text-lg font-medium">{section.order}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Title</Label>
                                    <p className="text-lg">{section.title}</p>
                                </div>

                                {section.subtitle && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Subtitle</Label>
                                        <p className="text-gray-700">{section.subtitle}</p>
                                    </div>
                                )}

                                {section.background_image && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Background Image</Label>
                                        <div className="mt-2">
                                            <img 
                                                src={section.background_image} 
                                                alt="Background"
                                                className="w-full h-32 object-cover rounded-md border"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            <p className="text-sm text-gray-500 mt-1 break-all">{section.background_image}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {section.content ? (
                                    <div 
                                        className="prose prose-lg max-w-none"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                ) : (
                                    <p className="text-gray-500 italic">No content available</p>
                                )}
                            </CardContent>
                        </Card>

                        {section.settings && Object.keys(section.settings).length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
                                        {JSON.stringify(section.settings, null, 2)}
                                    </pre>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Status</span>
                                    <Badge variant={section.is_active ? "default" : "secondary"}>
                                        {section.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Created</span>
                                    <span className="text-sm text-gray-600">
                                        {new Date(section.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Updated</span>
                                    <span className="text-sm text-gray-600">
                                        {new Date(section.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={handleToggleStatus}
                                >
                                    {section.is_active ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                                    {section.is_active ? "Deactivate" : "Activate"}
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={route('admin.home-sections.edit', section.id)}>
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit Section
                                    </Link>
                                </Button>
                                
                                <Button
                                    variant="destructive"
                                    className="w-full justify-start"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Section
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => window.open('/', '_blank')}
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View on Homepage
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function Label({ children, className = "", ...props }) {
    return (
        <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
            {children}
        </label>
    );
}
