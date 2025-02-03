import "@/styles/globals.css"
import { CartProvider } from '@/contexts/CartContext'
import Script from "next/script"


export const metadata = {
    title: 'Hotel del Sur',
    description: 'Hotel del Sur',
    url: '',
    image: '/assets/images/logo.png'
}

const RootLayout = ({children}) => {
  return (
    <html lang="es">
        <head>
            <title>{metadata.title}</title>
            <link rel="icon" type="image/png+xml" href="/assets/images/logo.png" />
            <meta name="description" content={metadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:url" content={metadata.url} />
            <meta name="keywords" content="hotel, belize "></meta>  
            {/* Google Analytics */}
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-FN3DRT8MFF"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-FN3DRT8MFF');
              `}
            </Script>
        </head>
        <body>
            <main className='app'>
                <CartProvider>
                  {children}
                </CartProvider>
            </main>
        </body>
    </html>
  )
}

export default RootLayout