export interface Package {
  id: string
  name: string
  tag: string
  tagVariant: 'teal' | 'orange' | 'sand' | 'ink' | 'solid-orange'
  duration: string
  sub: string
  image: string
  features: string[]
  priceFrom: number
  priceUnit: string
  priceFullDay?: number
  featured: boolean
}

export interface Review {
  name: string
  location: string
  level: string
  stars: number
  text: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

export interface DayItem {
  time: string
  title: string
  desc: string
}

export interface Room {
  id: string
  name: string
  sub: string
  capacity: string
  image: string
}

export interface FAQ {
  q: string
  a: string
}
