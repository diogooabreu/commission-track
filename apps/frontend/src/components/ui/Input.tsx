import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export function Input({
  label,
  error,
  fullWidth = false,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-tertiary mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'block rounded-sm border px-3 py-2.5 text-sm text-on-surface bg-surface',
          'placeholder:text-tertiary/60',
          'focus:outline-2 focus:outline-offset-1',
          error
            ? 'border-red-500 focus:outline-red-500'
            : 'border-[#e5e4e7] focus:outline-primary',
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} role="alert" className="block text-xs text-red-500 mt-1">
          {error}
        </span>
      )}
    </div>
  )
}
