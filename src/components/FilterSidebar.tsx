import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 'productivity', label: 'Productivity' },
  { id: 'photo-video', label: 'Photo & Video' },
  { id: 'utilities', label: 'Utilities' },
  { id: 'social', label: 'Social' },
  { id: 'games', label: 'Games' },
];

const FilterSidebar: React.FC = () => {
  const [priceRange, setPriceRange] = useState([50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFree, setIsFree] = useState(false);

  console.log('FilterSidebar loaded');

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setPriceRange([50]);
    setSelectedCategories([]);
    setSelectedRating('all');
    setSortBy('relevance');
    setIsFree(false);
    console.log("Filters cleared");
  };

  return (
    <Card className="h-fit sticky top-24">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort By Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-md">Sort by</h3>
          <RadioGroup value={sortBy} onValueChange={setSortBy}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="relevance" id="relevance" />
              <Label htmlFor="relevance">Relevance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular">Most Popular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="rating" />
              <Label htmlFor="rating">Highest Rated</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Category Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-md">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label htmlFor={category.id} className="font-normal">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-md">Price</h3>
          <div className="flex items-center space-x-2">
            <Checkbox id="free" checked={isFree} onCheckedChange={(checked) => setIsFree(!!checked)} />
            <Label htmlFor="free">Free</Label>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            disabled={isFree}
          />
          <div className="text-center text-sm text-muted-foreground">
            {isFree ? 'Free apps only' : `Up to $${priceRange[0]}`}
          </div>
        </div>

        <Separator />
        
        {/* Rating Section */}
        <div className="space-y-4">
            <h3 className="font-semibold text-md">Rating</h3>
            <RadioGroup defaultValue="all" value={selectedRating} onValueChange={setSelectedRating}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r-all" />
                    <Label htmlFor="r-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r-4" />
                    <Label htmlFor="r-4">4 stars & up</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r-3" />
                    <Label htmlFor="r-3">3 stars & up</Label>
                </div>
            </RadioGroup>
        </div>

        <Separator />
        
        <Button onClick={clearFilters} variant="ghost" className="w-full">
          Clear all filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;