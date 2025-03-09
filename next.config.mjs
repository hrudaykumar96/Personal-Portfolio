/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: process.env.NEXT_PUBLIC_LOCAL_PROTOCOL,  
            hostname: process.env.NEXT_PUBLIC_LOCAL_HOST,                
            pathname: process.env.NEXT_PUBLIC_LOCAL_PATHNAME,             
          },
        ],
      },
};

export default nextConfig;
