"use client";

import { store } from "@/redux";
import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "sonner";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
            duration={4000}
          />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
