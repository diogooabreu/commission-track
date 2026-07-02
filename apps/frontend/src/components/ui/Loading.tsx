interface LoadingProps {
  message?: string
}

export function Loading({ message }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <span className="inline-block w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      {message && (
        <p className="text-sm text-tertiary">{message}</p>
      )}
    </div>
  )
}
