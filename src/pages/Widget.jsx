import WidgetShowcase from '@/components/younEEK/WidgetShowcase';
import AnimatedStars from '@/components/younEEK/AnimatedStars';

export default function Widget() {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <AnimatedStars />
      <div className="relative z-10 px-4 py-10">
        <WidgetShowcase />
      </div>
    </div>
  );
}