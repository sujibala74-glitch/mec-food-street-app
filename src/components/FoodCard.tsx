"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description?: string;
  isVeg: boolean;
}

export default function FoodCard({
  id,
  name,
  price,
  image,
  rating,
  category,
  description,
  isVeg,
}: FoodCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({ id, name, price, image, category });
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant={isVeg ? "default" : "destructive"}
            className={isVeg ? "bg-green-500" : ""}
          >
            {isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 bg-white dark:bg-black rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-primary">₹{price}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="gap-1"
            disabled={isAdding}
          >
            <Plus className="h-4 w-4" />
            {isAdding ? "Added!" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
