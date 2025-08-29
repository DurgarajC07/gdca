import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
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
    Type,
    Mail,
    Phone,
    Calendar,
    Hash,
    ToggleLeft,
    List,
    MessageSquare,
    GripVertical,
    Settings,
    Trash2,
    Plus,
} from "lucide-react";

const fieldTypes = [
    { type: "text", label: "Text Input", icon: Type },
    { type: "email", label: "Email", icon: Mail },
    { type: "tel", label: "Phone", icon: Phone },
    { type: "number", label: "Number", icon: Hash },
    { type: "date", label: "Date", icon: Calendar },
    { type: "textarea", label: "Textarea", icon: MessageSquare },
    { type: "select", label: "Select Dropdown", icon: List },
    { type: "checkbox", label: "Checkbox", icon: ToggleLeft },
];

function SortableField({ field, onUpdate, onDelete }) {
    const [isEditingOptions, setIsEditingOptions] = useState(false);
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const updateField = (key, value) => {
        onUpdate(field.id, { ...field, [key]: value });
    };

    const updateOptions = (newOptions) => {
        updateField("options", newOptions);
    };

    const addOption = () => {
        const newOption = { label: "New Option", value: `option_${Date.now()}` };
        updateOptions([...(field.options || []), newOption]);
    };

    const removeOption = (index) => {
        const newOptions = field.options.filter((_, i) => i !== index);
        updateOptions(newOptions);
    };

    const updateOption = (index, key, value) => {
        const newOptions = field.options.map((option, i) => 
            i === index ? { ...option, [key]: value } : option
        );
        updateOptions(newOptions);
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-4">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <button
                            className="cursor-grab active:cursor-grabbing"
                            {...attributes}
                            {...listeners}
                        >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </button>

                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-4">
                                <Badge variant="outline">
                                    {fieldTypes.find(t => t.type === field.type)?.label || field.type}
                                </Badge>
                                <div className="flex-1">
                                    <Input
                                        placeholder="Field Label"
                                        value={field.label || ""}
                                        onChange={(e) => updateField("label", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm">Name</Label>
                                    <Input
                                        placeholder="field_name"
                                        value={field.name || ""}
                                        onChange={(e) => updateField("name", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm">Placeholder</Label>
                                    <Input
                                        placeholder="Enter placeholder..."
                                        value={field.placeholder || ""}
                                        onChange={(e) => updateField("placeholder", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={field.required || false}
                                        onCheckedChange={(checked) => updateField("required", checked)}
                                    />
                                    <Label className="text-sm">Required</Label>
                                </div>

                                {(field.type === "select" || field.type === "checkbox") && (
                                    <Dialog open={isEditingOptions} onOpenChange={setIsEditingOptions}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Settings className="h-4 w-4 mr-2" />
                                                Options ({field.options?.length || 0})
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Edit Options</DialogTitle>
                                                <DialogDescription>
                                                    Manage the options for this field
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                {(field.options || []).map((option, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            placeholder="Label"
                                                            value={option.label}
                                                            onChange={(e) => updateOption(index, "label", e.target.value)}
                                                        />
                                                        <Input
                                                            placeholder="Value"
                                                            value={option.value}
                                                            onChange={(e) => updateOption(index, "value", e.target.value)}
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeOption(index)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button onClick={addOption} variant="outline" className="w-full">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Option
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(field.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function FormBuilder({ fields, onChange }) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addField = (type) => {
        const newField = {
            id: `field_${Date.now()}`,
            type,
            label: "",
            name: "",
            placeholder: "",
            required: false,
            options: type === "select" || type === "checkbox" ? [] : undefined,
        };
        onChange([...fields, newField]);
    };

    const updateField = (id, updatedField) => {
        const newFields = fields.map(field => 
            field.id === id ? updatedField : field
        );
        onChange(newFields);
    };

    const deleteField = (id) => {
        const newFields = fields.filter(field => field.id !== id);
        onChange(newFields);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = fields.findIndex(field => field.id === active.id);
            const newIndex = fields.findIndex(field => field.id === over.id);
            onChange(arrayMove(fields, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-6">
            {/* Field Types Palette */}
            <div>
                <h4 className="font-medium mb-3">Add Fields</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {fieldTypes.map((fieldType) => {
                        const Icon = fieldType.icon;
                        return (
                            <Button
                                key={fieldType.type}
                                variant="outline"
                                size="sm"
                                onClick={() => addField(fieldType.type)}
                                className="justify-start"
                            >
                                <Icon className="h-4 w-4 mr-2" />
                                {fieldType.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Form Fields */}
            <div>
                <h4 className="font-medium mb-3">Form Fields</h4>
                {fields.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <p className="text-muted-foreground">
                                No fields added yet. Add some fields from the palette above.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={fields.map(field => field.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {fields.map((field) => (
                                <SortableField
                                    key={field.id}
                                    field={field}
                                    onUpdate={updateField}
                                    onDelete={deleteField}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}
