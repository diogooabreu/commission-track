import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, hover = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-surface rounded-md p-6 shadow-card',
        hover ? 'hover:shadow-card-hover transition-shadow' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
