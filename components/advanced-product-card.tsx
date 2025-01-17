"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/delete-button";
import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AdvancedProductImage, ProductVariant } from "@prisma/client";

interface ProductVariantWithImages extends ProductVariant {
    images: AdvancedProductImage[]
}

interface AdvancedProductCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
    variants: ProductVariantWithImages[];
}

export default function AdvancedProductCard({
    id,
    name,
    description,
    category,
    variants,
}: AdvancedProductCardProps) {

    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    const selectedVariant = variants[selectedVariantIndex];

    return (
        <Card className="border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full h-60 relative"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {selectedVariant?.images?.length > 0 ? (
                            selectedVariant.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <Image
                                        src={image.url}
                                        alt={`${name} - ${selectedVariant.name}`}
                                        width={400}
                                        height={400}
                                        className="w-full h-60 object-cover rounded-t-lg"
                                    />
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem>
                                <Image
                                    src="/placeholder-image.png"
                                    alt="example"
                                    width={400}
                                    height={400}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                        <CarouselPrevious className="p-2 text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white">
                            <ChevronLeft className="w-6 h-6" />
                        </CarouselPrevious>
                    </div>
                    <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <CarouselNext className="p-2 text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white">
                            <ChevronRight className="w-6 h-6" />
                        </CarouselNext>
                    </div>
                </Carousel>

                <Badge className="w-1/2 flex justify-center">{category}</Badge>
                <CardTitle className="text-xl font-semibold mt-2">{name}</CardTitle>
                <CardDescription className="text-gray-600">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-bold text-lg">Variante: {selectedVariant?.name}</p>
                <p className="font-bold text-lg">Precio: ${selectedVariant?.price}</p>
                <p className="font-bold text-lg">Stock: {selectedVariant?.stock}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {variants.map((variant, index) => (
                        <Button
                            key={variant.id}
                            variant={selectedVariantIndex === index ? "default" : "outline"}
                            onClick={() => setSelectedVariantIndex(index)}
                        >
                            {variant.name}
                        </Button>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex space-x-4 justify-between">
                    <Link href={`/advanced-products/${id}`}>
                        <Button className="w-full py-2 rounded-md">Editar</Button>
                    </Link>
                    <DeleteButton url={`/api/advanced-products/${id}`} />
                </div>
            </CardFooter>
        </Card>
    );
}
