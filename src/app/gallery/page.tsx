import { Metadata } from 'next';
import { AssetGallery } from "@/components/landing/assets-gallery";
import { LandingDock } from "@/components/layout/landing-dock";


export default async function GalleryPage() {
  return (
    <main className="min-h-screen gradient-bg">
      <LandingDock alwaysVisible={true} />
      <AssetGallery />
    </main>
  );
}