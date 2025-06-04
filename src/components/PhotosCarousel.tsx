import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
    {
        url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
        caption: "O primeiro encontro"
    },
    {
        url: "https://images.pexels.com/photos/1439261/pexels-photo-1439261.jpeg",
        caption: "Viagem inesquecível"
    },
    {
        url: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg",
        caption: "Momentos especiais"
    },
    {
        url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
        caption: "Nossa primeira casa"
    },
    {
        url: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
        caption: "O pedido de casamento"
    }
];

const PhotoCarousel: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative max-w-3xl mx-auto mb-16">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="relative flex-[0_0_100%] min-w-0"
                        >
                            <div className="relative pt-[56.25%]">
                                <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
                                    <p className="text-white text-lg font-light">{photo.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
            >
                <ChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-4">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex
                            ? 'bg-rose-500 w-6'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoCarousel;