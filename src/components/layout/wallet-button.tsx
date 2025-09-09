"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet } from 'lucide-react';

interface WalletButtonProps {
  size?: "sm" | "default" | "lg";
  showPopover?: boolean;
  onProfileClick?: () => void;
}

export function WalletButton({ size = "default", showPopover = false }: WalletButtonProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <Button
            onClick={openConnectModal}
            size={size}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-purple-500 hover:to-pink-500 text-white"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        )}
      </ConnectButton.Custom>
    );
  }

  if (showPopover) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/60 border border-orange-500/20">
      <Avatar className="w-6 h-6 border border-orange-500/30">
        <AvatarImage src={session.user?.image || undefined} />
        <AvatarFallback className="bg-orange-500/10 text-xs text-orange-600">
          {session.address?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-orange-600">
        {session.address?.slice(0, 6)}...{session.address?.slice(-4)}
      </span>
    </div>
  );
}