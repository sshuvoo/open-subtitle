import { cn } from '@/utils/cn'

interface Props {
   children: React.ReactNode
   className?: string
}

export const LabelInputContainer = ({ children, className }: Props) => {
   return (
      <div className={cn('flex w-full flex-col space-y-2', className)}>
         {children}
      </div>
   )
}
