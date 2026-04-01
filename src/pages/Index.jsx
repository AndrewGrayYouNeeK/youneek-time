import YouNeekClock from '@/components/YouNeekClock';
import AnimatedStars from '@/components/younEEK/AnimatedStars';
import ShootingStar from '@/components/younEEK/ShootingStar';
import PullToRefresh from '@/components/PullToRefresh';

export default function Index() {
  const handleRefresh = async () => {
    window.dispatchEvent(new Event('refresh-data'));
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen relative bg-black text-white">
      <AnimatedStars />
      <ShootingStar />
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="relative z-10">
          <YouNeekClock />
        </div>
      </PullToRefresh>
    </div>
  );
}