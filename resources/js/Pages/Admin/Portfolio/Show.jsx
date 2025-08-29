import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    ArrowLeft, 
    Edit2, 
    Trash2, 
    ExternalLink, 
    Star,
    Calendar,
    User,
    Globe,
    Github,
    Eye
} from "lucide-react";

export default function PortfolioShow({ portfolioItem }) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${portfolioItem.title}"?`)) {
            router.delete(route('admin.portfolio.destroy', portfolioItem.id));
        }
    };

    const handleToggleFeatured = () => {
        router.patch(route('admin.portfolio.update', portfolioItem.id), {
            is_featured: !portfolioItem.is_featured
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            draft: 'secondary',
            in_progress: 'destructive',
            completed: 'default',
            on_hold: 'outline'
        };
        return colors[status] || 'secondary';
    };

    return (
        <AdminLayout>
            <Head title={portfolioItem.title} />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.visit(route('admin.portfolio.index'))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Portfolio
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{portfolioItem.title}</h1>
                            <p className="text-gray-600">{portfolioItem.description}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(portfolioItem.status)}>
                            {portfolioItem.status || 'draft'}
                        </Badge>
                        {portfolioItem.is_featured && (
                            <Badge className="bg-yellow-500">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                            </Badge>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={route('admin.portfolio.edit', portfolioItem.id)}>
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
                        {/* Featured Image */}
                        {portfolioItem.featured_image && (
                            <Card>
                                <CardContent className="p-0">
                                    <img
                                        src={portfolioItem.featured_image}
                                        alt={portfolioItem.title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {portfolioItem.detailed_description ? (
                                    <div 
                                        className="prose prose-lg max-w-none"
                                        dangerouslySetInnerHTML={{ __html: portfolioItem.detailed_description }}
                                    />
                                ) : (
                                    <p className="text-gray-500 italic">{portfolioItem.description}</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Gallery */}
                        {portfolioItem.gallery && portfolioItem.gallery.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Gallery</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {portfolioItem.gallery.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => window.open(image, '_blank')}
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                                                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Technologies & Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portfolioItem.technologies && portfolioItem.technologies.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Technologies</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {portfolioItem.technologies.map((tech, index) => (
                                                <Badge key={index} variant="outline">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {portfolioItem.categories && portfolioItem.categories.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Categories</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {portfolioItem.categories.map((category, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Status</span>
                                    <Badge variant={getStatusColor(portfolioItem.status)}>
                                        {portfolioItem.status || 'draft'}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Featured</span>
                                    <Badge variant={portfolioItem.is_featured ? "default" : "secondary"}>
                                        {portfolioItem.is_featured ? "Yes" : "No"}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Order</span>
                                    <span className="text-sm text-gray-600">{portfolioItem.order}</span>
                                </div>
                                
                                {portfolioItem.completion_date && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Completed</span>
                                        <span className="text-sm text-gray-600">
                                            {new Date(portfolioItem.completion_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Created</span>
                                    <span className="text-sm text-gray-600">
                                        {new Date(portfolioItem.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Updated</span>
                                    <span className="text-sm text-gray-600">
                                        {new Date(portfolioItem.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Client Info */}
                        {(portfolioItem.client_name || portfolioItem.client_url) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Client Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {portfolioItem.client_name && (
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm">{portfolioItem.client_name}</span>
                                        </div>
                                    )}
                                    {portfolioItem.client_url && (
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-gray-500" />
                                            <a 
                                                href={portfolioItem.client_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Visit Client Site
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Project Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {portfolioItem.live_url && (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => window.open(portfolioItem.live_url, '_blank')}
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View Live Site
                                    </Button>
                                )}
                                
                                {portfolioItem.github_url && (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => window.open(portfolioItem.github_url, '_blank')}
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        View on GitHub
                                    </Button>
                                )}
                                
                                {portfolioItem.project_url && (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => window.open(portfolioItem.project_url, '_blank')}
                                    >
                                        <Globe className="h-4 w-4 mr-2" />
                                        Project Website
                                    </Button>
                                )}
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
                                    onClick={handleToggleFeatured}
                                >
                                    <Star className={`h-4 w-4 mr-2 ${portfolioItem.is_featured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                    {portfolioItem.is_featured ? "Remove from Featured" : "Mark as Featured"}
                                </Button>
                                
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={route('admin.portfolio.edit', portfolioItem.id)}>
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit Portfolio Item
                                    </Link>
                                </Button>
                                
                                <Button
                                    variant="destructive"
                                    className="w-full justify-start"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Portfolio Item
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
                                    onClick={() => window.open('/#portfolio', '_blank')}
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
