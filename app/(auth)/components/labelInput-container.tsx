import { cn } from '@/utils/cn'

interface Props {
   children: React.ReactNode
   className?: string
   error?: string
}

export const LabelInputContainer = ({ children, error, className }: Props) => {
   return (
      <div className={cn('flex w-full flex-col space-y-2', className)}>
         {children}
         {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
   )
}
