import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export const StatCard = ({ icon: Icon, label, value, subtitle, color = 'red' }: StatCardProps) => {
  const colorClasses = {
    red: 'text-red-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
  };

  const iconColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.red;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};
