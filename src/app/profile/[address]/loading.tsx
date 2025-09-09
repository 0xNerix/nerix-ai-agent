import { Skeleton } from '@/components/ui/skeleton';
import { HeaderAuth } from '@/components/layout/header-auth';
import { ProfileBackground } from '@/components/profile/profile-background';

export default function ProfileLoading() {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-accent/15 via-teal-500/10 to-cyan-500/10">
      {/* Background Effects */}
      <ProfileBackground />
      
      {/* Header Auth */}
      <HeaderAuth />

      {/* Back Button Skeleton */}
      <div className="fixed top-6 left-6 z-50">
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      <div className="flex min-h-screen pt-20 max-w-full">
        {/* Left Sidebar Skeleton */}
        <div className="w-96 flex-shrink-0 p-6">
          <div className="sticky top-6 space-y-6">
            {/* Profile Header Skeleton */}
            <div className="bg-background/40 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 shadow-lg shadow-orange-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 rounded-2xl" />
              <div className="relative space-y-4">
                {/* Avatar and Name */}
                <div className="text-center space-y-4">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto" />
                </div>
                
                {/* Wallet Info */}
                <div className="space-y-3">
                  <div className="p-3 bg-background/30 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  
                  {/* Collapsible Wallet Skeleton */}
                  <div className="p-3 bg-background/30 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center p-2">
                    <div className="flex items-center justify-center mb-1">
                      <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-5 w-8 mx-auto mb-1" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Menu Skeleton */}
            <nav className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-background/40"
                >
                  <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1 space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content Area Skeleton */}
        <div className="flex-1 min-w-0 p-6">
          <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-h-full w-full">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              {/* Content Items */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-background/30 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="space-y-3">
                    {/* Item Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-20 rounded" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-16 rounded" />
                    </div>

                    {/* User Message */}
                    <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-12 w-full" />
                    </div>

                    {/* AI Response */}
                    <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-6" />
                        </div>
                        <Skeleton className="h-4 w-12 rounded" />
                      </div>
                      <Skeleton className="h-10 w-full mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}