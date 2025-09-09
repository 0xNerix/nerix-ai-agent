import { notFound } from 'next/navigation';
import { ProfileLayout } from '@/components/profile/profile-layout';
import type { ProfileData } from '@/components/profile/types';
import type { Metadata } from 'next';
import { serverApi } from '@/lib/api/server-client';
import { logger } from '@/lib/utils/logger';

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { address } = await params;
  const profileData = await getProfileData(address);
  
  if (!profileData) {
    return {
      title: 'Profile Not Found',
      description: 'The requested user profile could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  return {
    title: `${shortAddress} Profile`,
    description: `View ${shortAddress}'s gaming profile, NFT collection, game statistics, and achievements on Nerix AI gaming platform.`,
    keywords: 'user profile, gaming statistics, NFT collection, blockchain gaming, Web3 profile, crypto gaming achievements',
    openGraph: {
      title: `${shortAddress} Profile | Nerix AI Gaming Platform`,
      description: `View ${shortAddress}'s gaming profile and achievements on Nerix.`,
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${shortAddress} Profile | Nerix AI Gaming Platform`,
      description: `View ${shortAddress}'s gaming profile and achievements on Nerix.`,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

interface ProfilePageProps {
  params: Promise<{ address: string }>;
}

async function getProfileData(address: string): Promise<ProfileData | null> {
  try {
    const data = await serverApi.profile.getByAddress(address);
    
    // Check if it's an error response
    if ('error' in data) {
      logger.error('Profile API error:', data);
      return null;
    }

    return data;
  } catch (error) {
    logger.error('Failed to fetch profile data:', error);
    return null;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { address } = await params;

  if (!address) {
    notFound();
  }

  const profileData = await getProfileData(address);

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-xl font-bold text-red-400">Profile Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The profile for address <span className="font-mono text-sm">{address}</span> could not be found or loaded.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileLayout profileData={profileData} />;
}