import React from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Heart } from 'lucide-react'

const allPhotos = [
  { url: '/img3.webp',  caption: 'O começo de tudo'    },
  { url: '/img4.webp',  caption: 'Cada detalhe importa' },
  { url: '/img5.webp',  caption: 'Momentos eternos'     },
  { url: '/img6.webp',  caption: 'Nossa história'       },
  { url: '/img7.webp',  caption: 'Sempre juntos'        },
  { url: '/img8.webp',  caption: 'Amor verdadeiro'      },
  { url: '/img9.webp',  caption: 'Para sempre'          },
  { url: '/img10.webp', caption: 'Eternamente'          },
  { url: '/img11.webp', caption: 'Eternamente'          },
  { url: '/img12.webp', caption: 'Eternamente'          },
  { url: '/img13.webp', caption: 'Eternamente'          },
  { url: '/img14.webp', caption: 'Eternamente'          },
  { url: '/img15.webp', caption: 'Eternamente'          },
  { url: '/img16.webp', caption: 'Eternamente'          },

].filter(p => p.url)

type Props = {
  onClose: () => void
}

export default function PhotoGallery({ onClose }: Props) {
  const [lightbox, setLightbox] = React.useState<number | null>(null)

  // Fecha com ESC, navega com setas
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox !== null) setLightbox(null)
        else onClose()
      }
      if (lightbox === null) return
      if (e.key === 'ArrowRight') setLightbox(i => (i! + 1) % allPhotos.length)
      if (e.key === 'ArrowLeft')  setLightbox(i => (i! - 1 + allPhotos.length) % allPhotos.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, onClose])

  // Trava scroll do body enquanto aberto
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      {/* ─── MODAL GALERIA ─────────────────────────────── */}
      <div className="fixed inset-0 z-[100] flex flex-col bg-[#fdf9f6] dark:bg-slate-950">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-50 px-6 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-rose-200" />
            <Heart className="h-3.5 w-3.5 fill-rose-300 text-rose-300" />
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-rose-400">Galeria</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{allPhotos.length} fotos</span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white text-slate-500 shadow-sm transition hover:border-rose-300 hover:text-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              aria-label="Fechar galeria"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Grid de fotos com scroll */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {allPhotos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-rose-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-800"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                  <ZoomIn className="scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" size={24} strokeWidth={1.5} />
                </div>
                {/* Caption no hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/70 p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="font-serif text-xs italic text-white/90">{photo.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-rose-50 px-6 py-4 text-center dark:border-slate-800">
          <p className="text-xs italic text-slate-400">Clique em qualquer foto para ampliar</p>
        </div>
      </div>

      {/* ─── LIGHTBOX ──────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Fechar */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <X size={18} />
          </button>

          {/* Contador */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium tracking-widest text-white/70">
              {String(lightbox + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}
            </span>
          </div>

          {/* Seta esquerda */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(i => (i! - 1 + allPhotos.length) % allPhotos.length) }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:left-6"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          {/* Foto ampliada */}
          <div
            className="relative max-h-[85vh] max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              key={lightbox}
              src={allPhotos[lightbox].url}
              alt={allPhotos[lightbox].caption}
              className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            {/* Caption */}
            <p className="mt-4 text-center font-serif text-sm italic text-white/60">
              {allPhotos[lightbox].caption}
            </p>
          </div>

          {/* Seta direita */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(i => (i! + 1) % allPhotos.length) }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-6"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          {/* Miniaturas na base */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto px-4">
            {allPhotos.map((p, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setLightbox(i) }}
                className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                  i === lightbox
                    ? 'ring-2 ring-rose-400 ring-offset-1 ring-offset-black opacity-100'
                    : 'opacity-40 hover:opacity-70'
                }`}
              >
                <img src={p.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
