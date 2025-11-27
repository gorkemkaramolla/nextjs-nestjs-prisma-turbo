module.exports = {
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    'build/',
  ],
};
