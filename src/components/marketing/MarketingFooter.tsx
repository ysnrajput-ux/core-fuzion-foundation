import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

const FOOTER_LINKS = [
  {
    title: "Programs",
    links: [
      { label: "Courses", to: ROUTES.marketing.courses },
      { label: "Faculty", to: ROUTES.marketing.faculty },
      { label: "Achievements", to: ROUTES.marketing.achievements },
      { label: "Book a Demo", to: ROUTES.marketing.demo },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "About Us", to: ROUTES.marketing.about },
      { label: "Contact", to: ROUTES.marketing.contact },
      { label: "Sign in", to: ROUTES.auth.login },
      { label: "Register", to: ROUTES.auth.register },
    ],
  },
];

const SOCIAL = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function MarketingFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-4">
            <Link to={ROUTES.root} className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl gradient-brand flex items-center justify-center shadow-glow">
                <GraduationCap className="size-5 text-white" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight">{APP.shortName}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {APP.tagline}. Empowering students with world-class coaching and personalized mentorship.
            </p>
            <div className="flex gap-2 pt-1">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="size-9 inline-flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Get in touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 mt-0.5 text-primary shrink-0" />
                <span>123 Education Lane, Knowledge Park, New Delhi 110001</span>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-primary shrink-0" />
                  +91 12345 67890
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${APP.supportEmail}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="size-4 text-primary shrink-0" />
                  {APP.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
