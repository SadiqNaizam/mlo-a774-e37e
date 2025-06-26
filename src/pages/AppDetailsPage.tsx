import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageGallery from '@/components/ImageGallery';
import ReviewList from '@/components/ReviewList';
import RatingInput from '@/components/RatingInput';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { Download, CheckCircle, Info, Star, HardDrive, Cpu, MemoryStick } from 'lucide-react';

// Mock Data for the page
const appDetails = {
  id: 'photo-editor-pro',
  name: 'Photo Editor Pro',
  publisher: 'Creative Software Inc.',
  iconUrl: 'https://placehold.co/128x128/1a1a1a/ffffff?text=P',
  category: 'Photo & Video',
  price: 'Free',
  rating: 4.3,
  reviewCount: 1258,
  description: "Photo Editor Pro is a powerful and easy-to-use photo editing application. Whether you're a beginner or a professional, our wide range of tools, filters, and effects will help you enhance your photos and bring your creative vision to life. Adjust brightness, contrast, saturation, and more with just a few taps. Create stunning collages and share your masterpieces with the world.",
  features: [
    'Advanced color correction tools',
    'A vast library of filters and effects',
    'Intuitive and user-friendly interface',
    'Support for RAW photo formats',
    'Collage maker with various templates',
    'One-click sharing to social media',
  ],
  version: '2.5.1',
  releaseDate: '2024-03-15',
};

const systemRequirements = {
    os: 'Windows 11, Windows 10 version 18362.0 or higher',
    processor: 'Intel Core i3 or equivalent AMD processor',
    memory: '4 GB RAM',
    storage: '2 GB available space',
};

const ratingDistribution = [
  { stars: 5, percentage: 58 },
  { stars: 4, percentage: 25 },
  { stars: 3, percentage: 10 },
  { stars: 2, percentage: 4 },
  { stars: 1, percentage: 3 },
];

const AppDetailsPage = () => {
  console.log('AppDetailsPage loaded');
  const [newRating, setNewRating] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Gallery & Tabs */}
          <div className="lg:col-span-2">
            <ImageGallery media={[]}/> {/* Using default placeholder media from the component */}
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="requirements">System Requirements</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{appDetails.description}</p>
                    <h4 className="font-semibold text-lg">Key Features</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {appDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ratings & Reviews</CardTitle>
                    <CardDescription>See what other users are saying about this app.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <h2 className="text-5xl font-bold">{appDetails.rating.toFixed(1)}</h2>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.round(appDetails.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                      </div>
                      <p className="text-muted-foreground text-sm">{appDetails.reviewCount.toLocaleString()} ratings</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      {ratingDistribution.map(item => (
                        <div key={item.stars} className="flex items-center gap-2">
                           <span className="text-xs font-medium w-12">{item.stars} star{item.stars > 1 && 's'}</span>
                           <Progress value={item.percentage} className="w-full h-2" />
                           <span className="text-xs text-muted-foreground w-8 text-right">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Write a review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium mb-2">Your rating</p>
                            <RatingInput value={newRating} onChange={setNewRating} />
                        </div>
                        <Textarea placeholder="Tell us about your experience..." rows={4} />
                        <Button>Submit Review</Button>
                    </CardContent>
                </Card>
                
                <ReviewList appId={appDetails.id} />
              </TabsContent>
              
              {/* System Requirements Tab */}
              <TabsContent value="requirements" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>System Requirements</CardTitle>
                        <CardDescription>Make sure your device meets these requirements to run the app.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start">
                            <Cpu className="h-5 w-5 mr-3 mt-1 text-muted-foreground" />
                            <div>
                                <h4 className="font-semibold">Operating System</h4>
                                <p className="text-muted-foreground text-sm">{systemRequirements.os}</p>
                            </div>
                        </div>
                        <Separator />
                         <div className="flex items-start">
                            <MemoryStick className="h-5 w-5 mr-3 mt-1 text-muted-foreground" />
                            <div>
                                <h4 className="font-semibold">Memory</h4>
                                <p className="text-muted-foreground text-sm">{systemRequirements.memory}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-start">
                            <HardDrive className="h-5 w-5 mr-3 mt-1 text-muted-foreground" />
                            <div>
                                <h4 className="font-semibold">Storage</h4>
                                <p className="text-muted-foreground text-sm">{systemRequirements.storage}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column: App Info & CTA */}
          <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20 rounded-lg">
                            <AvatarImage src={appDetails.iconUrl} alt={appDetails.name} />
                            <AvatarFallback>{appDetails.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{appDetails.name}</CardTitle>
                            <Link to={`/app-listing?publisher=${appDetails.publisher}`} className="text-sm text-primary hover:underline">
                                {appDetails.publisher}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{appDetails.category}</Badge>
                        <Badge variant="default">{appDetails.price}</Badge>
                        <Badge variant="outline">Offers in-app purchases</Badge>
                    </div>

                    <Button size="lg" className="w-full text-lg h-12">
                        <Download className="mr-2 h-5 w-5" /> Get
                    </Button>

                    <Separator />
                    
                    <h4 className="font-semibold">Additional Information</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex justify-between"><span>Version</span> <span>{appDetails.version}</span></div>
                        <div className="flex justify-between"><span>Release Date</span> <span>{appDetails.releaseDate}</span></div>
                        <div className="flex justify-between"><span>Category</span> <span>
                            <Link to={`/app-listing?category=${appDetails.category}`} className="text-primary hover:underline">{appDetails.category}</Link>
                        </span></div>
                    </div>

                </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppDetailsPage;