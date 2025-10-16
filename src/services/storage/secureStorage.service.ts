// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  THEME: "theme",
  LANGUAGE: "language",
  REMEMBER_ME: "remember_me",
} as const;

// Token data interface
export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type?: string;
}

// User data interface
export interface StoredUserData {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  [key: string]: any;
}

class SecureStorageService {
  private isClient = typeof window !== "undefined";

  // Cookie helper methods
  private setCookie(name: string, value: string, days = 7): void {
    if (!this.isClient) return;
    
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    } catch (error) {
      console.error(`Error setting cookie ${name}:`, error);
    }
  }

  private getCookie(name: string): string | null {
    if (!this.isClient) return null;
    
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    } catch (error) {
      console.error(`Error getting cookie ${name}:`, error);
      return null;
    }
  }

  private removeCookie(name: string): void {
    if (!this.isClient) return;
    
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    } catch (error) {
      console.error(`Error removing cookie ${name}:`, error);
    }
  }

  // Generic storage methods - Always use localStorage
  private setItem(key: string, value: string, persistent = true): void {
    if (!this.isClient) return;
    
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }

  private getItem(key: string): string | null {
    if (!this.isClient) return null;
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  private removeItem(key: string): void {
    if (!this.isClient) return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  // Token management - Use both localStorage and cookies
  async setTokenData(tokenData: TokenData, rememberMe = true): Promise<void> {
    try {
      // Set in localStorage
      this.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token, true);
      this.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token, true);
      this.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString(), true);
      
      // Also set in cookies for middleware access
      this.setCookie('accessToken', tokenData.access_token, rememberMe ? 30 : 1);
      this.setCookie('refreshToken', tokenData.refresh_token, rememberMe ? 30 : 1);
    } catch (error) {
      console.error("Error setting token data:", error);
    }
  }

  async getAccessToken(): Promise<string | null> {
    // Try localStorage first, then cookies
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN) || this.getCookie('accessToken');
  }

  async getRefreshToken(): Promise<string | null> {
    // Try localStorage first, then cookies
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN) || this.getCookie('refreshToken');
  }

  async getRememberMe(): Promise<boolean> {
    const rememberMe = this.getItem(STORAGE_KEYS.REMEMBER_ME);
    return rememberMe === "true";
  }

  // User data management - Always use localStorage
  async setUserData(userData: StoredUserData, persistent = true): Promise<void> {
    try {
      this.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData), true);
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  }

  async getUserData(): Promise<StoredUserData | null> {
    try {
      const userData = this.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  // Theme management
  async setTheme(theme: string): Promise<void> {
    this.setItem(STORAGE_KEYS.THEME, theme, true);
  }

  async getTheme(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.THEME);
  }

  // Language management
  async setLanguage(language: string): Promise<void> {
    this.setItem(STORAGE_KEYS.LANGUAGE, language, true);
  }

  async getLanguage(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.LANGUAGE);
  }

  // Clear methods
  async clearAuthData(): Promise<void> {
    try {
      // Clear localStorage
      this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      this.removeItem(STORAGE_KEYS.USER_DATA);
      this.removeItem(STORAGE_KEYS.REMEMBER_ME);
      
      // Clear cookies
      this.removeCookie('accessToken');
      this.removeCookie('refreshToken');
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  }

  async clearAllData(): Promise<void> {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        this.removeItem(key);
      });
    } catch (error) {
      console.error("Error clearing all data:", error);
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    return !!accessToken;
  }

  // Utility methods
  async hasValidSession(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();
    return !!(accessToken && refreshToken);
  }
}

export const StorageService = new SecureStorageService();
