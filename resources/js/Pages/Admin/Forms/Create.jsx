import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormBuilder from "@/Components/FormBuilder";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function FormsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        fields: [],
        success_message: "Thank you for your submission!",
        is_active: true,
        email_notifications: false,
        notification_email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.forms.store"));
    };

    return (
        <AdminLayout>
            <Head title="Create Form" />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route("admin.forms.index")}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Forms
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Create Form</h1>
                        <p className="text-muted-foreground">
                            Build a custom form with drag-and-drop fields
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form Builder */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Builder</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormBuilder
                                        fields={data.fields}
                                        onChange={(fields) => setData("fields", fields)}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Form Settings */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Form Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            placeholder="Contact Form"
                                            className={errors.name ? "border-red-500" : ""}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData("description", e.target.value)}
                                            placeholder="Brief description of this form"
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="success_message">Success Message</Label>
                                        <Textarea
                                            id="success_message"
                                            value={data.success_message}
                                            onChange={(e) => setData("success_message", e.target.value)}
                                            placeholder="Message shown after successful submission"
                                            rows={3}
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

                            <Card>
                                <CardHeader>
                                    <CardTitle>Email Notifications</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="email_notifications"
                                            checked={data.email_notifications}
                                            onCheckedChange={(checked) => setData("email_notifications", checked)}
                                        />
                                        <Label htmlFor="email_notifications">Send email notifications</Label>
                                    </div>

                                    {data.email_notifications && (
                                        <div>
                                            <Label htmlFor="notification_email">Notification Email</Label>
                                            <Input
                                                id="notification_email"
                                                type="email"
                                                value={data.notification_email}
                                                onChange={(e) => setData("notification_email", e.target.value)}
                                                placeholder="admin@example.com"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Button type="submit" className="w-full" disabled={processing}>
                                <Save className="h-4 w-4 mr-2" />
                                {processing ? "Creating..." : "Create Form"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
