export const metadata = {
  title: 'My Todo PWA',
  description: 'Todo app with local backend database API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: '2rem' }}>{children}</body>
    </html>
  );
}
