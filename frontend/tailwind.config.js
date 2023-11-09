/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                laravel: "#ef3b2d",
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        // ...
    ],
}

