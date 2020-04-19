import React, { FC } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import '../common/scss/main.scss';
import '../common/scss/theme.scss';

const Root: FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/about-me">
          <a>Go to About Me</a>
        </Link>
      </main>
    </div>
  );
};

export default Root;
