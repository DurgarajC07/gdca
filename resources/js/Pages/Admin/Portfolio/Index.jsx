import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Plus, 
    Search, 
    Edit2, 
    Eye, 
    Trash2, 
    Star,
    ExternalLink,
    Image,
    Calendar
} from "lucide-react";

export default function PortfolioIndex({ portfolioItems = [], filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.portfolio.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDelete = (id, title) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(route('admin.portfolio.destroy', id));
        }
    };

    const handleToggleFeatured = (item) => {
        router.patch(route('admin.portfolio.update', item.id), {
            is_featured: !item.is_featured
        });
    };

    return (
        <AdminLayout>
            <Head title="Portfolio Management" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
                        <p className="text-gray-600">Manage your portfolio items and showcase your work</p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.portfolio.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Portfolio Item
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search portfolio items..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button type="submit">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-blue-600">{portfolioItems.length}</div>
                            <p className="text-sm text-gray-600">Total Items</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-green-600">
                                {portfolioItems.filter(item => item.is_featured).length}
                            </div>
                            <p className="text-sm text-gray-600">Featured Items</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-purple-600">
                                {[...new Set(portfolioItems.flatMap(item => item.categories || []))].length}
                            </div>
                            <p className="text-sm text-gray-600">Categories</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-orange-600">
                                {portfolioItems.filter(item => item.status === 'completed').length}
                            </div>
                            <p className="text-sm text-gray-600">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Portfolio Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {portfolioItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="relative">
                                {item.featured_image ? (
                                    <img
                                        src={item.featured_image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <Image className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                                
                                {item.is_featured && (
                                    <div className="absolute top-2 right-2">
                                        <Badge className="bg-yellow-500">
                                            <Star className="h-3 w-3 mr-1" />
                                            Featured
                                        </Badge>
                                    </div>
                                )}
                                
                                <div className="absolute top-2 left-2">
                                    <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                                        {item.status || 'draft'}
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                    {item.client_name && (
                                        <p className="text-sm text-gray-600">Client: {item.client_name}</p>
                                    )}
                                </div>

                                {item.description && (
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {item.description.length > 100 
                                            ? `${item.description.substring(0, 100)}...`
                                            : item.description
                                        }
                                    </p>
                                )}

                                {item.technologies && item.technologies.length > 0 && (
                                    <div className="mb-3">
                                        <div className="flex flex-wrap gap-1">
                                            {item.technologies.slice(0, 3).map((tech, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {item.technologies.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{item.technologies.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {item.categories && item.categories.length > 0 && (
                                    <div className="mb-3">
                                        <div className="flex flex-wrap gap-1">
                                            {item.categories.slice(0, 2).map((category, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {item.completion_date && (
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(item.completion_date).toLocaleDateString()}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleToggleFeatured(item)}
                                        >
                                            <Star className={`h-4 w-4 ${item.is_featured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                        </Button>
                                        
                                        {item.live_url && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => window.open(item.live_url, '_blank')}
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={route('admin.portfolio.show', item.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={route('admin.portfolio.edit', item.id)}>
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(item.id, item.title)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {portfolioItems.length === 0 && (
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="py-12">
                                <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items found</h3>
                                <p className="text-gray-600 mb-4">
                                    {searchTerm 
                                        ? "No portfolio items match your search criteria."
                                        : "Get started by creating your first portfolio item."
                                    }
                                </p>
                                <Button asChild>
                                    <Link href={route('admin.portfolio.create')}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Portfolio Item
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
