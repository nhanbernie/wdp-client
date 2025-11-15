import { FieldError, FieldErrors } from 'react-hook-form'

/**
 * Custom Yup resolver for react-hook-form
 * Converts Yup validation errors to react-hook-form format with proper nested structure
 */
export const yupResolver = (schema: any) => {
  return async (data: any, context: any, options: any) => {
    try {
      // Validate data with Yup
      const validData = await schema.validate(data, { abortEarly: false })

      return {
        values: validData,
        errors: {},
      }
    } catch (error: any) {

      const fieldErrors: FieldErrors = {}

      if (error.inner && Array.isArray(error.inner)) {

        error.inner.forEach((err: any) => {
          if (!err.path) return


          // Split path into parts: "variants[0].sku" -> ["variants", "0", "sku"]
          const pathParts = err.path.split(/[\.\[\]]/).filter(Boolean)

          // Build nested error structure
          let current: any = fieldErrors

          pathParts.forEach((part: string, index: number) => {
            const isLast = index === pathParts.length - 1
            const isArrayIndex = !isNaN(Number(part))
            const arrayIndex = isArrayIndex ? parseInt(part) : null

            if (isLast) {
              // Last part: set the error
              if (arrayIndex !== null && Array.isArray(current)) {
                current[arrayIndex] = {
                  type: err.type || 'validation',
                  message: err.message,
                }
              } else {
                current[part] = {
                  type: err.type || 'validation',
                  message: err.message,
                }
              }
            } else {
              // Middle part: create nested structure
              const nextPart = pathParts[index + 1]
              const nextIsArrayIndex = !isNaN(Number(nextPart))

              if (arrayIndex !== null) {
                // Current part is array index
                if (!Array.isArray(current)) {
                  console.warn(`Expected array at path but found:`, typeof current)
                  return
                }

                if (!current[arrayIndex]) {
                  current[arrayIndex] = nextIsArrayIndex ? [] : {}
                }
                current = current[arrayIndex]
              } else {
                // Current part is object key
                if (!current[part]) {
                  current[part] = nextIsArrayIndex ? [] : {}
                }
                current = current[part]
              }
            }
          })
        })
      }

      return {
        values: {},
        errors: fieldErrors,
      }
    }
  }
}
