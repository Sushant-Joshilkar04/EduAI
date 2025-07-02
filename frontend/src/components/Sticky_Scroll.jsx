"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";


const content = [
  {
    title: "AI-Powered Smart Notes",
    description:
      "Transform your lectures, PDFs, and study materials into intelligent, structured notes instantly. Our AI analyzes your content and extracts key concepts, creating comprehensive study notes that adapt to your learning style. Never miss important information again.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <div className="text-center p-8">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a3 3 0 003 3h2a3 3 0 003-3V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Smart Notes</h3>
          <p className="text-sm opacity-90">1,042+ generated notes</p>
        </div>
      </div>
    ),
  },
  {
    title: "Real-time AI Tutoring",
    description:
      "Get instant, personalized help from your AI tutor available 24/7. Ask questions, clarify concepts, and receive detailed explanations tailored to your learning pace. Experience interactive learning sessions that adapt to your understanding level.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <div className="text-center p-8 bg-gradient-to-br from-purple-600 to-blue-600 w-full h-full flex items-center justify-center">
          <div>
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Tutor</h3>
            <p className="text-sm opacity-90">19,346+ tutoring sessions</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Intelligent Study Planning",
    description:
      "Create personalized study schedules that adapt to your goals, deadlines, and learning progress. Our AI analyzes your performance and optimizes your study plan in real-time, ensuring maximum efficiency and retention for your academic success.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <div className="text-center p-8">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Study Planner</h3>
          <p className="text-sm opacity-90">440+ personalized plans</p>
        </div>
      </div>
    ),
  },
  {
    title: "Collaborative Learning Hub",
    description:
      "Connect with thousands of students worldwide. Share study materials, join study groups, collaborate on projects, and learn together. Our platform creates a supportive community where knowledge sharing accelerates everyone's learning journey.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <div className="text-center p-8">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">StudyAI Community</h3>
          <p className="text-sm opacity-90">24,945+ active learners</p>
        </div>
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-0">
      <StickyScroll content={content} />
    </div>
  );
}
