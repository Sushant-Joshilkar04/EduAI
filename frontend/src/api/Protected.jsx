"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken, isTokenValid, removeAuthData } from "@/utils/auth"

export default function ProtectedRoute({ children }) {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(true);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const checkAuth = () => {
         try {
            const token = getToken();
            
            if (!token) {
               console.log('No token found');
               removeAuthData(); 
               router.push("/login");
               return;
            }

            if (!isTokenValid(token)) {
               console.log('Invalid or expired token');
               removeAuthData(); 
               router.push("/login");
               return;
            }
            
            console.log('User is authenticated');
            setIsAuthenticated(true);
         } catch (error) {
            console.error("Auth check failed:", error);
            removeAuthData(); 
            router.push("/login");
         } finally {
            setIsLoading(false);
         }
      };

      checkAuth();
   }, [router]);

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center space-y-4">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
               <p className="text-white text-sm">Loading...</p>
            </div>
         </div>
      );
   }

   if (!isAuthenticated) {
      return null; 
   }

   return <>{children}</>;
}