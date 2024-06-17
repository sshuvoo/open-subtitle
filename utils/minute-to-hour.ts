export const minuteToHour = (minutes: number): string => {
   let h: number
   let m: number
   if (minutes >= 60) {
      h = Math.trunc(minutes / 60)
      m = minutes - h * 60
      return `${h}h ${m}m`
   }
   return `${minutes}m`
}
