import { Link, useLocation } from 'react-router-dom';
import { Clock, Smartphone, Settings } from 'lucide-react';

export default function BottomTab() {
  const location = useLocation();

  const tabs = [
    { path: '/', icon: Clock, label: 'Clock' },
    { path: '/widget', icon: Smartphone, label: 'Widget' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background flex justify-around z-40" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}