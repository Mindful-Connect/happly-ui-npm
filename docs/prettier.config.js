/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  tabWidth: 2,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/tailwind.css',
}
