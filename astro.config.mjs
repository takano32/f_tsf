// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ftsf.me',
  // 既存の URL（/ と /announce.html）を維持するため file 形式で出力する
  build: {
    format: 'file',
  },
});
