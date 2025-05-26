'use client'

import { useState, useEffect } from 'react'
import { Download, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateQRCode, downloadQRCode, isValidUrl } from '@/utils/qr'
import { toast } from 'sonner'

type QRType = 'text' | 'url'

export function QRGenerator() {
  const [type, setType] = useState<QRType>('text')
  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  // Генерация QR-кода при изменении контента
  useEffect(() => {
    if (content.trim()) {
      generateQR()
    } else {
      setQrCode(null)
    }
  }, [content, type])

  const generateQR = async () => {
    if (!content.trim()) return

    // Валидация URL
    if (type === 'url' && !isValidUrl(content)) {
      toast.error('Введите корректный URL')
      return
    }

    setIsGenerating(true)
    try {
      const qrDataUrl = await generateQRCode(content, {
        width: 256,
        margin: 2
      })
      setQrCode(qrDataUrl)
    } catch (error) {
      toast.error('Ошибка генерации QR-кода')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!qrCode) return
    
    const filename = name.trim() || `qr-${type}-${Date.now()}.png`
    downloadQRCode(qrCode, filename)
    toast.success('QR-код сохранен')
  }

  const handleCopyLink = async () => {
    if (!content) return
    
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success('Ссылка скопирована')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Ошибка копирования')
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Форма ввода */}
      <Card>
        <CardHeader>
          <CardTitle>Создать QR-код</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Тип QR-кода */}
          <div className="space-y-2">
            <Label htmlFor="type">Тип данных</Label>
            <Select value={type} onValueChange={(value: QRType) => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Текст</SelectItem>
                <SelectItem value="url">URL-ссылка</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Название */}
          <div className="space-y-2">
            <Label htmlFor="name">Название (опционально)</Label>
            <Input
              id="name"
              placeholder="Введите название для QR-кода"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Контент */}
          <div className="space-y-2">
            <Label htmlFor="content">
              {type === 'url' ? 'URL-ссылка' : 'Текст'}
            </Label>
            {type === 'url' ? (
              <Input
                id="content"
                type="url"
                placeholder="https://example.com"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <Textarea
                id="content"
                placeholder="Введите текст для QR-кода"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
            )}
          </div>

          {/* Кнопки действий */}
          {content && (
            <div className="flex gap-2">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {copied ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copied ? 'Скопировано' : 'Копировать'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Предварительный просмотр */}
      <Card>
        <CardHeader>
          <CardTitle>Предварительный просмотр</CardTitle>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : qrCode ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="border rounded-lg"
                  width={256}
                  height={256}
                />
              </div>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Скачать QR-код
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Введите данные для генерации QR-кода
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
