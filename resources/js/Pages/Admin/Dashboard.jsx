import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card } from '@/components/ui/card';
import { 
    FileText, 
    Menu, 
    FormInput, 
    Users, 
    Mail,
    TrendingUp,
    Activity,
    Globe
} from 'lucide-react';

export default function Dashboard({ stats }) {
    const cards = [
        {
            title: 'Total Pages',
            value: stats?.pages || 0,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Menu Items',
            value: stats?.menuItems || 0,
            icon: Menu,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Forms',
            value: stats?.forms || 0,
            icon: FormInput,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Subscribers',
            value: stats?.subscribers || 0,
            icon: Users,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            title: 'Form Submissions',
            value: stats?.submissions || 0,
            icon: Mail,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
        },
        {
            title: 'Published Pages',
            value: stats?.publishedPages || 0,
            icon: Globe,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome to GDCA Admin Panel
                    </h1>
                    <p className="text-gray-600">
                        Manage your website content, forms, and settings from this central dashboard.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.title} className="p-6">
                                <div className="flex items-center">
                                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                                        <Icon className={`w-6 h-6 ${card.color}`} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">
                                            {card.title}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {card.value}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="/admin/pages/create"
                                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <FileText className="w-4 h-4 mr-3" />
                                Create New Page
                            </a>
                            <a
                                href="/admin/forms/create"
                                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <FormInput className="w-4 h-4 mr-3" />
                                Create New Form
                            </a>
                            <a
                                href="/admin/settings"
                                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <Activity className="w-4 h-4 mr-3" />
                                Site Settings
                            </a>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            <div className="text-sm text-gray-600">
                                No recent activity to display
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
