import { z } from 'zod'
import { PACKAGES, ROOMS } from '@/lib/data'

const SURF_LEVELS = ['beginner', 'intermediate', 'advanced'] as const

const PACKAGE_NAMES = [...PACKAGES.map((p) => p.name), 'Surf Lab'] as [string, ...string[]]
const ROOM_IDS = ['', ...ROOMS.map((r) => r.id)] as [string, ...string[]]

const noControlChars = (s: string) => !/[\r\n\0]/.test(s)
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const safeText = (max: number) =>
  z
    .string()
    .max(max, `Must be ${max} characters or fewer`)
    .refine(noControlChars, 'Contains forbidden characters')

const safeOptional = (max: number) =>
  z
    .string()
    .max(max, `Must be ${max} characters or fewer`)
    .refine(noControlChars, 'Contains forbidden characters')
    .optional()
    .default('')

export const BookingSchema = z
  .object({
    fullName: safeText(200).refine((s) => s.trim().length >= 2, 'Please tell us your name'),
    email: z
      .string()
      .max(254)
      .email('Please enter a valid email')
      .refine(noControlChars, 'Email contains forbidden characters'),
    phone: safeText(40).refine((s) => s.trim().length > 0, 'Add your WhatsApp number'),
    country: safeText(100).refine((s) => s.trim().length > 0, 'Pick your country'),
    package: z.enum(PACKAGE_NAMES, { message: 'Choose one of the offered packages' }),
    arrival: z
      .string()
      .regex(ISO_DATE, 'Arrival date is invalid'),
    departure: z
      .string()
      .regex(ISO_DATE, 'Departure date is invalid'),
    guests: z
      .union([z.string(), z.number()])
      .transform((v) => (typeof v === 'string' ? v.trim() : String(v)))
      .pipe(
        z
          .string()
          .regex(/^\d+$/, 'Guest count must be a number')
          .transform((v) => parseInt(v, 10))
          .refine((n) => n >= 1 && n <= 20, 'Guest count must be between 1 and 20')
      ),
    level: z.enum(SURF_LEVELS, { message: 'Pick your surf level' }),
    accommodation: z.enum(ROOM_IDS).optional().default(''),
    pickup: safeOptional(120),
    diet: safeOptional(500),
    referral: safeOptional(80),
    message: safeOptional(5000),
    marketing: z.boolean().optional().default(false),
    returning: z.boolean().optional().default(false),
    // Honeypot — bots fill this; real users don't see it
    website: z.string().max(0, 'Spam detected').optional().default(''),
  })
  .refine((d) => d.departure > d.arrival, {
    message: 'Departure must be after arrival',
    path: ['departure'],
  })

export type BookingInput = z.infer<typeof BookingSchema>
