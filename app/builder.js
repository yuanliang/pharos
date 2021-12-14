// const { watch } = require('chokidar')
// const { build } = require('esbuild')
// const fs = require('fs-extra')
// const { start } = require('server-reload')
import fs from 'fs-extra'
import { watch } from 'chokidar'
import { build } from 'esbuild'
import ServerReload from 'server-reload'

const { start } = ServerReload
const isDev = process.env.NODE_ENV !== 'production'

/**
 * Server Reload Params
 * @link https://www.npmjs.com/package/server-reload#usage-from-node
 */
const serverParams = {
  port: 8181, // Set the server port. Defaults to 8080.
  root: 'dist', // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  cors: true,
  // host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  proxy: {
    path: '/api',
    target: 'http://localhost:8080/api'
  } // Set proxy URLs.
  // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  // file: 'index.html' // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  // wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  // mount: [['/components', './node_modules']], // Mount a directory to a route.
  // logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}
// console.log(fs.url);

/**
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
const buildParams = {
  color: true,
  entryPoints: ['src/index.tsx'],
  loader: { '.ts': 'tsx' },
  outdir: 'dist',
  minify: !isDev,
  bundle: true,
  sourcemap: true,
  logLevel: 'error',
  incremental: true
}
// format: 'cjs',
;(async () => {
  fs.removeSync('dist')
  fs.copySync('public', 'dist')

  const builder = await build(buildParams)

  if (isDev) {
    watch('src/**/*', { ignoreInitial: true }).on('all', () => {
      builder.rebuild()
    })

    start(serverParams)
  } else {
    process.exit(0)
  }
})()
