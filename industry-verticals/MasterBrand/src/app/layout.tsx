import './globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Esteban&family=Montserrat:ital,wght@0,400;0,500;0,700;1,300&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
