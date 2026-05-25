// ============================================================
// APP — root component, hash routing, scroll-reveal
// ============================================================
declare const Header: any;
declare const Footer: any;
declare const MobileCTA: any;
declare const HomePage: any;
declare const AboutPage: any;
declare const PackagesPage: any;
declare const BookingPage: any;

type Route = "home" | "about" | "packages" | "booking";
const VALID: Route[] = ["home", "about", "packages", "booking"];

function getRouteFromHash(): Route {
  const h = (window.location.hash || "").replace(/^#\/?/, "").split("?")[0];
  return (VALID as string[]).includes(h) ? (h as Route) : "home";
}

function App() {
  const [route, setRoute] = React.useState<Route>(getRouteFromHash());

  React.useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r: Route) => {
    window.location.hash = `/${r}`;
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  // Set page title per route
  React.useEffect(() => {
    const titles: Record<Route, string> = {
      home: "Ohana Surf Morocco — Surf & Stay with Yassin",
      about: "About — Ohana Surf Morocco",
      packages: "Surf Packages — Ohana Surf Morocco",
      booking: "Booking Request — Ohana Surf Morocco",
    };
    document.title = titles[route];
  }, [route]);

  // Scroll-reveal observer
  React.useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [route]);

  let page: React.ReactNode = null;
  if (route === "home") page = <HomePage go={go} />;
  else if (route === "about") page = <AboutPage go={go} />;
  else if (route === "packages") page = <PackagesPage go={go} />;
  else if (route === "booking") page = <BookingPage go={go} />;

  return (
    <div className="app has-mobile-cta">
      <Header route={route} go={go} />
      {page}
      <Footer go={go} />
      <MobileCTA route={route} go={go} />
    </div>
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
}
