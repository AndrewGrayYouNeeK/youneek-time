import YouNeekClock from '@/components/YouNeekClock';
import WidgetShowcase from '@/components/younEEK/WidgetShowcase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),rgba(0,0,0,1)_55%)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-100/40">Decimal time system</p>
          <h1 className="mt-4 text-4xl font-light tracking-[0.24em] text-white sm:text-5xl">YouNeeK Time</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/55 sm:text-base">
            A glowing base-10 clock with a matching lock screen widget set.
          </p>
        </div>

        <Tabs defaultValue="clock" className="w-full">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2 border border-white/10 bg-white/5 text-white">
            <TabsTrigger value="clock">Clock</TabsTrigger>
            <TabsTrigger value="widgets">Widgets</TabsTrigger>
          </TabsList>

          <TabsContent value="clock" className="mt-8 border-0 p-0">
            <YouNeekClock />
          </TabsContent>

          <TabsContent value="widgets" className="mt-8 border-0 p-0">
            <WidgetShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}