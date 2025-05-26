import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QRGenerator } from '../QRGenerator'

// Мокаем модуль sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Мокаем модуль qrcode
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,test'),
  },
}))

describe('QRGenerator', () => {
  it('рендерится корректно', () => {
    render(<QRGenerator />)
    
    expect(screen.getByText('Создать QR-код')).toBeInTheDocument()
    expect(screen.getByText('Предварительный просмотр')).toBeInTheDocument()
    expect(screen.getByLabelText('Тип данных')).toBeInTheDocument()
    expect(screen.getByLabelText('Название (опционально)')).toBeInTheDocument()
  })

  it('показывает правильные поля для типа "текст"', () => {
    render(<QRGenerator />)
    
    expect(screen.getByLabelText('Текст')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Введите текст для QR-кода')).toBeInTheDocument()
  })

  it('показывает правильные поля для типа "url"', async () => {
    render(<QRGenerator />)
    
    // Переключаем на URL
    const typeSelect = screen.getByLabelText('Тип данных')
    fireEvent.click(typeSelect)
    
    const urlOption = screen.getByText('URL-ссылка')
    fireEvent.click(urlOption)
    
    await waitFor(() => {
      expect(screen.getByLabelText('URL-ссылка')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument()
    })
  })

  it('генерирует QR-код при вводе текста', async () => {
    render(<QRGenerator />)
    
    const textInput = screen.getByPlaceholderText('Введите текст для QR-кода')
    fireEvent.change(textInput, { target: { value: 'Тестовый текст' } })
    
    await waitFor(() => {
      expect(screen.getByAltText('QR Code')).toBeInTheDocument()
    })
  })

  it('показывает кнопку скачивания когда QR-код сгенерирован', async () => {
    render(<QRGenerator />)
    
    const textInput = screen.getByPlaceholderText('Введите текст для QR-кода')
    fireEvent.change(textInput, { target: { value: 'Тестовый текст' } })
    
    await waitFor(() => {
      expect(screen.getByText('Скачать QR-код')).toBeInTheDocument()
    })
  })
})
