interface Language {
   value: string
   label: string
}

interface LanguageObject {
   [key: string]: string
}

export const languages: Language[] = [
   { value: 'en', label: 'English' },
   { value: 'es', label: 'Spanish' },
   { value: 'fr', label: 'French' },
   { value: 'de', label: 'German' },
   { value: 'zh', label: 'Chinese' },
   { value: 'ja', label: 'Japanese' },
   { value: 'hi', label: 'Hindi' },
   { value: 'ar', label: 'Arabic' },
   { value: 'ru', label: 'Russian' },
   { value: 'pt', label: 'Portuguese' },
   { value: 'bn', label: 'Bengali' },
   { value: 'pa', label: 'Punjabi' },
   { value: 'jv', label: 'Javanese' },
   { value: 'ko', label: 'Korean' },
   { value: 'vi', label: 'Vietnamese' },
   { value: 'te', label: 'Telugu' },
   { value: 'mr', label: 'Marathi' },
   { value: 'tr', label: 'Turkish' },
   { value: 'ta', label: 'Tamil' },
   { value: 'it', label: 'Italian' },
   { value: 'fa', label: 'Persian' },
   { value: 'pl', label: 'Polish' },
   { value: 'uk', label: 'Ukrainian' },
   { value: 'ro', label: 'Romanian' },
   { value: 'nl', label: 'Dutch' },
]

export const LanguageObject: LanguageObject = {
   en: 'English',
   es: 'Spanish',
   fr: 'French',
   de: 'German',
   zh: 'Chinese',
   ja: 'Japanese',
   hi: 'Hindi',
   ar: 'Arabic',
   ru: 'Russian',
   pt: 'Portuguese',
   bn: 'Bengali',
   pa: 'Punjabi',
   jv: 'Javanese',
   ko: 'Korean',
   vi: 'Vietnamese',
   te: 'Telugu',
   mr: 'Marathi',
   tr: 'Turkish',
   ta: 'Tamil',
   it: 'Italian',
   fa: 'Persian',
   pl: 'Polish',
   uk: 'Ukrainian',
   ro: 'Romanian',
   nl: 'Dutch',
}
