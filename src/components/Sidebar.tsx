
import { Monitor, Database, BarChart3, Home, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'monitor', label: 'Real-Time Monitor', icon: Monitor },
    { id: 'dataset', label: 'Cloud Dataset', icon: Database },
    { id: 'analysis', label: 'Professional Analysis', icon: BarChart3 },
    { id: 'egs-analysis', label: 'EGS Offset Analysis', icon: Zap },
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-r border-orange-100">
      <div className="p-6 border-b border-orange-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">EG</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">EGSmart 1.0</h2>
            <p className="text-xs text-gray-500">ML-Powered Drilling</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeSection === item.id
                      ? "bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 border border-orange-200"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
