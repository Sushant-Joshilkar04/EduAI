'use client';

import { useEffect, useState } from "react";
import { verifyEmail } from "@/api/auth";

export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      // Get token from URL manually (client-side only)
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("Invalid verification link. No token provided.");
        return;
      }

      try {
        const response = await verifyEmail(token);
        setStatus("Email verified successfully! You can now login.");
        setIsVerified(true);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("Verification failed. Invalid or expired link.");
      }
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Email Verification
          </h1>

          <div className="mb-6">
            {status === "Verifying..." ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <span className="text-white/70 ml-3">{status}</span>
              </div>
            ) : (
              <p className={`text-lg ${isVerified ? "text-green-400" : "text-red-400"}`}>
                {status}
              </p>
            )}
          </div>

          {isVerified && (
            <button
              onClick={() => (window.location.href = "/login")}
              className="w-full py-3 bg-white/90 text-gray-900 font-semibold rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Go to Login
            </button>
          )}

          {!isVerified && status !== "Verifying..." && (
            <button
              onClick={() => (window.location.href = "/register")}
              className="w-full py-3 bg-white/90 text-gray-900 font-semibold rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Go to Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
