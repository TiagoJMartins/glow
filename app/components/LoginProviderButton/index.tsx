'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type EnabledProviders = 'credentials';

const providerIcons: Record<EnabledProviders, ReactNode> = {
  credentials: (
    <svg viewBox="0 0 248 204" width={16} height={16}>
      <path
        fill="currentColor"
        d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
      />
    </svg>
  ),
};

const providerConfigs: Record<EnabledProviders, ClientSafeProvider> = {
  credentials: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    signinUrl: '/api/auth/signin',
    callbackUrl: '/api/auth/callback',
  },
};

interface Props {
  provider: EnabledProviders;
  className?: string;
  variant?: 'glow' | 'default';
  size?: 'lg' | 'md';
  onClick?: () => Promise<void>;
  disabled?: boolean;
}

export function LoginProviderButton({
  className,
  variant = 'default',
  size = 'md',
  onClick,
  disabled,
}: Props) {
  return (
    <button
      type="submit"
      onClick={async () => {
        if (disabled) {
          return;
        }

        if (onClick) {
          await onClick();
        }
        signIn("credentials");
      }}
      disabled={disabled}
      className={cn(
        'flex w-full justify-center items-center border rounded-md font-semibold leading-6',
        size === 'lg' && 'px-6 py-3 text-base',
        size === 'md' && 'px-3 py-1.5 text-sm',
        variant === 'default' &&
          'border-stone-200 bg-white text-stone-800 hover:bg-stone-100',
        variant === 'glow' && 'bg-black text-white',
        disabled && 'opacity-20 hover:bg-white cursor-not-allowed',
        className
      )}
    >
      <span className="ml-3">Continue</span>
    </button>
  );
}
