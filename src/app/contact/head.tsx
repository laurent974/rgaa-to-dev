import { NextSeo, NextSeoProps } from 'next-seo';

import { NEXT_SEO_DEFAULT } from '../../../next-seo.config';

export default async function Head() {
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'Contact | RGAA to dev',
    description: 'Page contact',
    titleTemplate: '%s',
  };
  return <NextSeo {...updateMeta} useAppDir={true} />;
}