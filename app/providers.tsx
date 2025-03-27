'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { useRouter } from 'nextjs-toploader/app';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider
        toastProps={{
          shouldShowTimeoutProgress: true
        }}
      />
      <SessionProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
        <NextTopLoader
          height={4}
          showSpinner={false}
          shadow="false"
          easing="ease"
          color="hsl(var(--heroui-primary))"
        />
      </SessionProvider>
    </HeroUIProvider>
  );
}
