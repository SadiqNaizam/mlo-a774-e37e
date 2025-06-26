import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import FilterSidebar from '@/components/FilterSidebar';
import AppCard from '@/components/AppCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// Icons
import { Filter } from 'lucide-react';

// Placeholder data for the app grid
const placeholderApps = [
  { slug: 'power-edit-pro', iconUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=120&fit=crop&q=60', title: 'Power Edit Pro', developer: 'Creative Minds Inc.', rating: 4.8, reviewCount: 12500 },
  { slug: 'pixel-perfect', iconUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=120&h=120&fit=crop&q=60', title: 'Pixel Perfect', developer: 'PhotoFun Studios', rating: 4.5, reviewCount: 8900 },
  { slug: 'utility-master', iconUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=120&h=120&fit=crop&q=60', title: 'Utility Master', developer: 'System Tools Co.', rating: 4.7, reviewCount: 23000 },
  { slug: 'social-sphere', iconUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=120&fit=crop&q=60', title: 'Social Sphere', developer: 'Connect-U', rating: 4.2, reviewCount: 54000 },
  { slug: 'game-quest-iv', iconUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=120&h=120&fit=crop&q=60', title: 'Game Quest IV', developer: 'Epic Adventures', rating: 4.9, reviewCount: 150000 },
  { slug: 'quick-notes', iconUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=120&fit=crop&q=60', title: 'Quick Notes', developer: 'Prod-Active', rating: 4.3, reviewCount: 7600 },
  { slug: 'design-canvas', iconUrl: 'https://images.unsplash.com/photo-1579548122214-78d18b0a1a8e?w=120&h=120&fit=crop&q=60', title: 'Design Canvas', developer: 'Artisan Software', rating: 4.6, reviewCount: 9800 },
  { slug: 'code-compiler', iconUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=120&h=120&fit=crop&q=60', title: 'Code Compiler', developer: 'DevTools Pro', rating: 4.8, reviewCount: 19500 },
  { slug: 'video-streamer-plus', iconUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&h=120&fit=crop&q=60', title: 'Video Streamer Plus', developer: 'MediaMagic', rating: 4.0, reviewCount: 3200 },
];

const AppListingPage = () => {
    console.log('AppListingPage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container py-8">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                    {/* --- Filter Sidebar (Desktop) --- */}
                    <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5">
                        <FilterSidebar />
                    </aside>

                    {/* --- Main Content --- */}
                    <div className="flex-1">
                        {/* --- Header Section with Sort & Mobile Filter --- */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Photo & Video
                            </h1>
                            <div className="flex items-center gap-4">
                               <Select defaultValue="relevance">
                                    <SelectTrigger className="w-[180px] hidden sm:flex">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                                        <SelectItem value="popular">Sort by: Most Popular</SelectItem>
                                        <SelectItem value="rating">Sort by: Highest Rated</SelectItem>
                                        <SelectItem value="newest">Sort by: Newest</SelectItem>
                                    </SelectContent>
                                </Select>
                                {/* --- Mobile Filter Trigger --- */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="icon" className="lg:hidden">
                                            <Filter className="h-4 w-4" />
                                            <span className="sr-only">Open filters</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-full sm:w-80 overflow-y-auto">
                                        <FilterSidebar />
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* --- App Grid --- */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
                            {placeholderApps.map((app) => (
                                <AppCard
                                    key={app.slug}
                                    slug={app.slug}
                                    iconUrl={app.iconUrl}
                                    title={app.title}
                                    developer={app.developer}
                                    rating={app.rating}
                                    reviewCount={app.reviewCount}
                                />
                            ))}
                        </section>

                        {/* --- Pagination --- */}
                        <section className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AppListingPage;