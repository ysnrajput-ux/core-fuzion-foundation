import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

import { Section } from "@/components/marketing/Section";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/feedback/toast";

const CONTACT_INFO = [
  { icon: MapPin, label: "Visit Us", value: "123 Education Lane, Knowledge Park, New Delhi 110001" },
  { icon: Phone, label: "Call Us", value: "+91 12345 67890" },
  { icon: Mail, label: "Email Us", value: "support@fuzion.institute" },
  { icon: Clock, label: "Office Hours", value: "Mon – Sat · 9:00 AM – 7:00 PM" },
];

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section
      eyebrow="Contact"
      title="Let's talk"
      description="Have questions? We're here to help. Reach out and we'll respond within 24 hours."
    >
      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {CONTACT_INFO.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <div className="size-11 rounded-xl gradient-brand-soft flex items-center justify-center shrink-0">
                <item.icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <input
                  required
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-ring outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-ring outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <input
                required
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-ring outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                required
                rows={5}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring outline-none resize-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
              <Send className="size-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
