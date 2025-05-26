import QRCode from 'qrcode'
import { DANGEROUS_FILE_TYPES, type DangerousFileType } from '@/types'

/**
 * Генерирует QR-код в виде Data URL
 */
export async function generateQRCode(
  text: string,
  options: {
    width?: number
    margin?: number
    color?: {
      dark?: string
      light?: string
    }
  } = {}
): Promise<string> {
  const defaultOptions = {
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  }

  const qrOptions = { ...defaultOptions, ...options }

  try {
    return await QRCode.toDataURL(text, qrOptions)
  } catch (error) {
    console.error('Ошибка генерации QR-кода:', error)
    throw new Error('Не удалось сгенерировать QR-код')
  }
}

/**
 * Скачивает QR-код как изображение
 */
export function downloadQRCode(dataUrl: string, filename: string = 'qrcode.png'): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Проверяет, является ли файл потенциально опасным
 */
export function isDangerousFile(filename: string): boolean {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? DANGEROUS_FILE_TYPES.includes(extension as DangerousFileType) : false
}

/**
 * Форматирует размер файла в читаемый вид
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Б'
  
  const k = 1024
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Валидирует URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Генерирует уникальный ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}
