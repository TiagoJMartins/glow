'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { LoginProviderButton } from '../LoginProviderButton';
import { Button } from '@/components/ui/button';

interface Props {
  trigger: React.ReactNode;
  isSignup?: boolean;
}

export function LoginWidget({ trigger, isSignup }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isSignup ? 'Get started ' : 'Welcome back!'}
          </DialogTitle>
          <DialogDescription>
            {isSignup
              ? 'Create your account using one of the options below'
              : 'Login to your account below.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoginProviderButton provider="credentials" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
