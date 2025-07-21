import ShopBanner from "@/shopComponent/ShopBanner";
import ShopFeatured from "@/shopComponent/ShopFeatured";
import { ShopHero } from "@/shopComponent/ShopHero";
import ShopProducts from "@/shopComponent/ShopProducts";




export default function Shop() {
  return (
    <>



      <ShopHero />
      <ShopProducts />
      <ShopBanner />
      <ShopFeatured />

    </>
  );
}