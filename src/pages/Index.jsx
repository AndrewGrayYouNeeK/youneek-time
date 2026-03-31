import YouNeekClock from '@/components/YouNeekClock';
import AnimatedStars from '@/components/younEEK/AnimatedStars';
import ShootingStar from '@/components/younEEK/ShootingStar';

export default function Index() {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <AnimatedStars />
      <ShootingStar />
      <div className="relative z-10">
        <YouNeekClock />
      </div>
    </div>
  );
}