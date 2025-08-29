import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
    LayoutDashboard, 
    FileText, 
    Menu, 
    Settings, 
    FormInput,
    Images,
    Users,
    Mail,
    Code,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Home,
    Briefcase
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, adminOnly: false },
    { name: 'Pages', href: '/admin/pages', icon: FileText, adminOnly: false },
    { name: 'Home Sections', href: '/admin/home-sections', icon: Home, adminOnly: false },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase, adminOnly: false },
    { name: 'Menus', href: '/admin/menu-items', icon: Menu, adminOnly: false },
    { name: 'Forms', href: '/admin/forms', icon: FormInput, adminOnly: false },
    { name: 'Media', href: '/admin/media', icon: Images, adminOnly: false },
    { name: 'Settings', href: '/admin/site-settings', icon: Settings, adminOnly: true },
];

export default function AdminLayout({ children }) {
    const { auth, url } = usePage().props;
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const isAdmin = auth?.user?.role === 'admin';

    const filteredNavigation = navigation.filter(item => !item.adminOnly || isAdmin);

    // Safety check for auth
    if (!auth || !auth.user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={cn(
                "bg-white shadow-sm border-r transition-all duration-300",
                sidebarCollapsed ? "w-16" : "w-64"
            )}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        {!sidebarCollapsed && (
                            <h1 className="text-xl font-bold text-gray-900">GDCA Admin</h1>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {filteredNavigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = url ? url.startsWith(item.href) : false;
                                
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                                isActive 
                                                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            {!sidebarCollapsed && (
                                                <span className="ml-3">{item.name}</span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User info */}
                    <div className="p-4 border-t">
                        <div className={cn(
                            "flex items-center",
                            sidebarCollapsed ? "justify-center" : "justify-between"
                        )}>
                            {!sidebarCollapsed && (
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">
                                        {auth.user.role}
                                    </p>
                                </div>
                            )}
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <LogOut className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {getPageTitle(url || '/admin')}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                target="_blank"
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                View Site
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

function getPageTitle(url) {
    if (!url || typeof url !== 'string') {
        return 'Dashboard';
    }
    
    const pathSegments = url.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    if (url === '/admin') return 'Dashboard';
    
    const titles = {
        'pages': 'Pages',
        'menus': 'Menus',
        'forms': 'Forms',
        'subscribers': 'Subscribers',
        'email-templates': 'Email Templates',
        'scripts': 'Scripts',
        'settings': 'Settings',
    };
    
    return titles[lastSegment] || 'Admin';
}
