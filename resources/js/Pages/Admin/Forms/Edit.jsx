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
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function FormsEdit({ form }) {
    const { data, setData, put, processing, errors } = useForm({
        name: form.name || "",
        description: form.description || "",
        fields: form.fields || [],
        success_message: form.success_message || "Thank you for your submission!",
        is_active: form.is_active ?? true,
        email_notifications: form.email_notifications ?? false,
        notification_email: form.notification_email || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.forms.update", form.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Form: ${form.name}`} />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route("admin.forms.index")}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Forms
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">Edit Form</h1>
                        <p className="text-muted-foreground">
                            Modify form fields and settings
                        </p>
                    </div>
                    <Link href={route("admin.forms.show", form.id)}>
                        <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Submissions
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="builder" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="builder">Form Builder</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="builder">
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
                    </TabsContent>

                    <TabsContent value="settings">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            </div>

                            <div className="mt-6">
                                <Button type="submit" disabled={processing}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="preview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Form Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="max-w-2xl">
                                    <h3 className="text-xl font-semibold mb-2">{data.name}</h3>
                                    {data.description && (
                                        <p className="text-muted-foreground mb-6">{data.description}</p>
                                    )}
                                    
                                    <div className="space-y-4">
                                        {data.fields.map((field) => (
                                            <div key={field.id}>
                                                <Label htmlFor={field.name}>
                                                    {field.label}
                                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                                </Label>
                                                {field.type === "textarea" ? (
                                                    <Textarea
                                                        id={field.name}
                                                        placeholder={field.placeholder}
                                                        disabled
                                                        rows={4}
                                                    />
                                                ) : field.type === "select" ? (
                                                    <select
                                                        id={field.name}
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        disabled
                                                    >
                                                        <option value="">Select an option</option>
                                                        {field.options?.map((option, idx) => (
                                                            <option key={idx} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : field.type === "checkbox" ? (
                                                    <div className="space-y-2">
                                                        {field.options?.map((option, idx) => (
                                                            <div key={idx} className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`${field.name}_${idx}`}
                                                                    disabled
                                                                    className="rounded border-input"
                                                                />
                                                                <Label htmlFor={`${field.name}_${idx}`}>
                                                                    {option.label}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Input
                                                        type={field.type}
                                                        id={field.name}
                                                        placeholder={field.placeholder}
                                                        disabled
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <Button disabled>Submit Form</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
