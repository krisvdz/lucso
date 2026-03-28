import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* PWA / Mobile App Feel */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lucso" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFF9F5" />
        <meta name="application-name" content="Lucso" />
        <meta name="description" content="Discover, rate and find your favorite makeup products" />

        {/* Open Graph for link previews */}
        <meta property="og:title" content="Lucso - Beauty & Makeup" />
        <meta property="og:description" content="Discover, rate and find your favorite makeup products" />
        <meta property="og:type" content="website" />

        <link rel="manifest" href="/manifest.json" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: `
          html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #F0E4EB;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Mobile-first container: cap at phone width, center on desktop */
          #root {
            max-width: 430px;
            margin: 0 auto;
            position: relative;
            background-color: #FFF9F5;
            box-shadow: 0 0 40px rgba(0,0,0,0.08);
          }

          /* On actual mobile screens, fill the whole width */
          @media (max-width: 430px) {
            #root {
              max-width: 100%;
              box-shadow: none;
            }
          }

          /* Hide scrollbars for a cleaner app feel */
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* Prevent text selection for app-like feel */
          * {
            -webkit-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          input, textarea {
            -webkit-user-select: text;
            user-select: text;
          }

          /* Smooth transitions */
          * {
            -webkit-overflow-scrolling: touch;
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
