import Head from 'next/head';
import React from 'react';

interface SeoElementProps {
  description: string;
  title: string;
  url: string;
  image: string;
  keywords: string;
}
const SeoElement = ({
  description,
  title,
  url,
  image,
  keywords,
}: SeoElementProps) => {
  const siteName = 'Doshrodeal';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${description}`} />
        <meta property="og:description" content={`${description}`} />
        <meta name="keywords" content={`${keywords}`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:site_name" content={`${siteName}`} />
        <meta property="og:image" content={`${image}`} />
        <meta name="twitter:card" content={`${image}`} />
        <meta name="twitter:label1" content="Est reading time" />
        <meta name="twitter:data1" content="10 minutes" />
        <link rel="canonical" href={`${url}`} />
      </Head>
    </>
  );
};

export default React.memo(SeoElement);
