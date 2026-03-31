import YouNeekClock from '@/components/YouNeekClock';

export default function Index() {
  return (
    <div className="min-h-screen bg-black bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/60">
        <YouNeekClock />
      </div>
    </div>
  );
}