import PageLoader from '@/components/loading/page-loader'

export default function Loading() {
   return (
      <div>
         <div className="container flex min-h-[calc(100vh-81px)] items-center justify-center">
            <PageLoader />
         </div>
      </div>
   )
}
