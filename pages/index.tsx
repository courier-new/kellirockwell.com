import '../common/scss/main.scss';

import Head from 'next/head';
import Link from 'next/link';
import React, { FC } from 'react';

/** Root of Index page */
const Root: FC = () => {
  return (
    <div className="container">
      <Head>
        <title>KELLI ROCKWELL | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hey there!</h1>
        <p>
          I&lsquo;m currently working on completely rebuilding my site! It&lsquo;s not
          ready yet, but you can still check out my old site in the meantime.
        </p>
        <Link href="/v1/index.html">
          <a>View old site</a>
        </Link>
      </main>

      <style jsx>
        {`
          .container {
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 100vh;
            padding: 0 0.5rem;
          }
          main {
            align-items: center;
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: center;
            max-width: 500px;
            padding: 5rem 0;
            text-align: center;
            width: 100%;
          }
        `}
      </style>

      <style jsx global>
        {`
          html,
          body {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            margin: 0;
            padding: 0;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
};

export default Root;
