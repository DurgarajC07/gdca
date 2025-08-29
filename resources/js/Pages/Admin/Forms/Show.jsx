import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Eye, Trash2, Download, Calendar, Filter } from "lucide-react";

export default function FormsShow({ form, submissions, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.forms.show", form.id), { search: searchTerm });
    };

    const handleDelete = (submissionId) => {
        router.delete(route("admin.form-submissions.destroy", submissionId), {
            onSuccess: () => setSelectedSubmission(null),
        });
    };

    const exportSubmissions = () => {
        window.open(route("admin.forms.export", form.id));
    };

    return (
        <AdminLayout>
            <Head title={`${form.name} - Submissions`} />

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route("admin.forms.index")}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Forms
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{form.name}</h1>
                        <p className="text-muted-foreground">
                            View and manage form submissions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route("admin.forms.edit", form.id)}>
                            <Button variant="outline">Edit Form</Button>
                        </Link>
                        <Button onClick={exportSubmissions} variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="submissions" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="submissions">
                            Submissions ({submissions.length})
                        </TabsTrigger>
                        <TabsTrigger value="form-info">Form Info</TabsTrigger>
                    </TabsList>

                    <TabsContent value="submissions">
                        {/* Search */}
                        <Card className="mb-6">
                            <CardContent className="p-4">
                                <form onSubmit={handleSearch} className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Search submissions..."
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

                        {/* Submissions Table */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Form Submissions</CardTitle>
                                    <Badge variant="secondary">
                                        {submissions.length} submissions
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {submissions.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                                        <p className="text-muted-foreground">
                                            When users submit this form, their responses will appear here.
                                        </p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Submitted</TableHead>
                                                <TableHead>Data Preview</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {submissions.map((submission) => (
                                                <TableRow key={submission.id}>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {new Date(submission.created_at).toLocaleString()}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            {Object.entries(submission.data || {}).slice(0, 2).map(([key, value]) => (
                                                                <div key={key} className="text-sm">
                                                                    <span className="font-medium">{key}:</span> {value}
                                                                </div>
                                                            ))}
                                                            {Object.keys(submission.data || {}).length > 2 && (
                                                                <div className="text-xs text-muted-foreground">
                                                                    +{Object.keys(submission.data || {}).length - 2} more fields
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => setSelectedSubmission(submission)}
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-w-2xl">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Submission Details</DialogTitle>
                                                                        <DialogDescription>
                                                                            Submitted on {new Date(submission.created_at).toLocaleString()}
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                                                        {Object.entries(submission.data || {}).map(([key, value]) => (
                                                                            <div key={key}>
                                                                                <Label className="font-medium">{key}</Label>
                                                                                <div className="mt-1 p-2 bg-muted rounded text-sm">
                                                                                    {Array.isArray(value) ? value.join(", ") : value}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="flex justify-end gap-2">
                                                                        <Button
                                                                            variant="destructive"
                                                                            onClick={() => handleDelete(submission.id)}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDelete(submission.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="form-info">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="font-medium">Name</Label>
                                        <p className="text-sm text-muted-foreground">{form.name}</p>
                                    </div>

                                    {form.description && (
                                        <div>
                                            <Label className="font-medium">Description</Label>
                                            <p className="text-sm text-muted-foreground">{form.description}</p>
                                        </div>
                                    )}

                                    <div>
                                        <Label className="font-medium">Status</Label>
                                        <div className="mt-1">
                                            <Badge variant={form.is_active ? "default" : "secondary"}>
                                                {form.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium">Success Message</Label>
                                        <p className="text-sm text-muted-foreground">{form.success_message}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Fields</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {form.fields && form.fields.length > 0 ? form.fields.map((field, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                                                <div>
                                                    <div className="font-medium text-sm">{field.label}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {field.type} • {field.name}
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {field.required && (
                                                        <Badge variant="outline" className="text-xs">Required</Badge>
                                                    )}
                                                    <Badge variant="secondary" className="text-xs">
                                                        {field.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center text-muted-foreground py-4">
                                                No fields configured for this form
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
