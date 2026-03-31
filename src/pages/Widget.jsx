import WidgetShowcase from '@/components/younEEK/WidgetShowcase';

export default function Widget() {
  return (
    <div className="min-h-screen bg-black bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="relative z-10 px-4 py-10">
        <WidgetShowcase />
      </div>
    </div>
  );
}