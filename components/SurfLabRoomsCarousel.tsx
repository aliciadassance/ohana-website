'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import 'swiper/css'
import { Icon } from './ui'
import { ROOMS } from '@/lib/data'

const POPULAR_ID = 'twin'
const DOUBLE_IDS = ['double-standard', 'double-balcony']

const SURF_LAB_PRICE: Record<string, number> = {
  'shared-4':        580,
  'small-inside':    615,
  'twin':            600,
  'double-standard': 600,
  'double-balcony':  600,
}
const PRIVATE_PRICE = 700

export default function SurfLabRoomsCarousel() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [privateRooms, setPrivateRooms] = useState<Set<string>>(new Set())

  const rooms = ROOMS.map(r => ({ ...r, popular: r.id === POPULAR_ID }))
  const initialSlide = Math.max(rooms.findIndex(r => r.popular), 0)

  function slideClass(i: number) {
    if (hoveredIdx === null) return 'sl-rooms-slide'
    if (hoveredIdx === i)   return 'sl-rooms-slide sl-rooms-slide--hovered'
    return 'sl-rooms-slide sl-rooms-slide--dimmed'
  }

  function togglePrivate(id: string) {
    setPrivateRooms(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="sl-rooms-carousel">
      <button
        ref={setPrevEl}
        className="carousel__arrow sl-rooms-arrow carousel__arrow--prev"
        aria-label="Previous room"
      >
        <Icon name="chevron-left" />
      </button>

      <div className="sl-rooms-swiper-clip">
        <Swiper
          modules={[Navigation, A11y]}
          centeredSlides
          slidesPerView={1.2}
          spaceBetween={20}
          initialSlide={initialSlide}
          breakpoints={{
            580: { slidesPerView: 1.65, spaceBetween: 24 },
            900: { slidesPerView: 2.6,  spaceBetween: 28 },
          }}
          navigation={{ prevEl, nextEl }}
          a11y={{ prevSlideMessage: 'Previous room', nextSlideMessage: 'Next room' }}
          className="sl-rooms-swiper"
        >
          {rooms.map((r, i) => {
            const isDouble  = DOUBLE_IDS.includes(r.id)
            const isPrivate = r.id === 'small-inside' || (isDouble && privateRooms.has(r.id))
            const price     = isDouble && privateRooms.has(r.id) ? PRIVATE_PRICE : SURF_LAB_PRICE[r.id]

            return (
              <SwiperSlide
                key={r.id}
                className={slideClass(i)}
                style={{ height: 'auto' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className={`sl-room-card${r.popular ? ' sl-room-card--popular' : ''}`}>
                  <div className="sl-room-card__img">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 580px) 85vw, (max-width: 900px) 60vw, 38vw"
                    />
                  </div>
                  <div className="sl-room-card__body">
                    {r.popular && <span className="sl-room-card__badge">Most popular</span>}

                    <div className="sl-room-card__type">
                      {isPrivate
                        ? <><Icon name="star-filled" className="sl-room-card__type-icon" /> Private</>
                        : <><Icon name="users"       className="sl-room-card__type-icon" /> Shared</>}
                    </div>

                    <div className="sl-room-card__name">{r.name}</div>

                    <div className="sl-room-card__price">
                      €{price}<span className="sl-room-card__price-unit">/person</span>
                    </div>

                    <p className="sl-room-card__desc">{r.sub ?? `Sleeps up to ${r.maxPax}.`}</p>

                    {isDouble && (
                      <button
                        className={`sl-room-card__private-toggle${privateRooms.has(r.id) ? ' is-on' : ''}`}
                        onClick={() => togglePrivate(r.id)}
                        aria-pressed={privateRooms.has(r.id)}
                      >
                        <span className="sl-room-card__private-toggle__label">
                          <Icon name="lock" />
                          Privatise this room
                        </span>
                        <span className="sl-room-card__toggle-track">
                          <span className="sl-room-card__toggle-thumb" />
                        </span>
                      </button>
                    )}

                    <div className="sl-room-spots">
                      {Array.from({ length: r.maxPax }).map((_, j) => (
                        <span key={j} className="sl-room-spots__dot" />
                      ))}
                      <span className="sl-room-spots__label">{r.maxPax} spot{r.maxPax !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <button
        ref={setNextEl}
        className="carousel__arrow sl-rooms-arrow carousel__arrow--next"
        aria-label="Next room"
      >
        <Icon name="chevron-right" />
      </button>
    </div>
  )
}
