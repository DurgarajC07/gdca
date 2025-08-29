import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import parse from 'html-react-parser';
import DynamicForm from '@/Components/DynamicForm';

export default function Page({ 
    page, 
    navigationMenu, 
    siteSettings, 
    seo,
    forms 
}) {
    // Process content to replace form shortcodes with dynamic forms
    const processContent = (content) => {
        // Simple regex to find [form id=X] shortcodes
        const formShortcodeRegex = /\[form\s+id=(\d+)\]/g;
        
        return content.replace(formShortcodeRegex, (match, formId) => {
            return `<div data-form-id="${formId}"></div>`;
        });
    };

    // Parse HTML and replace form placeholders with React components
    const parseContent = (content) => {
        const processedContent = processContent(content);
        let formCounter = 0;
        
        return parse(processedContent, {
            replace: (domNode) => {
                if (domNode.type === 'tag' && domNode.name === 'div' && domNode.attribs?.['data-form-id']) {
                    const formId = parseInt(domNode.attribs['data-form-id']);
                    const formData = forms?.[formId];
                    formCounter++;
                    return <DynamicForm key={`form-${formId}-${formCounter}`} formId={formId} formData={formData} />;
                }
            }
        });
    };

    const seoTitle = page.seo_title || page.title;
    const seoDescription = page.seo_description || siteSettings?.['seo.meta_description'];
    const seoKeywords = page.seo_keywords || siteSettings?.['seo.meta_keywords'];

    return (
        <PublicLayout
            seo={seo}
            navigationMenu={navigationMenu}
            siteSettings={siteSettings}
        >
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <article className="prose max-w-none">
                    {parseContent(page.content)}
                </article>
            </div>
        </PublicLayout>
    );
}
