// ============================================================
// Header, Footer, and shared layout pieces
// ============================================================
declare const Icon: any;
declare const Button: any;
declare const Logo: any;
declare const Eyebrow: any;
declare const Container: any;

type Route = "home" | "about" | "packages" | "booking";

const NAV_ITEMS: { route: Route; label: string }[] = [
  { route: "home", label: "Home" },
  { route: "about", label: "About Us" },
  { route: "packages", label: "Surf Packages" },
  { route: "booking", label: "Booking Request" },
];

// -----------------------------
// Top promo bar
// -----------------------------
function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__msg">
          <Icon name="heart" />
          <span>Returning guest? Enjoy <strong>10% off</strong> your stay</span>
        </div>
        <div className="topbar__links">
          <a href="tel:+212600000000"><Icon name="phone" /> +212 6 00 00 00 00</a>
          <a href="mailto:ohanasurfguiding@gmail.com"><Icon name="mail" /> ohanasurfguiding@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Header
// -----------------------------
type HeaderProps = {
  route: Route;
  go: (r: Route) => void;
};
function Header({ route, go }: HeaderProps) {
  const [open, setOpen] = React.useState(false);

  // close drawer when route changes
  React.useEffect(() => {
    setOpen(false);
  }, [route]);

  // lock scroll when drawer open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <TopBar />
      <header className="header">
        <div className="container header__inner">
          <a className="logo-link" href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>
            <Logo variant="horizontal" />
          </a>
          <nav className="nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.route}
                className={`nav__item ${route === item.route ? "is-active" : ""}`}
                onClick={() => go(item.route)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="header__cta">
            <Button variant="primary" size="sm" iconRight="arrow-right" onClick={() => go("booking")}>
              Book Now
            </Button>
            <button
              className="mobile-menu-btn"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-drawer__top">
          <button
            className="mobile-menu-btn"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="x" />
          </button>
        </div>
        <nav className="mobile-drawer__nav" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.route}
              className={route === item.route ? "is-active" : ""}
              onClick={() => { go(item.route); setOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mobile-drawer__cta">
          <Button variant="primary" size="lg" fullWidth iconRight="arrow-right" onClick={() => { go("booking"); setOpen(false); }}>
            Book Your Stay
          </Button>
          <div className="mobile-drawer__contact">
            <div style={{display:"flex", gap:"0.5rem", alignItems:"center", marginBottom:"0.4rem"}}>
              <Icon name="brand-whatsapp" /> <a href="https://wa.me/212600000000">+212 6 00 00 00 00</a>
            </div>
            <div style={{display:"flex", gap:"0.5rem", alignItems:"center"}}>
              <Icon name="mail" /> <a href="mailto:ohanasurfguiding@gmail.com">ohanasurfguiding@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// -----------------------------
// Footer
// -----------------------------
type FooterProps = { go: (r: Route) => void };
function Footer({ go }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><button onClick={() => go("home")}>Home</button></li>
              <li><button onClick={() => go("about")}>About Us</button></li>
              <li><button onClick={() => go("packages")}>Surf Packages</button></li>
              <li><button onClick={() => go("booking")}>Booking Request</button></li>
            </ul>
          </div>

          <div>
            <h4>The Camp</h4>
            <ul>
              <li><button onClick={() => go("about")}>Our story</button></li>
              <li><button onClick={() => go("about")}>The house</button></li>
              <li><button onClick={() => go("about")}>A day at Ohana</button></li>
              <li><button onClick={() => go("about")}>Meet the team</button></li>
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <ul>
              <li className="footer__contact-row">
                <Icon name="map-pin" /> <span>Aourir, Agadir<br/>Morocco</span>
              </li>
              <li className="footer__contact-row">
                <Icon name="mail" />
                <a href="mailto:ohanasurfguiding@gmail.com">ohanasurfguiding@gmail.com</a>
              </li>
              <li className="footer__contact-row">
                <Icon name="brand-whatsapp" />
                <a href="https://wa.me/212600000000">+212 6 00 00 00 00</a>
              </li>
              <li className="footer__contact-row">
                <Icon name="clock" /> <span>Open year-round</span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow Along</h4>
            <div className="footer__social" aria-label="Social links">
              <a href="https://www.instagram.com/ohana_surfmorocco/" aria-label="Instagram"><Icon name="brand-instagram" /></a>
              <a href="https://web.facebook.com/Ohana-surf-morocco-104723238577665" aria-label="Facebook"><Icon name="brand-facebook" /></a>
              <a href="https://wa.me/212600000000" aria-label="WhatsApp"><Icon name="brand-whatsapp" /></a>
              <a href="https://maps.google.com/?q=Aourir+Agadir+Morocco" aria-label="Google Maps" target="_blank" rel="noopener"><Icon name="map-pin" /></a>
            </div>
          </div>
        </div>

        <div className="footer__legal">
          <div>© {new Date().getFullYear()} Ohana Surf Morocco · All rights reserved</div>
          <div style={{display:"flex", gap:"1.25rem"}}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------
// Sticky mobile CTA — always visible bottom bar
// -----------------------------
function MobileCTA({ route, go }: { route: Route; go: (r: Route) => void }) {
  if (route === "booking") return null;
  return (
    <div className="mobile-cta">
      <Button variant="ink" fullWidth iconLeft="brand-whatsapp" href="https://wa.me/212600000000" ariaLabel="Chat on WhatsApp">
        WhatsApp
      </Button>
      <Button variant="primary" fullWidth iconRight="arrow-right" onClick={() => go("booking")}>
        Book Now
      </Button>
    </div>
  );
}

// -----------------------------
// Reusable: Page Header (interior pages)
// -----------------------------
type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  bgImage?: string;
  breadcrumb?: string;
  titleNoWrap?: boolean;
};
function PageHeader({ eyebrow, title, intro, bgImage, breadcrumb, titleNoWrap }: PageHeaderProps) {
  return (
    <header className="page-header">
      {bgImage && <div className="page-header__bg" style={{ backgroundImage: `url('${bgImage}')` }} />}
      <div className="container">
        {breadcrumb && (
          <div className="breadcrumb">
            <span>Home</span> <Icon name="chevron-right" /> <span>{breadcrumb}</span>
          </div>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 style={titleNoWrap ? { maxWidth: "none", whiteSpace: "nowrap" } : undefined}>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  );
}

// -----------------------------
// Big CTA banner
// -----------------------------
type CTABannerProps = {
  title: React.ReactNode;
  description?: string;
  ctaLabel?: string;
  onCTA?: () => void;
};
function CTABanner({ title, description, ctaLabel = "Book Your Stay", onCTA }: CTABannerProps) {
  return (
    <div className="cta-banner">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div>
        <Button variant="ink" size="lg" iconRight="arrow-right" onClick={onCTA}>{ctaLabel}</Button>
      </div>
    </div>
  );
}

Object.assign(window, {
  Header, Footer, MobileCTA, PageHeader, CTABanner, TopBar
});
