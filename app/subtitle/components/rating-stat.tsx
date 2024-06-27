export default function RatingStat() {
   return (
      <div> 
         <div className="grid grid-cols-[auto,1fr] gap-4 p-4">
            <div className="flex items-center justify-center p-2">
               <h2 className="text-5xl text-slate-200">4.5</h2>
            </div>
            <div className="flex flex-col justify-center space-y-4">
               <div className="h-2 rounded-md bg-slate-600/50">
                  <div className="h-full w-1/2 rounded-md bg-primary"></div>
               </div>
               <div className="h-2 rounded-md bg-slate-600/50">
                  <div className="h-full w-1/2 rounded-md bg-primary"></div>
               </div>
               <div className="h-2 rounded-md bg-slate-600/50">
                  <div className="h-full w-1/2 rounded-md bg-primary"></div>
               </div>
               <div className="h-2 rounded-md bg-slate-600/50">
                  <div className="h-full w-1/2 rounded-md bg-primary"></div>
               </div>
               <div className="h-2 rounded-md bg-slate-600/50">
                  <div className="h-full w-1/2 rounded-md bg-primary"></div>
               </div>
            </div>
         </div>
      </div>
   )
}
