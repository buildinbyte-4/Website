import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'Website/**',
    'Templates/**',
    'public/templates/**',
    'merge_resolve_tmp/**',
    'next-env.d.ts',
  ]),
]);
