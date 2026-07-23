import {
  Bot,
  BrainCircuit,
  CodeXml,
  DatabaseZap,
  PanelsTopLeft,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Clients", href: "#clients" },
  { label: "Contact us", href: "#contact" },
] as const;

export type Service = {
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  accent: "violet" | "cyan" | "coral";
};

export const services: Service[] = [
  {
    title: "Custom software development",
    shortTitle: "Custom software",
    description:
      "Web products and internal systems shaped around the way your business actually works.",
    detail: "Product strategy / UX / full-stack delivery",
    icon: CodeXml,
    accent: "violet",
  },
  {
    title: "Applied AI integration",
    shortTitle: "AI integration",
    description:
      "Useful AI features connected to your data, workflows, and existing applications.",
    detail: "RAG / LLM workflows / evaluation",
    icon: BrainCircuit,
    accent: "cyan",
  },
  {
    title: "Conversational AI",
    shortTitle: "AI chatbots",
    description:
      "Context-aware assistants for support, onboarding, lead qualification, and team knowledge.",
    detail: "Chatbots / copilots / voice interfaces",
    icon: Bot,
    accent: "coral",
  },
  {
    title: "Product engineering",
    shortTitle: "Product engineering",
    description:
      "Focused engineering support to ship a new product or strengthen an existing platform.",
    detail: "Architecture / APIs / cloud delivery",
    icon: PanelsTopLeft,
    accent: "violet",
  },
  {
    title: "Data and automation",
    shortTitle: "Data automation",
    description:
      "Reliable pipelines and workflow automation that remove repetitive operational work.",
    detail: "Integrations / agents / data pipelines",
    icon: Workflow,
    accent: "cyan",
  },
  {
    title: "AI-ready platforms",
    shortTitle: "AI-ready platforms",
    description:
      "Modern foundations that make your product easier to extend, observe, and scale.",
    detail: "Modernization / observability / security",
    icon: DatabaseZap,
    accent: "coral",
  },
];

export const work = [
  {
    index: "01",
    category: "AI integration",
    title: "A support copilot grounded in company knowledge",
    summary:
      "A retrieval workflow that finds the right source material, drafts an answer, and keeps a human in control before anything reaches a customer.",
    tags: ["RAG", "Evaluation", "Admin tools"],
    color: "violet",
  },
  {
    index: "02",
    category: "Web platform",
    title: "A focused product experience from idea to launch",
    summary:
      "A responsive application with a clear design system, reliable APIs, analytics, and a deployment setup the internal team can own.",
    tags: ["Next.js", "APIs", "Cloud"],
    color: "cyan",
  },
  {
    index: "03",
    category: "Automation",
    title: "An operations layer that removes manual handoffs",
    summary:
      "Connected tools, validated data, and observable background workflows built around real approval and exception paths.",
    tags: ["Workflows", "Integrations", "Data"],
    color: "coral",
  },
] as const;

export const deliveryPrinciples = [
  "Clear decisions every week",
  "Senior engineers on the work",
  "Small releases, early feedback",
  "Systems your team can own",
  "Security considered from day one",
  "No black-box handoff",
] as const;

export type Client = {
  name: string;
  initial: string;
  project: string;
  // Leave the quote empty until the client approves a review, then paste it
  // here. An empty quote shows a "Review coming soon" placeholder on the card.
  quote: string;
  accent: "violet" | "cyan" | "coral";
};

export const clients: Client[] = [
  {
    name: "Andee",
    initial: "A",
    project: "Managed marketplace for trade and renovation work",
    quote: "",
    accent: "violet",
  },
];

export const serviceOptions = [
  "Custom software",
  "AI integration",
  "Chatbot or copilot",
  "Data and automation",
  "Product engineering support",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+",
  "Not sure yet",
] as const;
