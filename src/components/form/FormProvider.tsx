'use client'

import { ReactNode, useEffect } from 'react'
import {
  FormProvider as RHFFormProvider,
  useForm,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { yupResolver as customYupResolver } from '@/lib/yupResolver'

interface IFormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode
  onSubmit?: (data: T, methods?: any) => void | Promise<void>
  defaultValues?: UseFormProps<T>['defaultValues']
  mode?: UseFormProps<T>['mode']
  validationSchema?: any
  formType?: string
}

// Helper function to detect Zod schema
function isZodSchema(schema: any): boolean {
  return (
    schema &&
    (typeof schema._def !== 'undefined' ||
      typeof schema.parse === 'function' ||
      typeof schema.safeParse === 'function')
  )
}

const FormProvider = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  defaultValues,
  mode = 'onChange',
  validationSchema,
  formType,
}: IFormProviderProps<T>) => {
  const methods = useForm<T>({
    mode,
    defaultValues,
    reValidateMode: 'onChange',
    // Support both Zod and Yup schemas
    ...(validationSchema && {
      resolver: isZodSchema(validationSchema)
        ? zodResolver(validationSchema) // Zod schema
        : customYupResolver(validationSchema), // Yup schema
    }),
  })

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      methods.reset(defaultValues as T, { keepDefaultValues: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array = run once on mount

  // Auto-scroll to first error when form is submitted with errors
  useEffect(() => {
    const { errors, isSubmitted, isSubmitSuccessful } = methods.formState

    if (isSubmitted && !isSubmitSuccessful && Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0]

      setTimeout(() => {
        scrollToError(firstErrorKey)
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    methods.formState.isSubmitted,
    methods.formState.isSubmitSuccessful,
    methods.formState.submitCount,
  ])

  const scrollToError = (firstErrorKey: string) => {
    let element: HTMLElement | null = null

    // 1. Try data-field attribute (for sections/cards)
    element = document.querySelector(`[data-field="${firstErrorKey}"]`)

    // 2. Try exact name match
    if (!element) {
      element = document.querySelector(`[name="${firstErrorKey}"]`)
    }

    // 3. Try by ID
    if (!element) {
      element = document.getElementById(firstErrorKey)
    }

    // 4. For basic fields, try to find the first Card (basic info section)
    if (
      !element &&
      ['name', 'slug', 'categoryId', 'brand', 'shortDescription'].includes(firstErrorKey)
    ) {
      // Find the first Card in the form
      const cards = document.querySelectorAll('[data-field]')
      if (cards.length > 0) {
        element = cards[0] as HTMLElement
      }
    }

    // 5. Handle nested fields like "stock.quantity"
    if (!element && firstErrorKey.includes('.')) {
      const parts = firstErrorKey.split('.')
      element = document.querySelector(`[data-field="${parts[0]}"]`)
      console.log(
        `Step 5 - Parent field [data-field="${parts[0]}"]:`,
        element ? '✓ Found' : '✗ Not found',
      )

      if (!element) {
        element = document.querySelector(`[name="${parts.join('.')}"]`)
        console.log(
          `Step 5b - Full nested path [name="${parts.join('.')}"]:`,
          element ? '✓ Found' : '✗ Not found',
        )
      }
    }

    // 6. Handle array fields like "variants[0]" or "options[1]"
    if (!element && firstErrorKey.match(/\[\d+\]/)) {
      const baseField = firstErrorKey.split('[')[0]
      element = document.querySelector(`[data-field="${baseField}"]`)
      console.log(
        `Step 6 - Array field [data-field="${baseField}"]:`,
        element ? '✓ Found' : '✗ Not found',
      )
    }

    // 7. For top-level array fields like "options", "variants"
    if (!element && (firstErrorKey === 'options' || firstErrorKey === 'variants')) {
      element = document.querySelector(`[data-field="${firstErrorKey}"]`)
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })

      const elementRef = element

      setTimeout(() => {
        if (elementRef) {
          elementRef.style.transition = 'all 0.5s ease'
          elementRef.style.transform = 'scale(1.02)'
          elementRef.style.boxShadow =
            '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)'

          setTimeout(() => {
            if (elementRef) {
              elementRef.style.transform = ''
              elementRef.style.boxShadow = ''
            }
          }, 1500)
        }
      }, 600)

      // Try to focus first input after scrolling
      setTimeout(() => {
        if (elementRef) {
          const firstInput = elementRef.querySelector('input, textarea, select') as HTMLElement
          if (firstInput && typeof firstInput.focus === 'function') {
            try {
              firstInput.focus({ preventScroll: true })
            } catch (e) {
            }
          }
        }
      }, 800)
    } else {
      console.warn('⚠️ Could not find element for field:', firstErrorKey)
    }
  }

  const enhancedSubmit = onSubmit
    ? async (data: T) => {
        return onSubmit(data, methods)
      }
    : undefined

  const handleSubmit = enhancedSubmit
    ? methods.handleSubmit(enhancedSubmit, (errors) => {
      })
    : undefined

  return (
    <RHFFormProvider {...methods}>
      {handleSubmit ? (
        <form onSubmit={handleSubmit} noValidate>
          {children}
        </form>
      ) : (
        children
      )}
    </RHFFormProvider>
  )
}

export default FormProvider
