import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppCard from '@/components/AppCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronRight } from 'lucide-react';

// Placeholder data for App Cards
const featuredApps = [
  { slug: 'photo-pro-x', iconUrl: 'https://placehold.co/128x128/a5b4fc/ffffff?text=P', title: 'Photo Pro X', developer: 'Creative Minds Inc.', rating: 4.8, reviewCount: 12500 },
  { slug: 'task-master', iconUrl: 'https://placehold.co/128x128/93c5fd/ffffff?text=T', title: 'TaskMaster', developer: 'Productivity Tools', rating: 4.6, reviewCount: 8900 },
  { slug: 'finance-flow', iconUrl: 'https://placehold.co/128x128/6ee7b7/ffffff?text=F', title: 'FinanceFlow', developer: 'MoneyWise', rating: 4.9, reviewCount: 21300 },
  { slug: 'sound-sculpt', iconUrl: 'https://placehold.co/128x128/fca5a5/ffffff?text=S', title: 'SoundSculpt', developer: 'AudioWorks', rating: 4.7, reviewCount: 9500 },
  { slug: 'code-canvas', iconUrl: 'https://placehold.co/128x128/fdba74/ffffff?text=C', title: 'CodeCanvas', developer: 'DevSolutions', rating: 4.8, reviewCount: 15400 },
  { slug: 'health-hub', iconUrl: 'https://placehold.co/128x128/86efac/ffffff?text=H', title: 'HealthHub+', developer: 'Wellness Tech', rating: 4.5, reviewCount: 11200 },
];

const topFreeApps = [
  { slug: 'quick-notes', iconUrl: 'https://placehold.co/128x128/f9a8d4/ffffff?text=Q', title: 'QuickNotes', developer: 'Simple Apps Co.', rating: 4.5, reviewCount: 32000 },
  { slug: 'weather-now', iconUrl: 'https://placehold.co/128x128/fcd34d/ffffff?text=W', title: 'Weather Now', developer: 'Forecast Systems', rating: 4.7, reviewCount: 56000 },
  { slug: 'media-player-lite', iconUrl: 'https://placehold.co/128x128/a78bfa/ffffff?text=M', title: 'MediaPlayer Lite', developer: 'AVClub', rating: 4.4, reviewCount: 45000 },
  { slug: 'simple-scan', iconUrl: 'https://placehold.co/128x128/7dd3fc/ffffff?text=S', title: 'Simple Scan', developer: 'Utility First', rating: 4.6, reviewCount: 28000 },
  { slug: 'unit-converter', iconUrl: 'https://placehold.co/128x128/fde047/ffffff?text=U', title: 'Unit Converter', developer: 'Math Geeks', rating: 4.9, reviewCount: 75000 },
  { slug: 'daily-planner', iconUrl: 'https://placehold.co/128x128/a5f3fc/ffffff?text=D', title: 'Daily Planner', developer: 'OrgLife', rating: 4.6, reviewCount: 19000 },
];

const topGames = [
  { slug: 'galaxy-raiders', iconUrl: 'https://placehold.co/128x128/f87171/ffffff?text=G', title: 'Galaxy Raiders', developer: 'PixelStorm Games', rating: 4.9, reviewCount: 150000 },
  { slug: 'puzzle-quest', iconUrl: 'https://placehold.co/128x128/c084fc/ffffff?text=P', title: 'Puzzle Quest Saga', developer: 'Mindful Play', rating: 4.6, reviewCount: 95000 },
  { slug: 'speed-racers-3', iconUrl: 'https://placehold.co/128x128/4ade80/ffffff?text=S', title: 'Speed Racers 3', developer: 'Adrenaline Studios', rating: 4.7, reviewCount: 120000 },
  { slug: 'castle-defenders', iconUrl: 'https://placehold.co/128x128/fbbf24/ffffff?text=C', title: 'Castle Defenders', developer: 'Strategy Kings', rating: 4.5, reviewCount: 88000 },
  { slug: 'match-mania', iconUrl: 'https://placehold.co/128x128/f472b6/ffffff?text=M', title: 'Match Mania', developer: 'Casual Fun', rating: 4.8, reviewCount: 210000 },
  { slug: 'arena-of-heroes', iconUrl: 'https://placehold.co/128x128/ef4444/ffffff?text=A', title: 'Arena of Heroes', developer: 'Epic Games Co.', rating: 4.7, reviewCount: 350000 },
];

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Discover Your Next Favorite App
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Browse thousands of apps and games for every need and passion, curated for you.
          </p>
          <Button asChild size="lg">
            <Link to="/app-listing">Explore All Apps</Link>
          </Button>
        </section>

        {/* App Sections */}
        <div className="space-y-12 pb-16">
          {/* Featured Apps Section */}
          <section className="container">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight">Featured Apps</h2>
              <Button variant="link" asChild className="text-primary">
                <Link to="/app-listing?filter=featured">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <Carousel opts={{ align: 'start' }} className="w-full">
              <CarouselContent>
                {featuredApps.map((app) => (
                  <CarouselItem key={app.slug} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div className="p-1 h-full">
                        <AppCard {...app} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </section>

          {/* Top Free Apps Section */}
          <section className="container">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight">Top Free Apps</h2>
              <Button variant="link" asChild className="text-primary">
                <Link to="/app-listing?filter=top-free">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <Carousel opts={{ align: 'start' }} className="w-full">
              <CarouselContent>
                {topFreeApps.map((app) => (
                  <CarouselItem key={app.slug} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                     <div className="p-1 h-full">
                        <AppCard {...app} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </section>

          {/* Top Games Section */}
          <section className="container">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight">Top Games</h2>
              <Button variant="link" asChild className="text-primary">
                <Link to="/app-listing?category=games">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
             <Carousel opts={{ align: 'start' }} className="w-full">
              <CarouselContent>
                {topGames.map((app) => (
                  <CarouselItem key={app.slug} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                     <div className="p-1 h-full">
                        <AppCard {...app} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;