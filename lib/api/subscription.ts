import { apiFetch } from '@/lib/api/client';
import handleApiError from '@/lib/api/handle-error';
import { cookies } from 'next/headers';
import type { SubscribeStatus } from '@/lib/types/subscribe-status';

export async function getSubscriptionStatus(){
  const token = (await cookies()).get('subscription_token')?.value;
  if (!token) return null;

  try {
    const res = await apiFetch<SubscribeStatus>("/subscription", {
      method: "GET",
      headers: {
        'x-subscription-token': token
      }
    });
    return res.data.status;
  } catch (e) {
    handleApiError(e);
    return null;
  }
}