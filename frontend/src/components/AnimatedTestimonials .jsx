import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import dynamic from "next/dynamic";
export function AnimatedTestimonialsDemo() {
  const testimonials = [
  {
    quote:
      "StudyAI's smart notes feature has revolutionized how I prepare for exams. The AI-generated summaries and key concepts extraction saved me countless hours of study time.",
    name: "Sarah Chen",
    designation: "Medical Student at Stanford University",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The AI tutor is available 24/7 and provides personalized explanations that match my learning pace. It's like having a personal professor whenever I need help.",
    name: "Michael Rodriguez",
    designation: "Engineering Student at MIT",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The study planner feature helped me organize my entire semester. The AI adapts my schedule based on my progress and keeps me on track for all my goals.",
    name: "Emily Watson",
    designation: "Business Major at Harvard University",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The collaborative learning community is incredible. I've connected with students worldwide, shared study materials, and learned so much from peer discussions.",
    name: "James Kim",
    designation: "Computer Science Student at UC Berkeley",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "StudyAI transformed my learning experience from struggling to thriving. The personalized approach and intelligent features make studying efficient and enjoyable.",
    name: "Lisa Thompson",
    designation: "Psychology Graduate Student at Yale University",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
