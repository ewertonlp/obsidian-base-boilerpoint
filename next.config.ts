import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // O tema 'github-dark' ou 'one-dark-pro' combina perfeitamente com o Obsidian Base
  theme: 'github-dark',
  keepBackground: false, // Permite que usemos o fundo do nosso próprio design system
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Diz ao Next.js para aceitar arquivos .mdx como rotas válidas
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);