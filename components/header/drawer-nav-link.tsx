'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';


export function DrawerNavLink({
  drawerId,
  ...linkProps
}: ComponentProps<typeof Link> & { drawerId: string }) {
  return (
    <Link
      {...linkProps}
      onClick={() => {
        const checkbox = document.getElementById(drawerId) as HTMLInputElement | null;
        if (checkbox) checkbox.checked = false;
      }}
    />
  );
}