import { getSubscriptionStatus } from '@/lib/api/subscription';
import SubscribeButton from '@/components/subscribe-button';

type PaywallProps = {
  children: React.ReactNode;
  preview?: React.ReactNode;
  fallback?: React.ReactNode;
};

export default async function Paywall({ children, preview, fallback }: PaywallProps) {
  const { isSubscribed, status } = await getSubscriptionStatus();

  if (isSubscribed) {
    return <>{children}</>;
  }

  return (
    <div>
      <div className="relative pointer-events-none select-none overflow-hidden max-h-48">
        {preview}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-base-100 to-transparent" />
      </div>
      <div className="bg-base-100 pt-4">
        {fallback ?? <DefaultUpsell />}
      </div>
    </div>
  );
}

function DefaultUpsell() {
  return (
    <aside
      aria-label='Subscription required'
      className='border border-base-300 rounded-box bg-base-200 px-6 py-8 text-center shadow-sm'
    >
      <p className='text-xs font-semibold uppercase tracking-widest text-primary mb-3'>
        Members only
      </p>
      <h2 className='text-2xl font-extrabold mb-2'>
        Subscribe to keep reading
      </h2>
      <p className='text-base-content/70 mb-6 max-w-sm mx-auto'>
        Get unlimited access to every Vercel Daily article — in-depth analysis,
        breaking news, and exclusive deep-dives.
      </p>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
        <SubscribeButton status={null} />
      </div>
    </aside>
  );
}