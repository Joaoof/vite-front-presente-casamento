import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react';

const photos = [
    {
        url: 'https://i.postimg.cc/nVYZcBCh/imagem-2025-06-06-113246405.png',
    },
    {
        url: 'https://i.postimg.cc/cC1zJKbv/15-E558-CC-EECD-41-D2-8034-041-DA5-A6-D362.png',
    },
    {
        url: 'https://i.postimg.cc/rmNbcGQ6/6-EC86-FF5-0-E73-4081-9-C84-96230-F17338-C.png',
    },
    {
        url: 'https://i.postimg.cc/nhMtkWTX/BCD4443-D-467-A-4-B9-E-817-D-684232-FBA78-E.png',
    },
    {
        url: 'https://i.postimg.cc/nVYZcBCh/imagem-2025-06-06-113246405.png',
    },
];

const PhotoCarousel: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 30,
        dragFree: true,
    });
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isHovered, setIsHovered] = React.useState(false);

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

    // Auto-play functionality
    React.useEffect(() => {
        if (!emblaApi || !isPlaying) return;

        const autoplay = setInterval(() => {
            if (!isHovered) {
                emblaApi.scrollNext();
            }
        }, 4000);

        return () => clearInterval(autoplay);
    }, [emblaApi, isPlaying, isHovered]);

    const toggleAutoplay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative max-w-4xl mx-auto mb-16">
            {/* Main Carousel Container */}
            <div
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated Border */}
                <div className="absolute -inset-1 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                {/* Carousel Wrapper */}
                <div className="relative bg-custom-header rounded-xl overflow-hidden">
                    {/* Carousel Container */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex transition-transform ease-out duration-700">
                            {photos.map((photo, index) => (
                                <div key={index} className="relative flex-[0_0_100%] min-w-0 aspect-[30/20]">
                                    {/* Image with Parallax Effect */}
                                    <div className="relative w-full h-full overflow-hidden">
                                        <img
                                            src={photo.url}
                                            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Animated Particles */}
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400/40 rounded-full animate-ping"></div>
                                            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
                                            <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce"></div>
                                        </div>

                                        {/* Slide Number */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-800 text-sm font-medium border  shadow-lg">
                                            {index + 1} / {photos.length}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} />
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} />
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                    </button>

                    {/* Control Panel */}
                    <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={toggleAutoplay}
                            className="bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 p-2 rounded-full transition-all duration-300 border border-gray-200 shadow-lg"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        <button
                            className="bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 p-2 rounded-full transition-all duration-300 border border-gray-200 shadow-lg"
                            aria-label="Fullscreen"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Progress Indicators */}
            <div className="flex justify-center items-center gap-3 mt-8">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className="relative group/dot transition-all duration-500"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`relative w-3 h-3 rounded-full transition-all duration-500 ${index === selectedIndex
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-125 shadow-lg shadow-purple-500/50'
                            : 'bg-gray-400 hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:scale-110'
                            }`}>
                            {index === selectedIndex && (
                                <>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-ping opacity-75"></div>
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 animate-pulse"></div>
                                </>
                            )}
                        </div>

                        {/* Progress Bar for Active Slide */}
                        {index === selectedIndex && isPlaying && (
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-300 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-progress-bar origin-left"></div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Thumbnail Preview */}
            {/* Thumbnail Preview */}
            <div className="mt-6 flex justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                {photos.map((photo, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all duration-300 border-2 ${index === selectedIndex
                            ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/30'
                            : 'border-transparent hover:border-gray-300 hover:scale-105'
                            }`}
                    >
                        <img
                            src={photo.url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PhotoCarousel;