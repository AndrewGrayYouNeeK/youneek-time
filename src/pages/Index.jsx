import YouNeekClock from '@/components/YouNeekClock';

export default function Index() {
  return (
    <div className="min-h-screen bg-black bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <YouNeekClock />
      </div>
    </div>
  );
}