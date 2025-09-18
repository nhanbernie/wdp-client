"use client";

// import { store } from "@/redux";
// import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "@/contexts/ThemeContext";
// import { Toaster } from "@/components/ui/toaster";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    // <Provider store={store}>
    <AuthProvider>
      {/* <ThemeProvider> */}
      {children}
      {/* <Toaster /> */}
      {/* </ThemeProvider> */}
    </AuthProvider>
    // </Provider>
  );
}
