import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="A website listing my programming courses"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="keywords"
            content="programming courses, coding, development, learning"
          />
          <meta name="author" content="encodedCoder" />
          <meta property="og:title" content="encodedCoder · Courses" />
          <meta
            property="og:description"
            content="A website listing my programming courses"
          />
          <meta property="og:url" content="http://encodedcoder.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://encodedcoder.com/images/encodedcoder.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="encodedCoder · Courses" />
          <meta
            name="twitter:description"
            content="A website listing my programming courses"
          />
          <meta
            name="twitter:image"
            content="https://encodedcoder.com/images/encodedcoder.png"
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8FXS9XD10B"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8FXS9XD10B');
            `}
          </Script>
          <Script
            id="google-seo"
            type="application/ld+json"
            strategy="afterInteractive"
          >
            {`
              {
                "@context": "https://schema.org",
                "@type": "Website",
                "name": "encodedCoder",
                "url": "http://encodedcoder.com",
                "image": "https://encodedcoder.com/images/encodedcoder.png",
                "description": "A website listing my programming courses",
                "author": {
                  "@type": "Person",
                  "name": "encodedCoder"
                }
              }
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
