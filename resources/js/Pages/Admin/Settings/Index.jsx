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
import { Badge } from "@/components/ui/badge";
import { 
    Save, 
    Settings as SettingsIcon, 
    Palette, 
    Globe, 
    Image, 
    Mail,
    Shield,
    Code,
    Upload,
    X
} from "lucide-react";

export default function SiteSettings({ settings, settingsGroups }) {
    const { data, setData, post, processing, errors } = useForm({
        settings: settings || {},
    });

    const [activeGroup, setActiveGroup] = useState("general");

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.site-settings.update"));
    };

    const updateSetting = (key, value) => {
        setData("settings", {
            ...data.settings,
            [key]: value,
        });
    };

    const handleFileUpload = (key, event) => {
        const file = event.target.files[0];
        if (file) {
            // In a real implementation, you'd upload this file and get the URL
            const reader = new FileReader();
            reader.onload = (e) => {
                updateSetting(key, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const settingsTabs = [
        { id: "general", label: "General", icon: SettingsIcon },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "seo", label: "SEO", icon: Globe },
        { id: "media", label: "Media", icon: Image },
        { id: "email", label: "Email", icon: Mail },
        { id: "security", label: "Security", icon: Shield },
        { id: "advanced", label: "Advanced", icon: Code },
    ];

    const renderSettingField = (setting) => {
        const value = data.settings[setting.key] || setting.default_value || "";

        switch (setting.type) {
            case "text":
                return (
                    <Input
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        placeholder={setting.placeholder}
                    />
                );

            case "textarea":
                return (
                    <Textarea
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        placeholder={setting.placeholder}
                        rows={4}
                    />
                );

            case "boolean":
                return (
                    <Switch
                        checked={value === "1" || value === true}
                        onCheckedChange={(checked) => updateSetting(setting.key, checked ? "1" : "0")}
                    />
                );

            case "email":
                return (
                    <Input
                        type="email"
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        placeholder={setting.placeholder}
                    />
                );

            case "url":
                return (
                    <Input
                        type="url"
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        placeholder={setting.placeholder}
                    />
                );

            case "number":
                return (
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        placeholder={setting.placeholder}
                    />
                );

            case "color":
                return (
                    <div className="flex gap-2">
                        <Input
                            type="color"
                            value={value}
                            onChange={(e) => updateSetting(setting.key, e.target.value)}
                            className="w-20"
                        />
                        <Input
                            value={value}
                            onChange={(e) => updateSetting(setting.key, e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                        />
                    </div>
                );

            case "image":
                return (
                    <div className="space-y-2">
                        {value && (
                            <div className="relative inline-block">
                                <img
                                    src={value}
                                    alt={setting.label}
                                    className="w-32 h-32 object-cover rounded border"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateSetting(setting.key, "")}
                                    className="absolute top-1 right-1"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(setting.key, e)}
                                className="flex-1"
                            />
                            <Button type="button" variant="outline" size="sm">
                                <Upload className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                );

            case "select":
                return (
                    <select
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                return (
                    <Input
                        value={value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        placeholder={setting.placeholder}
                    />
                );
        }
    };

    return (
        <AdminLayout>
            <Head title="Site Settings" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Site Settings</h1>
                        <p className="text-muted-foreground">
                            Configure your website settings and preferences
                        </p>
                    </div>
                    <Button onClick={handleSubmit} disabled={processing}>
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? "Saving..." : "Save Settings"}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs value={activeGroup} onValueChange={setActiveGroup} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-7">
                            {settingsTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>

                        {settingsTabs.map((tab) => (
                            <TabsContent key={tab.id} value={tab.id}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {settingsGroups[tab.id]?.map((group) => (
                                        <Card key={group.name}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    {group.name}
                                                    <Badge variant="secondary" className="text-xs">
                                                        {group.settings.length} settings
                                                    </Badge>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                {group.settings.map((setting) => (
                                                    <div key={setting.key} className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor={setting.key} className="font-medium">
                                                                {setting.label}
                                                            </Label>
                                                            {setting.required && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    Required
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        
                                                        {setting.description && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {setting.description}
                                                            </p>
                                                        )}

                                                        {renderSettingField(setting)}

                                                        {errors[`settings.${setting.key}`] && (
                                                            <p className="text-sm text-red-500">
                                                                {errors[`settings.${setting.key}`]}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </form>
            </div>
        </AdminLayout>
    );
}
