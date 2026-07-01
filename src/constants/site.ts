import { Facebook, Instagram, Youtube, Send, MessageCircle } from "lucide-react";
import type { SocialLink } from "@/types";

export const SITE = {
  name: "Techuncos",
  tagline: "AI, Technology & Digital — in your language.",
  taglineMl: "AI, ടെക്നോളജി, ഡിജിറ്റൽ — നിങ്ങളുടെ ഭാഷയിൽ.",
  description:
    "Techuncos is a premium Malayalam-first publication covering AI, technology, digital tools, tutorials and prompt engineering.",
  url: "https://techuncos.com",
  email: "techuncos@gmail.com",
  whatsapp: "8086585801",
  whatsappUrl: "https://wa.me/918086585801",
  locale: "en_IN",
} as const;

export const TELEGRAM = {
  channel: "https://t.me/techuncos",
  info: "https://t.me/techuncosinfo",
  handle: "@techuncos",
} as const;

export const SOCIALS: SocialLink[] = [
  { label: "Telegram", href: "https://t.me/techuncos", icon: Send },
  { label: "Instagram", href: "https://www.instagram.com/tech_uncos/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@TechUncoz", icon: Youtube },
  { label: "Facebook", href: "https://facebook.com/techuncos", icon: Facebook },
  { label: "WhatsApp", href: "https://wa.me/918086585801", icon: MessageCircle },
];
