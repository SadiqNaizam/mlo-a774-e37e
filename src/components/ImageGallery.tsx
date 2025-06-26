import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { PlayCircle } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
}

interface ImageGalleryProps {
  media: MediaItem[];
}

const placeholderMedia: MediaItem[] = [
    { type: 'image', src: 'https://placehold.co/1280x720/1a1a1a/ffffff?text=Screenshot+1', thumbnail: 'https://placehold.co/160x90/1a1a1a/ffffff?text=Thumb+1', alt: 'App Screenshot 1' },
    { type: 'image', src: 'https://placehold.co/1280x720/2b2b2b/ffffff?text=Screenshot+2', thumbnail: 'https://placehold.co/160x90/2b2b2b/ffffff?text=Thumb+2', alt: 'App Screenshot 2' },
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/160x90/3c3c3c/ffffff?text=Video', alt: 'App Trailer' },
    { type: 'image', src: 'https://placehold.co/1280x720/4d4d4d/ffffff?text=Screenshot+3', thumbnail: 'https://placehold.co/160x90/4d4d4d/ffffff?text=Thumb+3', alt: 'App Screenshot 3' },
    { type: 'image', src: 'https://placehold.co/1280x720/5e5e5e/ffffff?text=Screenshot+4', thumbnail: 'https://placehold.co/160x90/5e5e5e/ffffff?text=Thumb+4', alt: 'App Screenshot 4' },
];

const ImageGallery: React.FC<ImageGalleryProps> = ({ media = placeholderMedia }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log('ImageGallery loaded');

  if (!media || media.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No media available.</div>;
  }

  const selectedMedia = media[selectedIndex];

  return (
    <div className="w-full space-y-4">
      <Card className="overflow-hidden">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {selectedMedia.type === 'image' ? (
            <img
              src={selectedMedia.src}
              alt={selectedMedia.alt}
              className="object-contain w-full h-full"
            />
          ) : (
            <iframe
              src={selectedMedia.src}
              title={selectedMedia.alt}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
        </AspectRatio>
      </Card>

      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative shrink-0 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'transition-all duration-200',
                selectedIndex === index ? 'ring-2 ring-primary' : 'ring-1 ring-transparent hover:ring-primary/50'
              )}
            >
              <AspectRatio ratio={16 / 9} className="h-20">
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className={cn(
                    'object-cover h-full w-full rounded-md transition-opacity',
                    selectedIndex !== index && 'opacity-60 hover:opacity-100'
                  )}
                />
              </AspectRatio>
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                  <PlayCircle className="h-8 w-8 text-white/80" />
                </div>
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ImageGallery;