/**
 * Neumorphism shadow styles
 * Tạo hiệu ứng Neumorphism với shadow đa lớp
 */

export type Theme = 'light' | 'dark'

/**
 * Neumorphism shadow configuration
 */
export interface NeumorphismConfig {
  /** Shadow offset và blur cho shadow tối (đổ xuống) */
  darkShadow: {
    offsetX: number
    offsetY: number
    blur: number
    opacity: number
  }
  /** Shadow offset và blur cho shadow sáng (đổ lên) */
  lightShadow: {
    offsetX: number
    offsetY: number
    blur: number
    opacity: number
  }
  /** Inset shadow tối bên trong */
  insetDark: {
    offsetX: number
    offsetY: number
    blur: number
    opacity: number
  }
  /** Inset shadow sáng bên trong */
  insetLight: {
    offsetX: number
    offsetY: number
    blur: number
    opacity: number
  }
}

/**
 * Cấu hình shadow cho Light mode
 */
export const LIGHT_NEUMORPHISM: NeumorphismConfig = {
  darkShadow: {
    offsetX: 8,
    offsetY: 8,
    blur: 16,
    opacity: 0.1,
  },
  lightShadow: {
    offsetX: -8,
    offsetY: -8,
    blur: 16,
    opacity: 0.7,
  },
  insetDark: {
    offsetX: 2,
    offsetY: 2,
    blur: 4,
    opacity: 0.05,
  },
  insetLight: {
    offsetX: -2,
    offsetY: -2,
    blur: 4,
    opacity: 0.9,
  },
}

/**
 * Cấu hình shadow cho Dark mode (đã tăng sáng)
 */
export const DARK_NEUMORPHISM: NeumorphismConfig = {
  darkShadow: {
    offsetX: 8,
    offsetY: 8,
    blur: 16,
    opacity: 0.2,
  },
  lightShadow: {
    offsetX: -8,
    offsetY: -8,
    blur: 16,
    opacity: 0.12,
  },
  insetDark: {
    offsetX: 2,
    offsetY: 2,
    blur: 4,
    opacity: 0.1,
  },
  insetLight: {
    offsetX: -2,
    offsetY: -2,
    blur: 4,
    opacity: 0.12,
  },
}

/**
 * Tạo box-shadow string từ config
 */
function createShadowString(config: NeumorphismConfig): string {
  const { darkShadow, lightShadow, insetDark, insetLight } = config

  return [
    `${darkShadow.offsetX}px ${darkShadow.offsetY}px ${darkShadow.blur}px rgba(0, 0, 0, ${darkShadow.opacity})`,
    `${lightShadow.offsetX}px ${lightShadow.offsetY}px ${lightShadow.blur}px rgba(255, 255, 255, ${lightShadow.opacity})`,
    `inset ${insetDark.offsetX}px ${insetDark.offsetY}px ${insetDark.blur}px rgba(0, 0, 0, ${insetDark.opacity})`,
    `inset ${insetLight.offsetX}px ${insetLight.offsetY}px ${insetLight.blur}px rgba(255, 255, 255, ${insetLight.opacity})`,
  ].join(', ')
}

/**
 * Lấy neumorphism shadow string theo theme
 * @param theme - 'light' hoặc 'dark'
 * @returns Box-shadow CSS string
 */
export function getNeumorphismShadow(theme: Theme): string {
  const config = theme === 'dark' ? DARK_NEUMORPHISM : LIGHT_NEUMORPHISM
  return createShadowString(config)
}

/**
 * Lấy neumorphism config theo theme để custom
 * @param theme - 'light' hoặc 'dark'
 * @returns NeumorphismConfig object
 */
export function getNeumorphismConfig(theme: Theme): NeumorphismConfig {
  return theme === 'dark' ? DARK_NEUMORPHISM : LIGHT_NEUMORPHISM
}

/**
 * Tạo custom neumorphism shadow từ config
 * @param config - Custom NeumorphismConfig
 * @returns Box-shadow CSS string
 */
export function createCustomNeumorphismShadow(config: NeumorphismConfig): string {
  return createShadowString(config)
}

