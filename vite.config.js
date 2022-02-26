module.exports = {
  root: './',
  build: {
    outDir: 'dist',
  },
  publicDir: 'assets',
  server: {
    fs: {
      allow: ['..'],
    },
  },
};
