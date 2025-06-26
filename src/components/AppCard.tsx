import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface AppCardProps {
  /** A unique slug for the application, used for navigation. */
  slug: string;
  /** URL for the application's icon. */
  iconUrl: string;
  /** The name of the application. */
  title: string;
  /** The name of the developer or publisher. */
  developer: string;
  /** The aggregate star rating, e.g., 4.5. */
  rating: number;
  /** The total number of reviews. */
  reviewCount?: number;
}

const AppCard: React.FC<AppCardProps> = ({
  slug,
  iconUrl,
  title,
  developer,
  rating,
  reviewCount,
}) => {
  console.log(`AppCard loaded for: ${title}`);

  // The route to the App Details page is '/app-details'.
  // We'll append the slug to create a unique URL for each app.
  // This assumes the routing will be updated to handle a dynamic segment, e.g., /app-details/:slug
  const appDetailsPath = `/app-details/${slug}`;

  return (
    <Link to={appDetailsPath} className="group block h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="h-full w-full p-4 flex items-start gap-4 transition-all duration-200 hover:bg-accent hover:shadow-md">
        <img
          src={iconUrl || 'https://via.placeholder.com/80'}
          alt={`${title} icon`}
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover flex-shrink-0 shadow"
        />
        <div className="flex flex-col justify-center min-w-0">
          <h3 className="font-semibold text-base leading-tight truncate group-hover:underline">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {developer}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-sm font-bold">{rating.toFixed(1)}</span>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
            {reviewCount !== undefined && (
              <span className="text-xs text-muted-foreground">
                ({reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AppCard;