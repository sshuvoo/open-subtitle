export const groupBy = <T, K extends string | number | symbol>(
   array: T[] = [],
   callbackfn: (value: T) => K
): Record<K, T[]> => {
   const output: Record<K, T[]> = {} as Record<K, T[]>
   array.forEach((value) => {
      const key = callbackfn(value)
      output[key] = [...(output[key] || []), value]
   })
   return output
}
