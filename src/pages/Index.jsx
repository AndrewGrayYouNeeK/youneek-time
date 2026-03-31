import YouNeekClock from '@/components/YouNeekClock';
import AnimatedStars from '@/components/younEEK/AnimatedStars';

export default function Index() {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <AnimatedStars />
      <div className="relative z-10">
        <YouNeekClock />
      </div>
    </div>
  );
}