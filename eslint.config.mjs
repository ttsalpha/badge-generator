import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
    ...nextConfig,
    {
        name: "badge-generator/overrides",
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "@next/next/no-img-element": "off",
        },
    },
];

export default config;
