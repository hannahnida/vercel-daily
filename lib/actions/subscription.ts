'use server';

import { cookies } from 'next/headers';

import { apiFetch } from '@/lib/api/client';
import handleApiError from '@/lib/api/handle-error';
import { SUBSCRIPTION_TOKEN_COOKIE } from '@/lib/constants';
import type { SubscribeStatus } from '@/lib/types/subscribe-status';


export async function createNewSubscription() {
  try {
    const res = await apiFetch<SubscribeStatus>('/subscription/create', {
      method: 'POST',
    });

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);

    (await cookies()).set(SUBSCRIPTION_TOKEN_COOKIE, res.data?.token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      expires,
    });
    return res.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function activateSubscription() {
  const token = (await cookies()).get(SUBSCRIPTION_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const res = await apiFetch<SubscribeStatus>('/subscription', {
      method: 'POST',
      headers: {
        'x-subscription-token': token
      }
    });
    return res.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function deactivateSubscription() {
  const token = (await cookies()).get(SUBSCRIPTION_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const res = await apiFetch<SubscribeStatus>('/subscription', {
      method: 'DELETE',
      headers: {
        'x-subscription-token': token
      }
    });
    return res.data;
  } catch (e) {
    handleApiError(e);
  }
}