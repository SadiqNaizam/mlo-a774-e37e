import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Star, AlertCircle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
}

interface ReviewListProps {
  appId: string;
}

// Mock data to simulate API response
const DUMMY_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Jane Doe',
    avatarUrl: 'https://github.com/shadcn.png',
    rating: 5,
    text: "This is the best app I've ever used! It's incredibly intuitive and has all the features I need. Highly recommended to everyone.",
    date: '2024-05-15',
  },
  {
    id: '2',
    author: 'John Smith',
    avatarUrl: '', // To test fallback
    rating: 4,
    text: "Great app, works well for the most part. There are a few minor bugs here and there, but nothing that breaks the experience. The UI is clean.",
    date: '2024-05-12',
  },
  {
    id: '3',
    author: 'Alice Johnson',
    avatarUrl: 'https://github.com/vercel.png',
    rating: 3,
    text: "It's an okay app. It gets the job done but lacks some advanced features that competitors have. The performance could also be better on older devices.",
    date: '2024-05-10',
  },
  {
    id: '4',
    author: 'Mike Brown',
    avatarUrl: 'https://github.com/radix-ui.png',
    rating: 1,
    text: "I was very disappointed. The app crashed multiple times and I lost my work. I can't recommend this in its current state. Needs major improvements.",
    date: '2024-05-09',
  },
];

// A small helper to get initials from a name for the Avatar fallback
const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 0) return 'U';
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
}


const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};


const ReviewSkeleton = () => (
    <div className="flex items-start space-x-4 py-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
            <div className='flex justify-between items-center'>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full" />
        </div>
    </div>
);


const ReviewList: React.FC<ReviewListProps> = ({ appId }) => {
  console.log(`ReviewList loaded for appId: ${appId}`);

  const { data, error, isLoading } = useQuery({
    queryKey: ['reviews', appId],
    queryFn: async (): Promise<Review[]> => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you would fetch from an API:
      // const response = await fetch(`/api/apps/${appId}/reviews`);
      // return response.json();
      if (appId === 'error-case') {
          throw new Error("Failed to fetch reviews for this app.");
      }
      return DUMMY_REVIEWS;
    },
  });

  if (isLoading) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <ReviewSkeleton />
            <ReviewSkeleton />
            <ReviewSkeleton />
        </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "Could not load reviews. Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Reviews ({data?.length || 0})</h3>
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((review) => (
            <div key={review.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
              <Avatar className='h-12 w-12'>
                <AvatarImage src={review.avatarUrl} alt={`${review.author}'s avatar`} />
                <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-sm">{review.author}</p>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-2 text-sm text-gray-700">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  );
};

export default ReviewList;