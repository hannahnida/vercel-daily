'use client';

import { useTransition } from 'react';
import { createNewSubscription, activateSubscription, deactivateSubscription } from '@/lib/actions/subscription';

type SubscriptionStatus = 'active' | 'inactive' | null;

export default function SubscribeButton({ status }: { status: SubscriptionStatus }) {
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = async () => {
    if (status === null) {
      await createNewSubscription();
      await activateSubscription();
    } else {
      await activateSubscription();
    }
  };

  return status === 'active'
    ? (
      <button
        className="btn min-w-[120px]"
        onClick={() => startTransition(async () => { await deactivateSubscription() })}
        disabled={isPending}
      >
        {isPending ? 'Updating...' : 'Unsubscribe'}
      </button>
    )
    : (
      <button
        className="btn min-w-[120px]"
        onClick={handleSubscribe}
        disabled={isPending}
      >
        {isPending ? 'Updating...' : 'Subscribe'}
      </button>
    );
}