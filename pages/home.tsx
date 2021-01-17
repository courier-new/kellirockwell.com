import Head from 'next/head';
import Link from 'next/link';
import React, { FC } from 'react';

import BackgroundImage from '../common/components/BackgroundImage';
import SocialLinks from '../common/components/SocialLinks';
import useDisplaySize from '../common/hooks/useDisplaySize';

/** Root of Index screen */
const Root: FC = () => {
  const [displaySize, windowWidth, windowHeight] = useDisplaySize();

  const isMobile = displaySize === 'MOBILE';

  let content: JSX.Element;

  // Default to non-mobile view to avoid apparent FOUC
  if (windowWidth && windowWidth < 320) {
    content = (
      <main className="flex-align-center padding-med" data-theme="light">
        <IntroContent isMobile />
      </main>
    );
  } else {
    let backgroundImageResize: 768 | 1024 | 1600 | undefined = 768;
    let paddingSize: 'lg' | 'med' = 'med';
    switch (displaySize) {
      case 'XLARGE':
        backgroundImageResize = undefined;
        paddingSize = 'lg';
        break;
      case 'LARGE':
        backgroundImageResize = 1600;
        paddingSize = 'lg';
        break;
      case 'MEDIUM':
        backgroundImageResize = 1024;
        paddingSize = 'lg';
        break;
      default:
        break;
    }

    content = (
      <>
        <div
          className="absolute"
          style={{
            height: windowHeight,
            left: '50%',
            marginLeft: '-50vw',
            width: '100vw',
          }}
        >
          <BackgroundImage path="homebg.jpg" resizeWidth={backgroundImageResize} />
        </div>

        <div className="z-index-top blurred flex-row flex-1 flex-justify-center flex-align-center full-width full-height">
          <main
            className={`flex-align-center padding-${paddingSize} margin-med`}
            data-theme="light"
          >
            <IntroContent isMobile={isMobile} />
          </main>
        </div>

        <style jsx>
          {`
            main {
              border-radius: ${isMobile ? '1em' : '2em'};
              max-width: 500px;
            }
            .blurred {
              backdrop-filter: blur(25px);
            }
          `}
        </style>
      </>
    );
  }

  return (
    <div
      className="flex-column flex-align-center flex-justify-center full-width padding-0"
      style={{ minHeight: windowHeight || '100vh' }}
    >
      <Head>
        <title>KELLI ROCKWELL | Home</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {content}
    </div>
  );
};

/** Content that occupies the <main> element of the Root */
const IntroContent: FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <>
    <h1 className={`text-sapphire ${isMobile ? 'margin-0' : ''}`}>
      Hey there, I&apos;m Kelli!
    </h1>
    <p>
      I&apos;m a{' '}
      <Link href="/projects">
        <a className="text-turquoise" title="See my work">
          <strong>full-stack web developer</strong>
        </a>
      </Link>{' '}
      with a penchant for type systems, state management, and effective documentation.
    </p>
    <p>
      Talk to me about using{' '}
      <a
        className="text-turquoise"
        href="https://www.typescriptlang.org/"
        title="TypeScript homepage"
      >
        <strong>TypeScript</strong>
      </a>
      , your favorite tea to pair with{' '}
      <a
        className="text-turquoise"
        href="https://en.wikipedia.org/wiki/Bubble_tea"
        title="Bubble tea on Wikipedia"
      >
        <strong>boba</strong>
      </a>
      , or whether or not there is a{' '}
      <a
        className="text-turquoise"
        href="http://isitapipelineproblem.com/"
        title="Is it a pipeline problem?"
      >
        <strong>pipeline problem</strong>
      </a>{' '}
      in tech.
    </p>
    <div
      className={`${
        isMobile ? 'margin-med-v' : 'margin-lg-top margin-med-bottom'
      } flex-row flex-wrap`}
    >
      <Link href="/about-me">
        <a className="button no-hover no-decoration text-white large karla">
          {isMobile ? 'More about me' : 'About me'}
        </a>
      </Link>
      {isMobile ? null : (
        <>
          <Link href="/projects">
            <a className="button no-hover no-decoration text-white large karla">
              Projects
            </a>
          </Link>
          <Link href="/resume">
            <a className="button no-hover no-decoration text-white large karla">Resume</a>
          </Link>
          <Link href="/conferences">
            <a className="button no-hover no-decoration text-white large karla">
              Conferences
            </a>
          </Link>
        </>
      )}
    </div>
    <SocialLinks className="text-button" size={24} />
  </>
);

export default Root;
