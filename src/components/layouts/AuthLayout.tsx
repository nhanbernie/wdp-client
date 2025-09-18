"use client";

import { Logo } from "@/components/common";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}

            <div className="space-y-8">
              <Logo />
              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Viral Predictor
                  </span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  Predict your viral potential with AI-powered analytics before
                  you publish
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                {/* Like start card */}
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex justify-center lg:justify-end">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
