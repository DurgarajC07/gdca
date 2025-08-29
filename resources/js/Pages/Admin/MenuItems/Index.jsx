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
import { Plus, Search, Edit, Trash2, Menu, GripVertical, ChevronRight } from "lucide-react";

function MenuItemRow({ item, level = 0 }) {
    const [deleteItemId, setDeleteItemId] = useState(null);

    const handleDelete = (itemId) => {
        router.delete(route("admin.menu-items.destroy", itemId), {
            onSuccess: () => setDeleteItemId(null),
        });
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <div className="flex items-center gap-2" style={{ marginLeft: `${level * 20}px` }}>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        {level > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                        <span>{item.title}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <Badge variant="outline">
                        {item.type}
                    </Badge>
                </TableCell>
                <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                        {item.url || item.route || "N/A"}
                    </code>
                </TableCell>
                <TableCell>
                    <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Active" : "Inactive"}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link href={route("admin.menu-items.edit", item.id)}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDeleteItemId(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Menu Item</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete "{item.title}"? 
                                        This will also delete all child menu items. 
                                        This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setDeleteItemId(null)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </TableCell>
            </TableRow>
            {item.children?.map((child) => (
                <MenuItemRow key={child.id} item={child} level={level + 1} />
            ))}
        </>
    );
}

export default function MenuItemsIndex({ menuItems, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.menu-items.index"), { search: searchTerm });
    };

    return (
        <AdminLayout>
            <Head title="Menu Management" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Menu Management</h1>
                        <p className="text-muted-foreground">
                            Create and organize your website navigation menu
                        </p>
                    </div>
                    <Link href={route("admin.menu-items.create")}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Menu Item
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search menu items..."
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

                {/* Menu Items Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Menu Items</h3>
                            <Badge variant="secondary">
                                {menuItems.length} items
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {menuItems.length === 0 ? (
                            <div className="text-center py-8">
                                <Menu className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No menu items found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Create your first menu item to get started
                                </p>
                                <Link href={route("admin.menu-items.create")}>
                                    <Button>Add Menu Item</Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>URL/Route</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {menuItems.map((item) => (
                                        <MenuItemRow key={item.id} item={item} />
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {menuItems.length > 0 && (
                    <Card className="mt-6">
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Menu Preview</h3>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4 bg-muted/50">
                                <nav className="space-y-2">
                                    {menuItems.filter(item => item.is_active).map((item) => (
                                        <div key={item.id}>
                                            <a
                                                href="#"
                                                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                {item.title}
                                            </a>
                                            {item.children?.filter(child => child.is_active).map((child) => (
                                                <a
                                                    key={child.id}
                                                    href="#"
                                                    className="block px-6 py-1 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors ml-4"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    {child.title}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
