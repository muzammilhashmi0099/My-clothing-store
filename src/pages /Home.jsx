import React from 'react';
import GalleryLook from '@/pages/GalleryLook';
import ShopTheLook from '@/components/home/ShopTheLook';
import NewArrivals from '@/components/home/NewArrivals';
import StyleInspiration from '@/components/home/StyleInspiration';
import TopRated from '@/components/home/TopRated';
import BrandValues from '@/components/home/BrandValues';

export default function Home() {
  return (
    <div>
      <GalleryLook />
      <NewArrivals />
      <ShopTheLook />
      <StyleInspiration />
      <TopRated />
      <BrandValues />
    </div>
  );
}
