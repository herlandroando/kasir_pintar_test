/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT"

export default withMT({
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
})

