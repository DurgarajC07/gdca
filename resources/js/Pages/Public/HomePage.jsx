import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import parse from 'html-react-parser';
import DynamicForm from '@/Components/DynamicForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ExternalLink, Calendar, User, ArrowRight, Star, Quote, CheckCircle } from 'lucide-react';

export default function HomePage({ 
    page, 
    navigationMenu, 
    siteSettings, 
    seo,
    forms,
    homeSections = [],
    portfolioItems = []
}) {
    // Process content to replace form shortcodes with dynamic forms
    const processContent = (content) => {
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

    return (
        <PublicLayout
            seo={seo}
            navigationMenu={navigationMenu}
            siteSettings={siteSettings}
        >
            {/* Hero Section */}
            <HeroSection sections={homeSections} />
            
            {/* About Section */}
            <AboutSection sections={homeSections} />
            
            {/* Services Section */}
            <ServicesSection sections={homeSections} />
            
            {/* Portfolio Section */}
            <PortfolioSection portfolioItems={portfolioItems} sections={homeSections} />
            
            {/* Testimonials Section */}
            <TestimonialsSection sections={homeSections} />
            
            {/* Contact Section */}
            <ContactSection sections={homeSections} forms={forms} />
        </PublicLayout>
    );
}

// Hero Section Component
function HeroSection({ sections }) {
    const heroSection = sections.find(s => s.name === 'hero');
    
    if (!heroSection) return null;

    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
            {heroSection.background_image && (
                <div className="absolute inset-0 bg-black/40">
                    <img 
                        src={heroSection.background_image} 
                        alt="Hero Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        {heroSection.title}
                    </h1>
                    {heroSection.subtitle && (
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            {heroSection.subtitle}
                        </p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </section>
    );
}

// About Section Component
function AboutSection({ sections }) {
    const aboutSection = sections.find(s => s.name === 'about');
    
    if (!aboutSection) return null;

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            {aboutSection.title}
                        </h2>
                        {aboutSection.subtitle && (
                            <p className="text-xl text-gray-600 mb-6">
                                {aboutSection.subtitle}
                            </p>
                        )}
                        {aboutSection.content && (
                            <div className="prose prose-lg text-gray-600 mb-8">
                                {parse(aboutSection.content)}
                            </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                                <div className="text-gray-600">Projects Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                                <div className="text-gray-600">Years Experience</div>
                            </div>
                        </div>
                        
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Learn More About Us
                        </Button>
                    </div>
                    
                    <div className="mt-12 lg:mt-0">
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                alt="About Us"
                                className="rounded-lg shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Services Section Component
function ServicesSection({ sections }) {
    const servicesSection = sections.find(s => s.name === 'services');
    
    if (!servicesSection) return null;

    const services = [
        {
            title: 'Web Development',
            description: 'Custom web applications built with modern technologies and best practices.',
            icon: '🚀'
        },
        {
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS and Android.',
            icon: '📱'
        },
        {
            title: 'UI/UX Design',
            description: 'Beautiful and intuitive user interfaces designed for optimal user experience.',
            icon: '🎨'
        },
        {
            title: 'Digital Marketing',
            description: 'Comprehensive digital marketing strategies to grow your online presence.',
            icon: '📈'
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        {servicesSection.title}
                    </h2>
                    {servicesSection.subtitle && (
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {servicesSection.subtitle}
                        </p>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Portfolio Section Component
function PortfolioSection({ portfolioItems, sections }) {
    const portfolioSection = sections.find(s => s.name === 'portfolio');
    
    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        {portfolioSection?.title || 'Our Portfolio'}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {portfolioSection?.subtitle || 'Take a look at some of our recent work'}
                    </p>
                </div>
                
                {portfolioItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                {item.featured_image && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img 
                                            src={item.featured_image} 
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                )}
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="secondary">{item.category}</Badge>
                                        {item.completed_at && (
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(item.completed_at).getFullYear()}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {item.description}
                                    </p>
                                    {item.client_name && (
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <User className="w-4 h-4 mr-1" />
                                            {item.client_name}
                                        </div>
                                    )}
                                    {item.project_url && (
                                        <Button variant="outline" size="sm" className="w-full">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Project
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No portfolio items to display yet.</p>
                    </div>
                )}
                
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                        View All Projects
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

// Testimonials Section Component
function TestimonialsSection({ sections }) {
    const testimonialsSection = sections.find(s => s.name === 'testimonials');
    
    const testimonials = [
        {
            content: "Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations.",
            author: "Sarah Johnson",
            company: "Tech Startup Inc.",
            rating: 5
        },
        {
            content: "Professional, creative, and reliable. I couldn't ask for a better development partner for my business.",
            author: "Michael Chen",
            company: "Digital Solutions LLC",
            rating: 5
        },
        {
            content: "The attention to detail and quality of work is outstanding. Highly recommend their services.",
            author: "Emily Davis",
            company: "Creative Agency",
            rating: 5
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        {testimonialsSection?.title || 'What Our Clients Say'}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {testimonialsSection?.subtitle || 'Don\'t take our word for it - hear from our satisfied clients'}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="p-6">
                                <Quote className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                                <p className="text-gray-600 mb-6 italic">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex justify-center mb-2">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {testimonial.author}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {testimonial.company}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Contact Section Component
function ContactSection({ sections, forms }) {
    const contactSection = sections.find(s => s.name === 'contact');
    
    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        {contactSection?.title || 'Get In Touch'}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {contactSection?.subtitle || 'Ready to start your next project? Let\'s discuss how we can help you achieve your goals.'}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                            Contact Information
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Address</h4>
                                    <p className="text-gray-600 mt-1">
                                        123 Business Street, Suite 100<br />
                                        Downtown City, State 12345
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Phone</h4>
                                    <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                                    <p className="text-gray-500 text-sm">Mon-Fri 9AM-6PM</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600 mt-1">hello@gdca.com</p>
                                    <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Website</h4>
                                    <p className="text-gray-600 mt-1">www.gdca.com</p>
                                    <p className="text-gray-500 text-sm">Visit our online portfolio</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                            Send us a Message
                        </h3>
                        {forms && forms[1] && (
                            <DynamicForm formId={1} formData={forms[1]} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
