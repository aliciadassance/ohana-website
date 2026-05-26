'use client'

import React from 'react'
import Image from 'next/image'
import blurData from '@/lib/blur-data.json'

const BLUR_MAP = blurData as Record<string, string>

// ---- Icon ----
type IconProps = {
  name: string
  size?: number
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}
export function Icon({ name, size, className = '', style, ariaLabel }: IconProps) {
  const css: React.CSSProperties = { ...style }
  if (size) css.fontSize = `${size}px`
  return (
    <i
      className={`ti ti-${name} ${className}`}
      style={css}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  )
}

// ---- Button ----
type ButtonVariant = 'primary' | 'teal' | 'ink' | 'outline' | 'outline-light' | 'outline-teal' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: string
  iconRight?: string
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
  ariaLabel?: string
}
export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled,
  fullWidth,
  ariaLabel,
}: ButtonProps) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size !== 'md' ? `btn--${size}` : '',
    fullWidth ? 'btn--block' : '',
    className,
  ].filter(Boolean).join(' ')
  const style: React.CSSProperties = fullWidth ? { width: '100%' } : {}
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} style={style} aria-label={ariaLabel}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}

// ---- Badge ----
type BadgeVariant = 'teal' | 'orange' | 'sand' | 'ink' | 'solid-orange'
type BadgeProps = {
  variant?: BadgeVariant
  children: React.ReactNode
  icon?: string
}
export function Badge({ variant = 'teal', children, icon }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      {icon && <Icon name={icon} />}
      {children}
    </span>
  )
}

// ---- Stars ----
export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name={i < count ? 'star-filled' : 'star'} />
      ))}
    </span>
  )
}

// ---- Eyebrow ----
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>
}

// ---- Section ----
type SectionProps = {
  id?: string
  className?: string
  tight?: boolean
  bg?: 'sand' | 'white' | 'ink' | 'teal'
  children: React.ReactNode
}
export function Section({ id, className = '', tight, bg, children }: SectionProps) {
  const bgClass = bg ? `section--${bg}` : ''
  const styles: React.CSSProperties = {}
  if (bg === 'white') styles.background = 'white'
  if (bg === 'sand') styles.background = 'var(--brand-sand-100)'
  if (bg === 'ink') { styles.background = 'var(--brand-ink)'; styles.color = 'white' }
  if (bg === 'teal') { styles.background = 'var(--brand-teal-800)'; styles.color = 'white' }
  return (
    <section
      id={id}
      className={`${tight ? 'section-tight' : 'section'} ${bgClass} ${className}`}
      style={styles}
    >
      <div className="container">{children}</div>
    </section>
  )
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>
}

// ---- Form fields ----
type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  error?: string
  htmlFor?: string
  children: React.ReactNode
}
export function Field({ label, required, hint, error, htmlFor, children }: FieldProps) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="required" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

type InputProps = {
  id?: string
  name: string
  type?: string
  placeholder?: string
  value?: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: string | number
  max?: string | number
}
export function Input(props: InputProps) {
  return <input className="input" {...props} />
}

type TextareaProps = {
  id?: string
  name: string
  placeholder?: string
  rows?: number
  value?: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export function Textarea(props: TextareaProps) {
  return <textarea className="textarea" {...props} />
}

type SelectOption = { value: string; label: string }
type SelectProps = {
  id?: string
  name: string
  options: SelectOption[]
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  disabled?: boolean
}
export function Select({ options, placeholder, ...rest }: SelectProps) {
  return (
    <select className="select" {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

type RadioGroupProps = {
  name: string
  options: { value: string; label: string; icon?: string }[]
  value: string
  onChange: (v: string) => void
}
export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="radio-group" role="radiogroup">
      {options.map((o) => (
        <label key={o.value} className={`radio-tile ${value === o.value ? 'is-checked' : ''}`}>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          {o.icon && <Icon name={o.icon} />}
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  )
}

type CheckboxProps = {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}
export function Checkbox({ name, value, label, checked, onChange }: CheckboxProps) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

// ---- Logo ----
type LogoProps = {
  variant?: 'horizontal' | 'stacked' | 'compact'
  alt?: string
  height?: number
  invert?: boolean
}
const LOGO_ASSETS = {
  'horizontal-color': { src: '/assets/LOGO-color-horizontal.png', w: 3337, h: 883 },
  'horizontal-white': { src: '/assets/LOGO-white-horizontal.png', w: 3500, h: 1382 },
  'stacked':          { src: '/assets/LOGO-color-vertical.png',   w: 2309, h: 3482 },
  'compact':          { src: '/assets/LOGO-color-block.png',      w: 4095, h: 2380 },
} as const
export function Logo({ variant = 'horizontal', alt = 'Ohana Surf Morocco', height, invert }: LogoProps) {
  const key: keyof typeof LOGO_ASSETS =
    invert ? 'horizontal-white'
    : variant === 'stacked' ? 'stacked'
    : variant === 'compact' ? 'compact'
    : 'horizontal-color'
  const asset = LOGO_ASSETS[key]
  const style: React.CSSProperties = {}
  if (height) style.height = `${height}px`
  const renderedHeight = height ?? 64
  const renderedWidth = Math.round((asset.w / asset.h) * renderedHeight)
  return (
    <Image
      src={asset.src}
      alt={alt}
      width={renderedWidth}
      height={renderedHeight}
      priority
      style={style}
      className={`logo-img logo-img--${key}`}
    />
  )
}

// ---- Skeletons ----
type SkeletonProps = {
  width?: number | string
  height?: number | string
  radius?: number | string
  className?: string
  style?: React.CSSProperties
}
export function Skeleton({ width, height, radius, className = '', style }: SkeletonProps) {
  const css: React.CSSProperties = { ...style }
  if (width !== undefined) css.width = typeof width === 'number' ? `${width}px` : width
  if (height !== undefined) css.height = typeof height === 'number' ? `${height}px` : height
  if (radius !== undefined) css.borderRadius = typeof radius === 'number' ? `${radius}px` : radius
  return <span className={`skeleton ${className}`} style={css} aria-hidden="true" />
}

type SkeletonTextProps = {
  lines?: number
  lastLineWidth?: string
  gap?: string
  lineHeight?: string
  className?: string
}
export function SkeletonText({
  lines = 3,
  lastLineWidth = '60%',
  gap = '0.5rem',
  lineHeight = '1em',
  className = '',
}: SkeletonTextProps) {
  return (
    <span className={`skeleton-text ${className}`} style={{ gap }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={lineHeight}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          radius="4px"
        />
      ))}
    </span>
  )
}

type SkeletonImgProps = {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  sizes?: string
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}
const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
export function SkeletonImg({
  src,
  alt,
  loading = 'lazy',
  priority = false,
  sizes = DEFAULT_SIZES,
  className = '',
  style,
  onLoad,
  onError,
}: SkeletonImgProps) {
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = React.useState(false)
  const [errored, setErrored] = React.useState(false)
  const blurDataURL = BLUR_MAP[src]

  // next/image can finish loading before React attaches onLoad (warm cache /
  // fast hydration); without this the image stays pinned at opacity:0 forever.
  React.useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <span className="skeleton-img__wrap" style={style}>
      {!loaded && !errored && !blurDataURL && (
        <span className="skeleton skeleton-img" aria-hidden="true" />
      )}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : loading}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className={`skeleton-img__img ${loaded || blurDataURL ? 'is-loaded' : ''} ${className}`}
        onLoad={() => { setLoaded(true); onLoad?.() }}
        onError={() => { setErrored(true); onError?.() }}
      />
    </span>
  )
}
