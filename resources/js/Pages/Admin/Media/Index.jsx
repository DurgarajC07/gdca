import { useState, useRef } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
    Upload, 
    Search, 
    Filter, 
    Grid, 
    List, 
    Trash2, 
    Download,
    Eye,
    Edit,
    Image as ImageIcon,
    FileText,
    Video,
    File
} from "lucide-react";

export default function MediaIndex({ media, collections, filters }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedType, setSelectedType] = useState(filters.type || "");
    const [selectedCollection, setSelectedCollection] = useState(filters.collection || "");
    const fileInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.media.index"), { 
            search: searchTerm,
            type: selectedType,
            collection: selectedCollection
        });
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files[]', file);
        });

        router.post(route("admin.media.store"), formData, {
            forceFormData: true,
            onSuccess: () => {
                setUploadDialogOpen(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleSelectFile = (fileId) => {
        setSelectedFiles(prev => 
            prev.includes(fileId) 
                ? prev.filter(id => id !== fileId)
                : [...prev, fileId]
        );
    };

    const handleSelectAll = () => {
        if (selectedFiles.length === media.data.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(media.data.map(file => file.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedFiles.length === 0) return;

        if (confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) {
            router.post(route("admin.media.bulk-delete"), {
                ids: selectedFiles
            }, {
                onSuccess: () => setSelectedFiles([])
            });
        }
    };

    const getFileIcon = (media) => {
        if (media.mime_type.startsWith('image/')) {
            return <ImageIcon className="h-8 w-8 text-blue-500" />;
        } else if (media.mime_type.startsWith('video/')) {
            return <Video className="h-8 w-8 text-purple-500" />;
        } else if (media.mime_type === 'application/pdf') {
            return <FileText className="h-8 w-8 text-red-500" />;
        } else {
            return <File className="h-8 w-8 text-gray-500" />;
        }
    };

    return (
        <AdminLayout>
            <Head title="Media Library" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Media Library</h1>
                        <p className="text-muted-foreground">
                            Manage your website files and images
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {selectedFiles.length > 0 && (
                            <Button
                                variant="destructive"
                                onClick={handleBulkDelete}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Selected ({selectedFiles.length})
                            </Button>
                        )}
                        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Files
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Upload Media Files</DialogTitle>
                                    <DialogDescription>
                                        Select files to upload to your media library
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="files">Choose Files</Label>
                                        <Input
                                            ref={fileInputRef}
                                            id="files"
                                            type="file"
                                            multiple
                                            onChange={handleFileUpload}
                                            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
                                        />
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Max 10MB per file. Supported: images, videos, PDF, Word, Excel
                                        </p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <form onSubmit={handleSearch} className="flex gap-4 items-end">
                            <div className="flex-1">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    placeholder="Search files..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="All types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All types</SelectItem>
                                        <SelectItem value="images">Images</SelectItem>
                                        <SelectItem value="videos">Videos</SelectItem>
                                        <SelectItem value="documents">Documents</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="collection">Collection</Label>
                                <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="All collections" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All collections</SelectItem>
                                        {collections.map((collection) => (
                                            <SelectItem key={collection} value={collection}>
                                                {collection}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                            <div className="flex gap-1">
                                <Button
                                    type="button"
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Bulk Actions */}
                {media.data.length > 0 && (
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={selectedFiles.length === media.data.length}
                                onCheckedChange={handleSelectAll}
                            />
                            <Label>Select All ({media.data.length})</Label>
                        </div>
                        {selectedFiles.length > 0 && (
                            <Badge variant="secondary">
                                {selectedFiles.length} selected
                            </Badge>
                        )}
                    </div>
                )}

                {/* Media Grid/List */}
                {media.data.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No media files found</h3>
                            <p className="text-muted-foreground mb-4">
                                Upload your first file to get started
                            </p>
                            <Button onClick={() => setUploadDialogOpen(true)}>
                                Upload Files
                            </Button>
                        </CardContent>
                    </Card>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {media.data.map((file) => (
                            <Card key={file.id} className="relative group">
                                <CardContent className="p-3">
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                                        <div className="absolute top-2 left-2 z-10">
                                            <Checkbox
                                                checked={selectedFiles.includes(file.id)}
                                                onCheckedChange={() => handleSelectFile(file.id)}
                                            />
                                        </div>
                                        
                                        {file.mime_type.startsWith('image/') ? (
                                            <img
                                                src={file.url}
                                                alt={file.alt_text || file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                {getFileIcon(file)}
                                            </div>
                                        )}

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button size="sm" variant="secondary">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="secondary">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    if (confirm('Delete this file?')) {
                                                        router.delete(route('admin.media.destroy', file.id));
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium truncate" title={file.name}>
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {file.human_readable_size}
                                        </p>
                                        {file.collection_name && (
                                            <Badge variant="outline" className="text-xs">
                                                {file.collection_name}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {media.data.map((file) => (
                                    <div key={file.id} className="flex items-center gap-4 p-4">
                                        <Checkbox
                                            checked={selectedFiles.includes(file.id)}
                                            onCheckedChange={() => handleSelectFile(file.id)}
                                        />
                                        
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                            {file.mime_type.startsWith('image/') ? (
                                                <img
                                                    src={file.url}
                                                    alt={file.alt_text || file.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                getFileIcon(file)
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">{file.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {file.file_name} • {file.human_readable_size}
                                            </p>
                                            {file.collection_name && (
                                                <Badge variant="outline" className="text-xs mt-1">
                                                    {file.collection_name}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    if (confirm('Delete this file?')) {
                                                        router.delete(route('admin.media.destroy', file.id));
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {media.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-2">
                            {media.prev_page_url && (
                                <Link href={media.prev_page_url}>
                                    <Button variant="outline">Previous</Button>
                                </Link>
                            )}
                            
                            <Badge variant="secondary" className="px-3 py-2">
                                Page {media.current_page} of {media.last_page}
                            </Badge>

                            {media.next_page_url && (
                                <Link href={media.next_page_url}>
                                    <Button variant="outline">Next</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
