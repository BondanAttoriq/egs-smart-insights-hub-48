import React from 'react';
import { 
  Home, 
  Target, 
  GitCompare, 
  Database, 
  Users, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EGSSidebarProps {
  collapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'well-analysis', label: 'Well Analysis', icon: Target },
  { id: 'offset-analysis', label: 'Offset Well Analysis', icon: GitCompare },
  { id: 'data-imports', label: 'Data & Imports', icon: Database },
  { id: 'user-management', label: 'User Management', icon: Users },
];

export const EGSSidebar: React.FC<EGSSidebarProps> = ({
  collapsed,
  activeSection,
  onSectionChange,
  onToggle,
}) => {
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[hsl(29,100%,50%)] to-[hsl(39,100%,64%)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EGS</span>
              </div>
              <div>
                <h2 className="font-bold text-[hsl(217,33%,17%)] text-sm">EGS Analysis</h2>
                <p className="text-xs text-gray-500">v2.1.0</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center text-left px-3 py-2.5 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-gradient-to-r from-[hsl(29,100%,50%,0.1)] to-[hsl(39,100%,64%,0.1)] text-[hsl(29,100%,50%)] border border-[hsl(29,100%,50%,0.2)]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[hsl(29,100%,50%)]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};