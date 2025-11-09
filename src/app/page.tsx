"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { foodItems } from "@/data/foodItems";
import { Input } from "@/components/ui/input";
import { Search, Utensils, GraduationCap, Award, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Items", icon: "🍽️" },
    { id: "breakfast", label: "Breakfast", icon: "🌅" },
    { id: "lunch", label: "Lunch", icon: "🍱" },
    { id: "dinner", label: "Dinner", icon: "🌙" },
    { id: "drinks", label: "Drinks", icon: "🥤" },
    { id: "ice-cream", label: "Ice Cream", icon: "🍦" },
    { id: "sweets", label: "Sweets", icon: "🍬" },
    { id: "cakes", label: "Cakes", icon: "🎂" },
    { id: "fast-food", label: "Fast Food", icon: "🍔" },
    { id: "snacks", label: "Snacks", icon: "🍿" },
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group items by category
  const groupedItems = categories.reduce((acc, cat) => {
    if (cat.id !== "all") {
      acc[cat.id] = filteredItems.filter((item) => item.category === cat.id);
    }
    return acc;
  }, {} as Record<string, typeof foodItems>);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Utensils className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MEC Digital Canteen
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Order delicious food instantly from Madras Engineering College
            canteen. Breakfast, Lunch, Dinner, Drinks, Ice Cream & More!
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for Biryani, Dosa, Tea, Ice Cream, Cakes..."
              className="pl-10 bg-white dark:bg-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "secondary" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={
                  selectedCategory === cat.id
                    ? ""
                    : "bg-white/20 hover:bg-white/30"
                }
                size="sm"
              >
                {cat.icon} {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <main className="container mx-auto px-4 py-12 flex-1">
        {selectedCategory === "all" ? (
          <>
            {/* Display all categories */}
            {categories.slice(1).map((cat) => {
              const items = groupedItems[cat.id];
              if (!items || items.length === 0) return null;
              
              return (
                <section key={cat.id} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.label}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                      <FoodCard key={item.id} {...item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        ) : (
          <>
            {/* Display selected category */}
            {filteredItems.length > 0 ? (
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <span>{categories.find(c => c.id === selectedCategory)?.icon}</span>
                  {categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <FoodCard key={item.id} {...item} />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* MEC Theme Section */}
        <section className="mt-16 mb-12 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg p-8 border-2 border-orange-200 dark:border-orange-800">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-16 w-16 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">About Madras Engineering College</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One of India's oldest and most prestigious engineering institutions, established in 1794
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Award className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">230+ Years</h3>
                <p className="text-sm text-muted-foreground">
                  Legacy of excellence in engineering education since 1794
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Users className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">5,000+ Students</h3>
                <p className="text-sm text-muted-foreground">
                  Bright minds pursuing various engineering disciplines
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Utensils className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Canteen</h3>
                <p className="text-sm text-muted-foreground">
                  Digital ordering system for hassle-free food experience
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              "Fueling the minds that shape tomorrow's innovations"
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}