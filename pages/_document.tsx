/* eslint-disable jsdoc/require-jsdoc */
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="en" style={{ background: '#061826' }}>
        <Head>
          <link
            as="font"
            crossOrigin=""
            href="/fonts/Karla/Karla-Regular.ttf"
            rel="preload"
          />
          <link
            as="font"
            crossOrigin=""
            href="/fonts/TitilliumWeb/TitilliumWeb-Light.ttf"
            rel="preload"
          />
          <link
            as="font"
            crossOrigin=""
            href="/fonts/TitilliumWeb/TitilliumWeb-Bold.ttf"
            rel="preload"
          />
          <link
            as="font"
            crossOrigin=""
            href="/fonts/YesevaOne/YesevaOne-Regular.ttf"
            rel="preload"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
