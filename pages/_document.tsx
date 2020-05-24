import '../common/scss/main.scss';

/* eslint-disable jsdoc/require-jsdoc */
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="en" style={{ background: '#061826' }}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
