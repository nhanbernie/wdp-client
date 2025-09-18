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

  // Generic storage methods
  private setItem(key: string, value: string, persistent = false): void {
    if (!this.isClient) return;
    
    try {
      if (persistent) {
        localStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }

  private getItem(key: string): string | null {
    if (!this.isClient) return null;
    
    try {
      return localStorage.getItem(key) || sessionStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  private removeItem(key: string): void {
    if (!this.isClient) return;
    
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  // Token management
  async setTokenData(tokenData: TokenData, rememberMe = false): Promise<void> {
    try {
      this.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token, rememberMe);
      this.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token, rememberMe);
      this.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString(), true);
    } catch (error) {
      console.error("Error setting token data:", error);
    }
  }

  async getAccessToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async getRememberMe(): Promise<boolean> {
    const rememberMe = this.getItem(STORAGE_KEYS.REMEMBER_ME);
    return rememberMe === "true";
  }

  // User data management
  async setUserData(userData: StoredUserData, persistent = false): Promise<void> {
    try {
      this.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData), persistent);
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
      this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      this.removeItem(STORAGE_KEYS.USER_DATA);
      this.removeItem(STORAGE_KEYS.REMEMBER_ME);
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
