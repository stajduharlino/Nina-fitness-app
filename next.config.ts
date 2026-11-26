import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Na vanjskom disku macOS stvara ._ datoteke koje kvare keš optimizatora slika.
    // Slike pripremamo unaprijed, pa optimizator ne treba. Vratiti na false kad se hostira na Vercelu.
    unoptimized: true,
  },
};

export default nextConfig;
