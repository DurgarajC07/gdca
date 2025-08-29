import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
    Plus, 
    Edit, 
    Trash2, 
    ExternalLink,
    Eye,
    EyeOff,
    FileText
} from 'lucide-react';

export default function Index({ pages, auth }) {
    const isAdmin = auth.user?.role === 'admin';

    const handleDelete = (page) => {
        if (!page.is_deletable) {
            alert('This page cannot be deleted as it is protected.');
            return;
        }

        if (confirm(`Are you sure you want to delete "${page.title}"?`)) {
            router.delete(`/admin/pages/${page.id}`);
        }
    };

    const toggleStatus = (page) => {
        const newStatus = page.status === 'published' ? 'draft' : 'published';
        router.put(`/admin/pages/${page.id}`, {
            ...page,
            status: newStatus,
        });
    };

    return (
        <AdminLayout>
            <Head title="Pages - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
                        <p className="text-gray-600">Manage your website pages and content</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/pages/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Page
                        </Link>
                    </Button>
                </div>

                {/* Pages Table */}
                <Card>
                    <div className="p-6">
                        {pages.data && pages.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>SEO</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pages.data.map((page) => (
                                        <TableRow key={page.id}>
                                            <TableCell className="font-medium">
                                                {page.title}
                                                {!page.is_deletable && (
                                                    <Badge variant="secondary" className="ml-2 text-xs">
                                                        Protected
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                    /{page.slug}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant={page.status === 'published' ? 'default' : 'secondary'}
                                                    className="capitalize"
                                                >
                                                    {page.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {page.seo_title ? (
                                                    <Badge variant="outline" className="text-green-600">
                                                        Optimized
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-orange-600">
                                                        Basic
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-gray-500">
                                                {new Date(page.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    {/* View Live Page */}
                                                    {page.status === 'published' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <a 
                                                                href={`/${page.slug}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        </Button>
                                                    )}

                                                    {/* Toggle Status */}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => toggleStatus(page)}
                                                        title={`${page.status === 'published' ? 'Unpublish' : 'Publish'} page`}
                                                    >
                                                        {page.status === 'published' ? (
                                                            <EyeOff className="w-4 h-4" />
                                                        ) : (
                                                            <Eye className="w-4 h-4" />
                                                        )}
                                                    </Button>

                                                    {/* Edit */}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/pages/${page.id}/edit`}>
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    </Button>

                                                    {/* Delete */}
                                                    {page.is_deletable && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(page)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
                                <p className="text-gray-500 mb-6">Get started by creating your first page.</p>
                                <Button asChild>
                                    <Link href="/admin/pages/create">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create First Page
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Pagination */}
                {pages.links && pages.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-1">
                            {pages.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
