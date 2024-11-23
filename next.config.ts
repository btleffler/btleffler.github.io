import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  /**
   * Waiting for Nextjs Sass implementation to be updated
   * https://github.com/vercel/next.js/issues/71638#issuecomment-2431137842
   */
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
