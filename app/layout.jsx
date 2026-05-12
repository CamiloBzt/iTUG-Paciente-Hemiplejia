import './globals.css';

export const metadata = {
  title: 'iTUG Dashboard',
  description: 'Dashboard comparativo iTUG para Sofía y un grupo de control',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
