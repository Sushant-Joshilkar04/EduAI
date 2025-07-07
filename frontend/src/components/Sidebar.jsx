"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconMessageChatbot,
  IconFileUpload,
  IconCalendarEvent,
  IconVolume,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { logout as logoutApi } from "@/api/auth"; 
import { useRouter } from "next/navigation";

export function SidebarDemo({ open, setOpen }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          method: 'GET',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user); 
        } else {
          console.log('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(" ");
    }
  }, [user]);

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
        <span className="text-white">AI Assistant</span>
      ),
      href: '/chat',
      icon: (
        <IconMessageChatbot className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Upload Documents</span>
      ),
      href: '/upload',
      icon: (
        <IconFileUpload className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Study Planner</span>
      ),
      href: '/planner',
      icon: (
        <IconCalendarEvent className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Audio Generator</span>
      ),
      href: '/pdf-to-speech',
      icon: (
        <IconVolume className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
      ),
    },
    {
      label: (
        <span className="text-white">Logout</span>
      ),
      href: "#",
      icon: (
        <IconLogout className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
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
            {open ? <Logo user={user} /> : <LogoIcon user={user} />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user ? `${user.firstName} ${user.lastName}` : "Loading...",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user ? user.firstName.charAt(0).toUpperCase() : "?"}
                    </span>
                  </div>
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

export const Logo = () => {
  return (
    <a
      className="relative z-20 flex items-center space-x-3 py-2 text-sm font-normal text-black">
      <div className="relative h-8 w-8 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl transform rotate-12 opacity-90"></div>
        
        <div className="absolute inset-0.5 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {"E"}
          </span>
        </div>
        
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl transform rotate-12 opacity-20 blur-sm scale-110"></div>
      </div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-lg whitespace-pre bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
        EduAI
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center justify-center py-2 text-sm font-normal text-black">
      <div className="relative h-8 w-8 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl transform rotate-12 opacity-90"></div>
        
        <div className="absolute inset-0.5 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            { "E"}
          </span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl transform rotate-12 opacity-20 blur-sm scale-110"></div>
      </div>
    </a>
  );
};

const Dashboard = () => {
  return (
    <>
      
    </>
  );
};