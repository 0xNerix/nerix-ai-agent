"use client";

import { Gamepad2, MessageSquare, Image } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    totalGames: number;
    totalMessages: number;
    totalNFTs: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      icon: Gamepad2,
      label: 'Games',
      value: stats.totalGames,
      color: 'text-blue-500'
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      value: stats.totalMessages,
      color: 'text-green-500'
    },
    {
      icon: Image,
      label: 'NFTs',
      value: stats.totalNFTs,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {statItems.map((item) => (
        <div key={item.label} className="text-center p-2">
          <div className="flex items-center justify-center mb-1">
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </div>
          <div className="text-lg font-bold text-foreground">
            {item.value.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}