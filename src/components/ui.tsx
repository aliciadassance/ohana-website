// ============================================================
// Design system primitives — reusable, prop-driven components.
// These are the foundation we'll extract into a shared package.
// ============================================================

// -----------------------------
// Icon — Tabler webfont wrapper
// -----------------------------
type IconProps = {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};
function Icon({ name, size, className = "", style, ariaLabel }: IconProps) {
  const css: React.CSSProperties = { ...style };
  if (size) css.fontSize = `${size}px`;
  return (
    <i
      className={`ti ti-${name} ${className}`}
      style={css}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}

// -----------------------------
// Button
// -----------------------------
type ButtonVariant = "primary" | "teal" | "ink" | "outline" | "outline-light" | "outline-teal" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";
type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: string;
  iconRight?: string;
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
};
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
  fullWidth,
  ariaLabel,
}: ButtonProps) {
  const cls = [
    "btn",
    `btn--${variant}`,
    size !== "md" ? `btn--${size}` : "",
    fullWidth ? "btn--block" : "",
    className,
  ].filter(Boolean).join(" ");
  const style: React.CSSProperties = fullWidth ? { width: "100%" } : {};
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} style={style} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

// -----------------------------
// Badge
// -----------------------------
type BadgeProps = {
  variant?: "teal" | "orange" | "sand" | "ink" | "solid-orange";
  children: React.ReactNode;
  icon?: string;
};
function Badge({ variant = "teal", children, icon }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
}

// -----------------------------
// Stars
// -----------------------------
function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name={i < count ? "star-filled" : "star"} />
      ))}
    </span>
  );
}

// -----------------------------
// Eyebrow — section pre-title
// -----------------------------
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

// -----------------------------
// Section + Container
// -----------------------------
type SectionProps = {
  id?: string;
  className?: string;
  tight?: boolean;
  bg?: "sand" | "white" | "ink" | "teal";
  children: React.ReactNode;
};
function Section({ id, className = "", tight, bg, children }: SectionProps) {
  const bgClass = bg ? `section--${bg}` : "";
  const styles: React.CSSProperties = {};
  if (bg === "white") styles.background = "white";
  if (bg === "sand") styles.background = "var(--brand-sand-100)";
  if (bg === "ink") { styles.background = "var(--brand-ink)"; styles.color = "white"; }
  if (bg === "teal") { styles.background = "var(--brand-teal-800)"; styles.color = "white"; }
  return (
    <section
      id={id}
      className={`${tight ? "section-tight" : "section"} ${bgClass} ${className}`}
      style={styles}
    >
      <div className="container">{children}</div>
    </section>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

// -----------------------------
// Form fields
// -----------------------------
type FieldWrapperProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
};
function Field({ label, required, hint, error, htmlFor, children }: FieldWrapperProps) {
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="required" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

type InputProps = {
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
  step?: string | number;
};
function Input(props: InputProps) {
  return <input className="input" {...props} />;
}

type TextareaProps = {
  id?: string;
  name: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
function Textarea(props: TextareaProps) {
  return <textarea className="textarea" {...props} />;
}

type SelectOption = { value: string; label: string };
type SelectProps = {
  id?: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};
function Select({ options, placeholder, ...rest }: SelectProps) {
  return (
    <select className="select" {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

type RadioGroupProps = {
  name: string;
  options: { value: string; label: string; icon?: string }[];
  value: string;
  onChange: (v: string) => void;
};
function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="radio-group" role="radiogroup">
      {options.map((o) => (
        <label key={o.value} className={`radio-tile ${value === o.value ? "is-checked" : ""}`}>
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
  );
}

type CheckboxProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};
function Checkbox({ name, value, label, checked, onChange }: CheckboxProps) {
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
  );
}

// -----------------------------
// Logo
// -----------------------------
type LogoProps = {
  variant?: "horizontal" | "stacked" | "compact";
  alt?: string;
  height?: number;
  invert?: boolean;
};
function Logo({ variant = "horizontal", alt = "Ohana Surf Morocco", height, invert }: LogoProps) {
  const src =
    invert ? "assets/LOGO-white-horizontal.png"
    : variant === "stacked" ? "assets/LOGO-color-vertical.png"
    : variant === "compact" ? "assets/LOGO-color-block.png"
    : "assets/LOGO-color-horizontal.png";
  const style: React.CSSProperties = {};
  if (height) style.height = `${height}px`;
  return <img src={src} alt={alt} style={style} className="logo-img" />;
}

// Expose globally so other Babel script blocks can use them.
Object.assign(window, {
  Icon, Button, Badge, Stars, Eyebrow, Section, Container,
  Field, Input, Textarea, Select, RadioGroup, Checkbox, Logo,
});
