'use client'

import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  label: string
  name: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  id: string
  error?: string
  required?: boolean
  disabled?: boolean
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (
    {
      label,
      name,
      options,
      value,
      onChange,
      id,
      error,
      required,
      disabled
    },
    ref
  ) => {
    return (
      <div className="relative w-full border-none">
        <label
          htmlFor={id}
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
        >
          {label}
          {required && <span className="text-[#ef4444] flex-shrink-0">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`
              w-full appearance-none rounded-xl border border-[#2a2a3d] bg-[#12121a] pl-4 pr-10 py-3
              text-white placeholder-[#6b7280] transition-all duration-200 ease-out
              hover:bg-[#18182b] focus:border-[#6d28d9] focus:ring-2 focus:ring-[#6d28d9]/30
              focus:shadow-[0_0_0_1px_rgba(109,40,217,0.45)]
              disabled:opacity-60 disabled:cursor-not-allowed outline-none
            `}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] transition-colors duration-200"
          />
        </div>
        {error && (
          <p
            id={`${id}-error`}
            className="mt-2 flex items-center gap-1.5 text-xs text-[#ef4444]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ef4444] flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }
)

Dropdown.displayName = 'Dropdown'