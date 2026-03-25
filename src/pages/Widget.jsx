import LockScreenWidget from '@/components/LockScreenWidget';

export default function Widget() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),rgba(0,0,0,1)_58%)] px-4">
      <LockScreenWidget />
    </div>
  );
}