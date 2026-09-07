import { Link } from "react-router-dom";
import site from "@/data/site.json";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold mb-1">{site.legalName}</h3>
            <p className="text-sm text-primary-foreground/75">{site.tagline}</p>
          </div>
          <nav
            className="flex flex-wrap justify-center gap-5 text-sm text-primary-foreground/80"
            aria-label="Footer"
          >
            {site.nav.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`/${item.href}`}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
          <div className="text-center md:text-right text-sm text-primary-foreground/75">
            <p>
              &copy; {new Date().getFullYear()} {site.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
