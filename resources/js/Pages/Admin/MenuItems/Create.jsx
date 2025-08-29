import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Link as LinkIcon, FileText, ExternalLink } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function MenuItemsCreate({ pages, menuItems }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        type: "page",
        page_id: "",
        url: "",
        route: "",
        parent_id: "",
        order: 0,
        is_active: true,
        target: "_self",
        css_class: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.menu-items.store"));
    };

    const menuItemTypes = [
        { value: "page", label: "Page", icon: FileText, description: "Link to an internal page" },
        { value: "url", label: "URL", icon: ExternalLink, description: "Link to external URL" },
        { value: "route", label: "Route", icon: LinkIcon, description: "Link to a Laravel route" },
    ];

    const targetOptions = [
        { value: "_self", label: "Same window" },
        { value: "_blank", label: "New window" },
    ];

    return (
        <AdminLayout>
            <Head title="Create Menu Item" />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route("admin.menu-items.index")}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Menu
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Create Menu Item</h1>
                        <p className="text-muted-foreground">
                            Add a new item to your navigation menu
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Menu Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                            placeholder="Home"
                                            className={errors.title ? "border-red-500" : ""}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData("description", e.target.value)}
                                            placeholder="Brief description for screen readers"
                                            rows={2}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="type">Link Type</Label>
                                        <Select value={data.type} onValueChange={(value) => setData("type", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select link type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {menuItemTypes.map((type) => {
                                                    const Icon = type.icon;
                                                    return (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            <div className="flex items-center gap-2">
                                                                <Icon className="h-4 w-4" />
                                                                <div>
                                                                    <div className="font-medium">{type.label}</div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {type.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {data.type === "page" && (
                                        <div>
                                            <Label htmlFor="page_id">Select Page</Label>
                                            <Select value={data.page_id} onValueChange={(value) => setData("page_id", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a page" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {pages.map((page) => (
                                                        <SelectItem key={page.id} value={page.id.toString()}>
                                                            {page.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.page_id && (
                                                <p className="text-sm text-red-500 mt-1">{errors.page_id}</p>
                                            )}
                                        </div>
                                    )}

                                    {data.type === "url" && (
                                        <div>
                                            <Label htmlFor="url">URL</Label>
                                            <Input
                                                id="url"
                                                type="url"
                                                value={data.url}
                                                onChange={(e) => setData("url", e.target.value)}
                                                placeholder="https://example.com"
                                                className={errors.url ? "border-red-500" : ""}
                                            />
                                            {errors.url && (
                                                <p className="text-sm text-red-500 mt-1">{errors.url}</p>
                                            )}
                                        </div>
                                    )}

                                    {data.type === "route" && (
                                        <div>
                                            <Label htmlFor="route">Route Name</Label>
                                            <Input
                                                id="route"
                                                value={data.route}
                                                onChange={(e) => setData("route", e.target.value)}
                                                placeholder="contact.index"
                                                className={errors.route ? "border-red-500" : ""}
                                            />
                                            {errors.route && (
                                                <p className="text-sm text-red-500 mt-1">{errors.route}</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Menu Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="parent_id">Parent Menu Item</Label>
                                        <Select value={data.parent_id} onValueChange={(value) => setData("parent_id", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="None (Top Level)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">None (Top Level)</SelectItem>
                                                {menuItems.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                        {item.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="order">Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData("order", parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="target">Link Target</Label>
                                        <Select value={data.target} onValueChange={(value) => setData("target", value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {targetOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="css_class">CSS Classes (Optional)</Label>
                                        <Input
                                            id="css_class"
                                            value={data.css_class}
                                            onChange={(e) => setData("css_class", e.target.value)}
                                            placeholder="btn-primary highlight"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData("is_active", checked)}
                                        />
                                        <Label htmlFor="is_active">Active</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button type="submit" className="w-full" disabled={processing}>
                                <Save className="h-4 w-4 mr-2" />
                                {processing ? "Creating..." : "Create Menu Item"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
