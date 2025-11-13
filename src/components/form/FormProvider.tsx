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

const FormProvider = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  defaultValues,
  mode = 'onBlur',
  validationSchema,
  formType,
}: IFormProviderProps<T>) => {
  const methods = useForm<T>({
    mode,
    defaultValues,
    // Support both Zod and Yup schemas
    ...(validationSchema && {
      resolver: validationSchema._def
        ? zodResolver(validationSchema) // Zod schema
        : customYupResolver(validationSchema), // Yup schema
    }),
  })

  // Auto-scroll to first error when form is submitted with errors
  useEffect(() => {
    const { errors, isSubmitted, isSubmitSuccessful } = methods.formState

    if (isSubmitted && !isSubmitSuccessful && Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0]

      setTimeout(() => {
        scrollToError(firstErrorKey)
      }, 100)
    }
  }, [
    methods.formState.isSubmitted,
    methods.formState.isSubmitSuccessful,
    methods.formState.submitCount,
  ])

  const scrollToError = (firstErrorKey: string) => {
    let element: HTMLElement | null = null

    // 1. Try data-field attribute (for sections/cards)
    element = document.querySelector(`[data-field="${firstErrorKey}"]`)
    console.log(
      `Step 1 - Data-field [data-field="${firstErrorKey}"]:`,
      element ? '✓ Found' : '✗ Not found',
    )

    // 2. Try exact name match
    if (!element) {
      element = document.querySelector(`[name="${firstErrorKey}"]`)
      console.log('Step 2 - Exact name match:', element ? '✓ Found' : '✗ Not found')
    }

    // 3. Try by ID
    if (!element) {
      element = document.getElementById(firstErrorKey)
      console.log('Step 3 - By ID:', element ? '✓ Found' : '✗ Not found')
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
        console.log('Step 4 - First card (basic info):', element ? '✓ Found' : '✗ Not found')
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
      console.log(
        `Step 7 - Top-level array [data-field="${firstErrorKey}"]:`,
        element ? '✓ Found' : '✗ Not found',
      )
    }

    if (element) {
      console.log('✅ Found element, scrolling to:', element)
      console.log('Element details:', {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
      })

      // Get element position
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      console.log('📍 Scroll calculation:', {
        'Element top from viewport': rect.top,
        'Current scroll position': scrollTop,
        'Window height': window.innerHeight,
        'Document height': document.documentElement.scrollHeight,
      })

      // Use scrollIntoView for reliable scrolling
      console.log('🚀 Using scrollIntoView to scroll to element...')

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })

      console.log('✅ ScrollIntoView executed')

      // Highlight the element after scroll
      setTimeout(() => {
        element.style.transition = 'all 0.5s ease'
        element.style.transform = 'scale(1.02)'
        element.style.boxShadow =
          '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)'

        setTimeout(() => {
          element.style.transform = ''
          element.style.boxShadow = ''
        }, 1500)
      }, 600)

      // Try to focus first input after scrolling
      setTimeout(() => {
        const firstInput = element.querySelector('input, textarea, select') as HTMLElement
        if (firstInput && typeof firstInput.focus === 'function') {
          try {
            firstInput.focus({ preventScroll: true })
            console.log('✅ First input focused')
          } catch (e) {
            console.log('⚠️ Input not focusable')
          }
        }
      }, 800)
    } else {
      console.warn('⚠️ Could not find element for field:', firstErrorKey)
    }
  }

  const enhancedSubmit = onSubmit
    ? async (data: T) => {
        console.log('✅ Form validation passed, submitting data...')
        return onSubmit(data, methods)
      }
    : undefined

  const handleSubmit = enhancedSubmit
    ? methods.handleSubmit(enhancedSubmit, (errors) => {
        console.error('❌ Form submit blocked due to validation errors:', errors)
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
