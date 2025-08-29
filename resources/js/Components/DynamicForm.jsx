import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function DynamicForm({ formId, formData }) {
    const [formStructure, setFormStructure] = useState(null);
    const [loading, setLoading] = useState(!formData);
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Use provided form data or fetch from API
    useEffect(() => {
        if (formData) {
            setFormStructure(formData);
            setLoading(false);
        } else {
            // Fallback to API call if no form data provided
            const apiUrl = `${window.location.origin}${window.location.pathname.includes('/gdca/') ? '/gdca' : ''}/api/forms/${formId}`;
            
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setFormStructure(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching form:', error);
                    setLoading(false);
                });
        }
    }, [formId, formData]);

    const onSubmit = async (formData) => {
        setSubmitting(true);
        setSubmitMessage('');
        
        try {
            // Use relative URL based on current window location
            const submitUrl = `${window.location.origin}${window.location.pathname.includes('/gdca/') ? '/gdca' : ''}/forms/${formId}/submit`;
            
            const response = await fetch(submitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitSuccess(true);
                setSubmitMessage(result.message || formStructure?.success_message || 'Form submitted successfully!');
                reset();
            } else {
                setSubmitSuccess(false);
                setSubmitMessage(result.message || 'Error submitting form. Please try again.');
                console.error('Form submission error:', result);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setSubmitSuccess(false);
            setSubmitMessage('Error submitting form. Please check your connection and try again.');
        }
        
        setSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 8000);
    };

    if (loading) {
        return (
            <Card className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </Card>
        );
    }

    if (!formStructure) {
        return (
            <Card className="p-6">
                <p className="text-red-600">Form not found.</p>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {formStructure.name}
                    </h3>
                </div>

                {submitMessage && (
                    <div className={`p-4 rounded-md flex items-center ${
                        submitSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                        {submitSuccess ? (
                            <CheckCircle className="w-5 h-5 mr-2" />
                        ) : (
                            <AlertCircle className="w-5 h-5 mr-2" />
                        )}
                        {submitMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {formStructure.structure?.map((field, index) => (
                        <FormField 
                            key={index} 
                            field={field} 
                            register={register} 
                            errors={errors}
                        />
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={submitting}>
                        <Send className="w-4 h-4 mr-2" />
                        {submitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

function FormField({ field, register, errors }) {
    const fieldProps = {
        ...register(field.name, { 
            required: field.required ? `${field.label} is required` : false 
        }),
        placeholder: field.placeholder || '',
        className: errors[field.name] ? 'border-red-500' : '',
    };

    const renderField = () => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'number':
                return <Input type={field.type} {...fieldProps} />;
            
            case 'textarea':
                return <Textarea rows={field.rows || 4} {...fieldProps} />;
            
            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox {...register(field.name)} />
                        <Label htmlFor={field.name}>{field.label}</Label>
                    </div>
                );
            
            case 'select':
                return (
                    <select {...fieldProps} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="">Select an option</option>
                        {field.options?.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            
            default:
                return <Input {...fieldProps} />;
        }
    };

    if (field.type === 'checkbox') {
        return (
            <div>
                {renderField()}
                {errors[field.name] && (
                    <p className="text-sm text-red-600 mt-1">{errors[field.name]?.message}</p>
                )}
            </div>
        );
    }

    return (
        <div>
            <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderField()}
            {errors[field.name] && (
                <p className="text-sm text-red-600 mt-1">{errors[field.name]?.message}</p>
            )}
        </div>
    );
}
