"use client";

import React, { useState } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";

export interface UserMenuProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

// import { useAuth } from "@/contexts/AuthContext";
const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { logout } = useAuth();

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name || "User"}
              width={32}
              height={32}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={16} className="text-gray-600" />
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {user && (
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}

          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <User size={16} />
            Profile
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Settings size={16} />
            Settings
          </button>

          <hr className="my-1" />

          <button
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            // onClick={logout}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
