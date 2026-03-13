import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
    { url: 'https://i.postimg.cc/nVYZcBCh/imagem-2025-06-06-113246405.png' },
    { url: 'https://i.postimg.cc/cC1zJKbv/15-E558-CC-EECD-41-D2-8034-041-DA5-A6-D362.png' },
    { url: 'https://i.postimg.cc/rmNbcGQ6/6-EC86-FF5-0-E73-4081-9-C84-96230-F17338-C.png' },
    { url: 'https://i.postimg.cc/nhMtkWTX/BCD4443-D-467-A-4-B9-E-817-D-684232-FBA78-E.png' },
];

const PhotoCarousel: React.FC = () => {
    // Adicionado 'align: center' para melhor visualização
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 40, // Transição mais suave e lenta
        align: 'center',
    });
    
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

    // Autoplay refinado (pausa ao interagir)
    React.useEffect(() => {
        if (!emblaApi) return;

        const autoplay = setInterval(() => {
            if (emblaApi.internalEngine().dragHandler.pointerDown()) return; // Não rola se estiver arrastando
            emblaApi.scrollNext();
        }, 5000); // Mais tempo para apreciar a foto

        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <section className="w-full bg-[#FAF8F5] py-20 overflow-hidden">
            
            {/* Título de Seção Elegante */}
            <div className="text-center mb-16 px-4">
                <h2 className="text-xs md:text-sm font-['Montserrat'] text-gray-400 tracking-[0.4em] uppercase font-semibold mb-4">
                    Momentos
                </h2>
                <p className="text-3xl md:text-4xl font-['Cinzel'] text-gray-800">
                    Nossa Galeria
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 group">
                
                {/* O Carrossel (Embla) */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex touch-pan-y items-center">
                        {photos.map((photo, index) => (
                            // Aspect-ratio focado em retrato (mais elegante para casamentos)
                            <div 
                                key={index} 
                                className="relative flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_50%] min-w-0 mx-2 md:mx-4 transition-all duration-700 ease-in-out"
                                style={{
                                    // Truque para as fotos laterais ficarem levemente opacas e menores
                                    opacity: index === selectedIndex ? 1 : 0.4,
                                    transform: index === selectedIndex ? 'scale(1)' : 'scale(0.9)'
                                }}
                            >
                                <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.12)] bg-gray-100">
                                    <img
                                        src={photo.url}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controles Minimalistas Flutuantes (Setas) */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md text-gray-800 rounded-full shadow-lg border border-gray-100 transition-all duration-300 hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
                    aria-label="Foto anterior"
                >
                    <ChevronLeft size={20} strokeWidth={1.5} className="-ml-1" />
                </button>

                <button
                    onClick={scrollNext}
                    className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md text-gray-800 rounded-full shadow-lg border border-gray-100 transition-all duration-300 hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
                    aria-label="Próxima foto"
                >
                    <ChevronRight size={20} strokeWidth={1.5} className="-mr-1" />
                </button>
            </div>

            {/* Navegação por Pontos (Dots) Refinada */}
            <div className="flex justify-center items-center gap-4 mt-12">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className="relative flex items-center justify-center w-6 h-6 group"
                        aria-label={`Ir para foto ${index + 1}`}
                    >
                        <span 
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                index === selectedIndex 
                                    ? 'bg-[#9A7B6F] scale-125' 
                                    : 'bg-gray-300 group-hover:bg-gray-400'
                            }`}
                        />
                        {/* Anel de foco sutil em volta do ponto ativo */}
                        {index === selectedIndex && (
                            <span className="absolute inset-0 rounded-full border border-[#9A7B6F] animate-ping opacity-20" />
                        )}
                    </button>
                ))}
            </div>
            
        </section>
    );
};

export default PhotoCarousel;