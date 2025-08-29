import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Plus, Search, Eye, Edit, Trash2, FileText } from "lucide-react";

export default function FormsIndex({ forms, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [deleteFormId, setDeleteFormId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.forms.index"), { search: searchTerm });
    };

    const handleDelete = (formId) => {
        router.delete(route("admin.forms.destroy", formId), {
            onSuccess: () => setDeleteFormId(null),
        });
    };

    return (
        <AdminLayout>
            <Head title="Forms" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Forms</h1>
                        <p className="text-muted-foreground">
                            Manage dynamic forms and view submissions
                        </p>
                    </div>
                    <Link href={route("admin.forms.create")}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Form
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search forms..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Forms Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">All Forms</h3>
                            <Badge variant="secondary">
                                {forms.length} forms
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {forms.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No forms found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Create your first form to get started
                                </p>
                                <Link href={route("admin.forms.create")}>
                                    <Button>Create Form</Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {forms.map((form) => (
                                        <TableRow key={form.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{form.name}</div>
                                                    {form.description && (
                                                        <div className="text-sm text-muted-foreground">
                                                            {form.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        form.is_active ? "default" : "secondary"
                                                    }
                                                >
                                                    {form.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {form.submissions_count || 0}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(form.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route("admin.forms.show", form.id)}
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route("admin.forms.edit", form.id)}
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setDeleteFormId(form.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Delete Form</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to delete "{form.name}"? 
                                                                    This will also delete all form submissions. 
                                                                    This action cannot be undone.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => setDeleteFormId(null)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={() => handleDelete(form.id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
