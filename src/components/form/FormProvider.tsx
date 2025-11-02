'use client'

import { ReactNode } from 'react'
import {
  FormProvider as RHFFormProvider,
  useForm,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
  mode = 'onChange',
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
        : async (data, context, options) => {
            // Yup schema
            try {
              const validData = await validationSchema.validate(data, { abortEarly: false })
              return {
                values: validData,
                errors: {},
              }
            } catch (error: any) {
              const fieldErrors: any = {}

              if (error.inner) {
                error.inner.forEach((err: any) => {
                  if (err.path) {
                    fieldErrors[err.path] = {
                      type: 'validation',
                      message: err.message,
                    }
                  }
                })
              }

              return {
                values: {},
                errors: fieldErrors,
              }
            }
          },
    }),
  })

  const enhancedSubmit = onSubmit
    ? (data: T) => {
        // Pass form methods along with data for validation error handling
        return onSubmit(data, methods)
      }
    : undefined

  const handleSubmit = enhancedSubmit ? methods.handleSubmit(enhancedSubmit) : undefined

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
