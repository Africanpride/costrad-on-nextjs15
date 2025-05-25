/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "scholars-endangered-gzip-powerful.trycloudflare.com",
    "*.local-origin.dev",
    "localhost",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // If used elsewhere
        pathname: "/**",
      },
    ],
  },
  // add redirects for old URLs
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      }
     
    ];
  },
};

module.exports = nextConfig;
