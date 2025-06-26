import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

// Define the schema for the form using Zod
const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }).max(50, { message: "Display name must not be longer than 50 characters." }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Placeholder data for user reviews
const userReviews = [
  {
    id: 1,
    appName: 'Power Productivity Suite',
    rating: 5,
    reviewText: 'Absolutely changed my workflow. The integration between the calendar and to-do list is seamless!',
    date: '2 weeks ago',
  },
  {
    id: 2,
    appName: 'Pixel Perfect Photo Editor',
    rating: 4,
    reviewText: 'Great set of tools for a free editor. A bit of a learning curve, but powerful once you get the hang of it.',
    date: '1 month ago',
  },
  {
    id: 3,
    appName: 'Cloud Gamer',
    rating: 3,
    reviewText: 'Works well on a good connection, but I experienced some input lag during peak hours. Promising technology.',
    date: '3 months ago',
  },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  // Set up the form using react-hook-form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: 'shadcn',
      email: 'm@example.com',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    console.log('Profile updated:', data);
    // Here you would typically call an API to update the user's profile
    alert('Profile saved successfully!');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-8">User Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your display name and view your account details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <Label htmlFor="picture">Profile Picture</Label>
                          <Input id="picture" type="file" className="mt-2" disabled />
                          <p className="text-xs text-muted-foreground mt-1">File upload is for demonstration only.</p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your display name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} readOnly disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column: Reviews */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reviews</CardTitle>
                  <CardDescription>A list of reviews you have submitted.</CardDescription>
                </CardHeader>
                <CardContent>
                  {userReviews.length > 0 ? (
                    <div className="space-y-6">
                      {userReviews.map((review, index) => (
                        <div key={review.id}>
                          <div className="flex flex-col gap-2">
                             <Link to="/app-details" className="font-semibold hover:underline">
                                {review.appName}
                              </Link>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                ))}
                              </div>
                            <p className="text-sm text-muted-foreground">{review.reviewText}</p>
                          </div>
                          {index < userReviews.length - 1 && <Separator className="mt-6" />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">You haven't submitted any reviews yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;