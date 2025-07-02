"use client";
import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { logout as logoutApi } from "@/api/auth"; 
import { useRouter } from "next/navigation";
export function SidebarDemo({ open, setOpen }) {

 
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logoutApi();
      router.push("/login");
    } catch (err) {
      router.push("/login");
    }
  };
  const links = [
    
    {
      label: (
        <span className="text-white">Chat With AI</span>
      ),
      href: '/chat',
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Upload PDF</span>
      ),
      href: '/upload',
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Create Study Plan</span>
      ),
      href: '/planner',
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Generate Audio</span>
      ),
      href: '/pdf-to-speech',
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Logout</span>
      ),
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
      onClick: handleLogout,
    },
  ];

 return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden  bg-gray-900 md:flex-row",
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }}
              className="text-white"
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

// Modern EduHub Logo with aesthetic symbol
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-3 py-2 text-sm font-normal text-black">
      {/* Modern EduHub Symbol */}
      <div className="relative h-8 w-8 shrink-0">
        {/* Outer hexagon with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl transform rotate-12 opacity-90"></div>
        
        {/* Inner shape - book pages effect */}
        <div className="absolute inset-0.5 bg-gray-800 rounded-lg flex items-center justify-center">
          {/* Stylized "E" for Education */}
          <div className="relative">
            <div className="w-3 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-sm relative">
              <div className="absolute -right-0.5 top-0 w-1.5 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"></div>
              <div className="absolute -right-0.5 top-1.5 w-1 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-sm"></div>
              <div className="absolute -right-0.5 bottom-0 w-1.5 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl transform rotate-12 opacity-20 blur-sm scale-110"></div>
      </div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-lg whitespace-pre bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
        EduHub
      </motion.span>
    </a>
  );
};

// Compact version for collapsed sidebar
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center justify-center py-2 text-sm font-normal text-black">
      {/* Same modern symbol but standalone */}
      <div className="relative h-8 w-8 shrink-0">
        {/* Outer hexagon with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl transform rotate-12 opacity-90"></div>
        
        {/* Inner shape - book pages effect */}
        <div className="absolute inset-0.5 bg-gray-800 rounded-lg flex items-center justify-center">
          {/* Stylized "E" for Education */}
          <div className="relative">
            <div className="w-3 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-sm relative">
              <div className="absolute -right-0.5 top-0 w-1.5 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"></div>
              <div className="absolute -right-0.5 top-1.5 w-1 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-sm"></div>
              <div className="absolute -right-0.5 bottom-0 w-1.5 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl transform rotate-12 opacity-20 blur-sm scale-110"></div>
      </div>
    </a>
  );
};

// Enhanced Dashboard component with better content
const Dashboard = () => {
  return (
    <>
      
    </>
  );
};