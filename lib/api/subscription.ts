import { apiFetch } from '@/lib/api/client';
import { cookies } from 'next/headers';
import type { SubscribeStatus } from '@/lib/types/subscribe-status';

export async function getSubscriptionStatus(){
  const token = (await cookies()).get('subscription_token')?.value;
  if (!token) return { isSubscribed: false, status: null };

  try {
    const res = await apiFetch<SubscribeStatus>('/subscription', {
      method: 'GET',
      headers: {
        'x-subscription-token': token
      }
    });
    return {
      isSubscribed: res.data.status === 'active',
      status: res.data.status,
    };
  } catch {
    // Subscription check should never crash the page.
    // Fail closed: treat any error as "not subscribed".
    return { isSubscribed: false, status: null };
  }
}