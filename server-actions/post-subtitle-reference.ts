'use server'

import { Subtitle } from '@/models/subtitle'
import { Subtitle_T } from '@/types/subtitle'

export const postSubtitleReference = async (subtitle: Subtitle_T) => {
   await Subtitle.create(subtitle)
}
