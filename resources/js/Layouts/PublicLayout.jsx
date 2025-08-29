import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function PublicLayout({ 
    children, 
    seo,
    navigationMenu,
    siteSettings
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head>
                <title>{seo?.title || siteSettings?.site_name || 'GDCA'}</title>
                <meta 
                    name="description" 
                    content={seo?.description || siteSettings?.meta_description} 
                />
                <meta 
                    name="keywords" 
                    content={seo?.keywords || siteSettings?.meta_keywords} 
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                {/* Open Graph */}
                <meta property="og:title" content={seo?.title || siteSettings?.site_name} />
                <meta property="og:description" content={seo?.description || siteSettings?.meta_description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={seo?.canonical} />
                {seo?.ogImage && <meta property="og:image" content={seo.ogImage} />}
                
                {/* Canonical URL */}
                {seo?.canonical && <link rel="canonical" href={seo.canonical} />}
                
                {/* Custom CSS */}
                {siteSettings?.custom_css && (
                    <style dangerouslySetInnerHTML={{ __html: siteSettings.custom_css }} />
                )}
                
                {/* Head Scripts */}
                {siteSettings?.head_scripts && (
                    <div dangerouslySetInnerHTML={{ __html: siteSettings.head_scripts }} />
                )}
            </Head>

            <div className="min-h-screen bg-white flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <a href="/" className="text-2xl font-bold text-gray-900">
                                    {siteSettings?.site_name || 'GDCA'}
                                </a>
                                {siteSettings?.site_tagline && (
                                    <p className="text-sm text-gray-500">
                                        {siteSettings.site_tagline}
                                    </p>
                                )}
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-8">
                                    {navigationMenu?.map((item) => {
                                        let href = '#';
                                        if (item.type === 'page' && item.page) {
                                            href = `/${item.page.slug}`;
                                        } else if (item.type === 'custom' && item.url) {
                                            href = item.url;
                                        }
                                        
                                        return (
                                            <Link
                                                key={item.id}
                                                href={href}
                                                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                >
                                    {mobileMenuOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {mobileMenuOpen && (
                            <div className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                                    {navigationMenu?.map((item) => {
                                        let href = '#';
                                        if (item.type === 'page' && item.page) {
                                            href = `/${item.page.slug}`;
                                        } else if (item.type === 'custom' && item.url) {
                                            href = item.url;
                                        }
                                        
                                        return (
                                            <Link
                                                key={item.id}
                                                href={href}
                                                className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Company Info */}
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-bold mb-4">
                                    {siteSettings?.['site.name'] || 'GDCA'}
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    {siteSettings?.['site.description'] || 'Your trusted partner for professional services'}
                                </p>
                                <div className="space-y-2 text-sm text-gray-300">
                                    {siteSettings?.['site.address'] && (
                                        <p>{siteSettings['site.address']}</p>
                                    )}
                                    {siteSettings?.['site.phone'] && (
                                        <p>Phone: {siteSettings['site.phone']}</p>
                                    )}
                                    {siteSettings?.['site.email'] && (
                                        <p>Email: {siteSettings['site.email']}</p>
                                    )}
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    {navigationMenu?.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                href={item.slug === '/' ? '/' : `/pages/${item.slug}`}
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Subscribe to get updates
                                </p>
                                <NewsletterForm />
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} {siteSettings?.site_name || 'GDCA'}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Body Scripts */}
            {siteSettings?.body_scripts && (
                <div dangerouslySetInnerHTML={{ __html: siteSettings.body_scripts }} />
            )}
        </>
    );
}

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            
            if (response.ok) {
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                setMessage('Error: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            setMessage('Error: Failed to subscribe');
        }
        
        setSubmitting(false);
        setTimeout(() => setMessage(''), 5000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="rounded-r-none border-r-0 bg-white"
                    required
                />
                <Button 
                    type="submit" 
                    disabled={submitting}
                    className="rounded-l-none"
                >
                    {submitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </div>
            {message && (
                <p className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                    {message}
                </p>
            )}
        </form>
    );
}
