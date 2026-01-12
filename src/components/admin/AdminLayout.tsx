import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar />
      
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {/* Header */}
          {(title || description) && (
            <div className="mb-8">
              {title && <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>}
              {description && <p className="text-gray-400">{description}</p>}
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </main>
    </div>
  );
};
