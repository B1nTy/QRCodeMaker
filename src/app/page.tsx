import { QRGenerator } from '@/components/qr/QRGenerator'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            QR Code Maker
          </h1>
          <p className="text-muted-foreground">
            Создавайте QR-коды из текста, ссылок и файлов быстро и бесплатно
          </p>
        </div>

        {/* Основной компонент */}
        <QRGenerator />
      </div>
    </div>
  );
}
