/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**.fl.yelpcdn.com",
                port: "",
                pathname: "/bphoto/**"
            }
        ]
    }
};

export default nextConfig;
