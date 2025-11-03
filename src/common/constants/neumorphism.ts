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
 * Tạo box-shadow string cho Trust Badge với màu cụ thể
 */
function createTrustBadgeShadowString(config: NeumorphismConfig, theme: Theme): string {
  const { darkShadow, lightShadow } = config

  if (theme === 'light') {
    // Light mode: Shadow nhẹ hơn với màu #d9d9d9 nhưng opacity thấp hơn
    // Sử dụng rgba để control opacity tốt hơn
    const darkColor = `rgba(217, 217, 217, ${darkShadow.opacity})`
    return [
      `${darkShadow.offsetX}px ${darkShadow.offsetY}px ${darkShadow.blur}px ${darkColor}`,
      `${lightShadow.offsetX}px ${lightShadow.offsetY}px ${lightShadow.blur}px rgba(255, 255, 255, ${lightShadow.opacity})`,
    ].join(', ')
  } else {
    // Dark mode: Shadow rõ hơn để tạo độ tương phản
    return [
      `${darkShadow.offsetX}px ${darkShadow.offsetY}px ${darkShadow.blur}px rgba(0, 0, 0, ${darkShadow.opacity})`,
      `${lightShadow.offsetX}px ${lightShadow.offsetY}px ${lightShadow.blur}px rgba(255, 255, 255, ${lightShadow.opacity})`,
    ].join(', ')
  }
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

/**
 * Cấu hình Neumorphism cho Trust Badges (Light mode)
 * Border-radius: 50px, background: #ffffff
 * Shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff
 */
export const LIGHT_NEUMORPHISM_TRUST_BADGE: NeumorphismConfig = {
  darkShadow: {
    offsetX: 20,
    offsetY: 20,
    blur: 60,
    opacity: 0.15, // Giảm opacity để shadow nhẹ hơn, dễ nhìn hơn
  },
  lightShadow: {
    offsetX: -20,
    offsetY: -20,
    blur: 60,
    opacity: 1, // #ffffff
  },
  insetDark: {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    opacity: 0,
  },
  insetLight: {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    opacity: 0,
  },
}

/**
 * Cấu hình Neumorphism cho Trust Badges (Dark mode)
 */
export const DARK_NEUMORPHISM_TRUST_BADGE: NeumorphismConfig = {
  darkShadow: {
    offsetX: 20,
    offsetY: 20,
    blur: 60,
    opacity: 0.3, // Giảm opacity để shadow không quá tối, không bị chìm
  },
  lightShadow: {
    offsetX: -20,
    offsetY: -20,
    blur: 60,
    opacity: 0.35, // Tăng highlight để tạo độ tương phản tốt hơn
  },
  insetDark: {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    opacity: 0,
  },
  insetLight: {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    opacity: 0,
  },
}

/**
 * Cấu hình Neumorphism cho Header (Light mode)
 * Shadow top giảm để không đổ quá nhiều ở phần trên
 */
export const LIGHT_NEUMORPHISM_HEADER: NeumorphismConfig = {
  darkShadow: {
    offsetX: 8,
    offsetY: 8,
    blur: 16,
    opacity: 0.1,
  },
  lightShadow: {
    offsetX: -8,
    offsetY: -4, // Giảm offsetY từ -8 xuống -4 để shadow top không đổ quá nhiều
    blur: 16,
    opacity: 0.3, // Giảm opacity từ 0.7 xuống 0.3 để shadow top nhẹ hơn
  },
  insetDark: {
    offsetX: 2,
    offsetY: 2,
    blur: 4,
    opacity: 0.05,
  },
  insetLight: {
    offsetX: -2,
    offsetY: -1, // Giảm offsetY để inset shadow top nhẹ hơn
    blur: 4,
    opacity: 0.5, // Giảm opacity từ 0.9 xuống 0.5
  },
}

/**
 * Cấu hình Neumorphism cho Header (Dark mode)
 * Shadow top giảm để không đổ quá nhiều ở phần trên
 */
export const DARK_NEUMORPHISM_HEADER: NeumorphismConfig = {
  darkShadow: {
    offsetX: 8,
    offsetY: 8,
    blur: 16,
    opacity: 0.2,
  },
  lightShadow: {
    offsetX: -8,
    offsetY: -4, // Giảm offsetY từ -8 xuống -4 để shadow top không đổ quá nhiều
    blur: 16,
    opacity: 0.06, // Giảm opacity từ 0.12 xuống 0.06 để shadow top nhẹ hơn
  },
  insetDark: {
    offsetX: 2,
    offsetY: 2,
    blur: 4,
    opacity: 0.1,
  },
  insetLight: {
    offsetX: -2,
    offsetY: -1, // Giảm offsetY để inset shadow top nhẹ hơn
    blur: 4,
    opacity: 0.08, // Giảm opacity từ 0.12 xuống 0.08
  },
}

/**
 * Lấy Neumorphism shadow cho Trust Badges theo theme
 * @param theme - 'light' hoặc 'dark'
 * @returns Box-shadow CSS string
 */
export function getNeumorphismTrustBadgeShadow(theme: Theme): string {
  const config = theme === 'dark' ? DARK_NEUMORPHISM_TRUST_BADGE : LIGHT_NEUMORPHISM_TRUST_BADGE
  return createTrustBadgeShadowString(config, theme)
}

/**
 * Lấy Neumorphism shadow cho Header theo theme
 * Shadow top giảm để không đổ quá nhiều ở phần trên
 * @param theme - 'light' hoặc 'dark'
 * @returns Box-shadow CSS string
 */
export function getNeumorphismHeaderShadow(theme: Theme): string {
  const config = theme === 'dark' ? DARK_NEUMORPHISM_HEADER : LIGHT_NEUMORPHISM_HEADER
  return createShadowString(config)
}

/**
 * Text shadow styles cho hiệu ứng nổi khối 3D
 */
export interface TextEmbossConfig {
  /** Shadow tối đổ xuống dưới */
  darkShadow: {
    offsetX: number
    offsetY: number
    blur: number
    opacity: number
  }
  /** Highlight sáng ở trên */
  lightHighlight: {
    offsetX: number
    offsetY: number
    blur: number
    opacity: number
  }
}

/**
 * Cấu hình text emboss cho Light mode
 */
export const LIGHT_TEXT_EMBOSS: TextEmbossConfig = {
  darkShadow: {
    offsetX: 2,
    offsetY: 2,
    blur: 0,
    opacity: 0.15,
  },
  lightHighlight: {
    offsetX: -1,
    offsetY: -1,
    blur: 0,
    opacity: 0.3,
  },
}

/**
 * Cấu hình text emboss cho Dark mode (đơn giản, không màu mè)
 */
export const DARK_TEXT_EMBOSS: TextEmbossConfig = {
  darkShadow: {
    offsetX: 3,
    offsetY: 3,
    blur: 0,
    opacity: 0.5,
  },
  lightHighlight: {
    offsetX: -1,
    offsetY: -1,
    blur: 0,
    opacity: 0.15,
  },
}

/**
 * Tạo text-shadow string cho hiệu ứng nổi khối
 */
function createTextEmbossShadow(config: TextEmbossConfig): string {
  const { darkShadow, lightHighlight } = config

  return `${darkShadow.offsetX}px ${darkShadow.offsetY}px ${darkShadow.blur}px rgba(0, 0, 0, ${darkShadow.opacity}), ${lightHighlight.offsetX}px ${lightHighlight.offsetY}px ${lightHighlight.blur}px rgba(255, 255, 255, ${lightHighlight.opacity})`
}

/**
 * Lấy text-shadow string cho hiệu ứng nổi khối theo theme
 * @param theme - 'light' hoặc 'dark'
 * @returns Text-shadow CSS string
 */
export function getTextEmbossShadow(theme: Theme): string {
  const config = theme === 'dark' ? DARK_TEXT_EMBOSS : LIGHT_TEXT_EMBOSS
  return createTextEmbossShadow(config)
}

/**
 * Lấy text emboss config theo theme
 * @param theme - 'light' hoặc 'dark'
 * @returns TextEmbossConfig object
 */
export function getTextEmbossConfig(theme: Theme): TextEmbossConfig {
  return theme === 'dark' ? DARK_TEXT_EMBOSS : LIGHT_TEXT_EMBOSS
}

/**
 * Tạo custom text emboss shadow từ config
 * @param config - Custom TextEmbossConfig
 * @returns Text-shadow CSS string
 */
export function createCustomTextEmbossShadow(config: TextEmbossConfig): string {
  return createTextEmbossShadow(config)
}

