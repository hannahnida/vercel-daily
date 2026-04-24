'use client';

import { useTransition, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, BellOff } from 'lucide-react';
import {
  createNewSubscription,
  activateSubscription,
  deactivateSubscription,
} from '@/lib/actions/subscription';
import { useToast } from '@/components/toast-provider';

export default function SubscribeButton({
  isSubscribed,
  showIcon = false,
}: {
  isSubscribed: boolean;
  showIcon?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticSubscribed, setOptimisticSubscribed] = useOptimistic(isSubscribed);
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubscribe = () => {
    startTransition(async () => {
      try {
        if (!optimisticSubscribed) {
          setOptimisticSubscribed(true);
          await createNewSubscription();
          await activateSubscription();
          addToast('You are now subscribed!', 'success');
        } else {
          setOptimisticSubscribed(false);
          await deactivateSubscription();
          addToast('You have been unsubscribed.', 'success');
        }
        router.refresh();
      } catch (e) {
        console.error('[SubscribeButton]', JSON.stringify(e, null, 2));
        addToast('Something went wrong. Please try again later.', 'error');
      }
    });
  };

  if (showIcon) {
    return (
      <div className="mr-2">
        <button
          className={`btn btn-square btn-sm ${optimisticSubscribed ? '' : ' btn-ghost'}`}
          onClick={handleSubscribe}
          disabled={isPending}
          aria-label={optimisticSubscribed ? 'Unsubscribe' : 'Subscribe'}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-xs" />
          ) : optimisticSubscribed ? (
            <BellOff size={20} />
          ) : (
            <Bell size={20} />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {optimisticSubscribed ? (
        <button
          className="btn min-w-30"
          onClick={handleSubscribe}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Unsubscribe'}
        </button>
      ) : (
        <button
          className="btn btn-soft min-w-30"
          onClick={handleSubscribe}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Subscribe'}
        </button>
      )}
    </div>
  );
}