import { apiFetch } from '@/lib/api/client';
import { SUBSCRIPTION_TOKEN_COOKIE } from '@/lib/constants';
import { cookies } from 'next/headers';
import type { SubscribeStatus } from '@/lib/types/subscribe-status';

export async function getSubscriptionStatus(){
  const token = (await cookies()).get(SUBSCRIPTION_TOKEN_COOKIE)?.value;
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