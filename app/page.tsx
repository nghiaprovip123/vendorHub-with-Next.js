import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import HomeCateogry from "@/app/(home)/home-category"

import ImageCard from '@/app/(home)/home-category'
import HeroSection from "@/app/(home)/home-heroSection"
import ProductCard from "@/app/(home)/home-product"
const X = () =>
{
    return (
        <div>
            <HeroSection />
            <ImageCard />
            <ProductCard />
        </div>

    )
}

export default X;