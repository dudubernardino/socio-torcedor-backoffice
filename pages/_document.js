import Document, { Html, Head, Main, NextScript } from 'next/document'

class DashDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/socio-torcedor-logo.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/socio-torcedor-logo.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/socio-torcedor-logo.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body className="antialiased bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DashDocument
