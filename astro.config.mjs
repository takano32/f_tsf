// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages のプロジェクトページ（takano32.github.io/f_tsf/）で配信する
  site: 'https://takano32.github.io',
  base: '/f_tsf',
  // 既存の URL（index.html / announce.html）を維持するため file 形式で出力する
  build: {
    format: 'file',
  },
});
