import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Heart, Images } from 'lucide-react'
import PhotoGallery from './PhotoGallery'  // ← novo import

const photos = [
  { url: '/img3.JPG',  caption: 'O começo de tudo'    },
  { url: '/img4.JPG',  caption: 'Cada detalhe importa' },
  { url: '/img5.JPG',  caption: 'Momentos eternos'     },
  { url: '/img6.JPG',  caption: 'Nossa história'       },
  { url: '/img7.JPG',  caption: 'Sempre juntos'        },
  { url: '/img8.JPG',  caption: 'Amor verdadeiro'      },
  { url: '/img9.JPG',  caption: 'Para sempre'          },
  { url: '/img10.JPG', caption: 'Eternamente'          },
  { url: '/img11.JPG', caption: 'Eternamente'          },
  { url: '/img12.JPG', caption: 'Eternamente'          },
  { url: '/img13.JPG', caption: 'Eternamente'          },
  { url: '/img14.JPG', caption: 'Eternamente'          },
  { url: '/img15.JPG', caption: 'Eternamente'          },
  { url: '/img16.JPG', caption: 'Eternamente'          },
].filter(p => p.url)

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35, align: 'center' })
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [isHovering, setIsHovering]       = React.useState(false)
  const [showGallery, setShowGallery]     = React.useState(false)  // ← novo estado

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  React.useEffect(() => {
    if (!emblaApi || isHovering) return
    const timer = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => clearInterval(timer)
  }, [emblaApi, isHovering])

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-[#fdf9f6] py-24 dark:bg-slate-900"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Fundo decorativo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-100/40 blur-3xl dark:bg-rose-900/10" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-rose-100/40 blur-3xl dark:bg-rose-900/10" />
        </div>

        {/* Título */}
        <div className="relative mb-14 px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-10 bg-rose-200" />
            <Heart className="h-3.5 w-3.5 fill-rose-300 text-rose-300" />
            <div className="h-[1px] w-10 bg-rose-200" />
          </div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-rose-400">Galeria</p>
          <h2 className="font-serif text-3xl font-bold text-slate-700 dark:text-white md:text-4xl">
            Nossos Momentos
          </h2>
          <div className="mx-auto mt-3 h-[1px] w-14 bg-rose-200" />
        </div>

        {/* Carrossel */}
        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y items-center">
              {photos.map((photo, index) => {
                const isActive = index === selectedIndex
                return (
                  <div
                    key={index}
                    className="relative flex-[0_0_88%] min-w-0 px-2 transition-all duration-700 ease-out sm:flex-[0_0_70%] md:flex-[0_0_55%] lg:flex-[0_0_45%] md:px-4"
                    style={{ opacity: isActive ? 1 : 0.35, transform: isActive ? 'scale(1)' : 'scale(0.88)' }}
                  >
                    <div className={`relative overflow-hidden rounded-2xl transition-shadow duration-700 ${
                      isActive ? 'shadow-[0_30px_80px_rgba(0,0,0,0.18)]' : 'shadow-md'
                    }`}>
                      <div className="aspect-[4/5] md:aspect-[16/10]">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="h-full w-full object-cover transition-transform duration-[2500ms] ease-out hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="font-serif text-base font-medium italic text-white/90 drop-shadow md:text-lg">
                          {photo.caption}
                        </p>
                        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Setas */}
          <button onClick={scrollPrev} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-rose-200 dark:border-slate-700 dark:bg-slate-800/90 dark:text-white sm:left-6 md:h-12 md:w-12">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button onClick={scrollNext} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-rose-200 dark:border-slate-700 dark:bg-slate-800/90 dark:text-white sm:right-6 md:h-12 md:w-12">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Barra de progresso + dots + BOTÃO VER TODAS */}
        <div className="relative mt-10 flex flex-col items-center gap-4 px-4">
          <div className="h-[2px] w-32 overflow-hidden rounded-full bg-rose-100 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-rose-400 transition-all duration-500"
              style={{ width: `${((selectedIndex + 1) / photos.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-3">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Foto ${index + 1}`}
                className="group relative flex h-5 w-5 items-center justify-center"
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'h-2 w-5 bg-rose-400'
                    : 'h-1.5 w-1.5 bg-rose-200 group-hover:bg-rose-300 dark:bg-slate-600'
                }`} />
              </button>
            ))}
          </div>

          {/* ✅ Botão Ver Todas */}
          <button
            onClick={() => setShowGallery(true)}
            className="group mt-2 flex items-center gap-2.5 rounded-full border border-rose-200 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:shadow-rose-100/60 dark:border-slate-700 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-slate-700"
          >
            <Images size={14} strokeWidth={1.5} />
            Ver todas as fotos
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-400 dark:bg-rose-900/30">
              {photos.length}
            </span>
          </button>
        </div>
      </section>

      {/* ─── Galeria modal ──────────────────────────── */}
      {showGallery && <PhotoGallery onClose={() => setShowGallery(false)} />}
    </>
  )
}
