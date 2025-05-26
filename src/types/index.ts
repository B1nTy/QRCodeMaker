// Типы для QR-кодов
export interface QRCode {
  id: string
  name: string
  type: 'text' | 'url' | 'file'
  content: string
  fileUrl?: string
  createdAt: Date
  expiresAt?: Date
  userId?: string
}

// Типы для файлов
export interface FileData {
  id: string
  qrCodeId: string
  filename: string
  size: number
  contentType: string
  storagePath: string
  createdAt: Date
}

// Типы для настроек приложения
export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'ru' | 'en'
  defaultQRSize: number
  storageTime: number // в днях
}

// Типы для пользователя
export interface User {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

// Типы для создания QR-кода
export interface CreateQRRequest {
  name: string
  type: 'text' | 'url' | 'file'
  content: string
  file?: File
  expiresIn?: number // в днях
}

// Опасные типы файлов
export const DANGEROUS_FILE_TYPES = [
  'vbs', 'ps1', 'reg', 'bat', 'cmd', 'dll', 'exe', 'scr', 'com', 'pif'
] as const

export type DangerousFileType = typeof DANGEROUS_FILE_TYPES[number]
