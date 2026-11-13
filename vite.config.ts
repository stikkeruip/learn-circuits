import { defineConfig, type Plugin } from 'vitest/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const circuitjs = path.resolve(root, 'circuitjs1/ts')

// CircuitJS1's About box loads a page that sits outside its public folder:
// "circuitjs/about.html" while developing, "about.html" next to the page in a build.
function circuitjsAboutPage(): Plugin {
  const source = path.join(circuitjs, 'circuitjs/about.html')
  let building = false
  return {
    name: 'circuitjs-about-page',
    configResolved(config) {
      building = config.command === 'build'
    },
    configureServer(server) {
      server.middlewares.use('/circuitjs/about.html', (_req, res) => {
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(source).pipe(res)
      })
    },
    closeBundle() {
      if (building)
        fs.cpSync(source, path.join(root, 'dist/about.html'))
    },
  }
}

export default defineConfig({
  // Several separate pages (index, sim, iframe). Unknown addresses must give
  // "not found" rather than the main page, which CircuitJS1 would then load
  // inside its own panels.
  appType: 'mpa',
  plugins: [circuitjsAboutPage()],
  // CircuitJS1's static files (example circuits, menu list, fonts, images,
  // translations) are served from the site root, straight out of the clone.
  publicDir: path.join(circuitjs, 'public'),
  resolve: {
    alias: [
      { find: /^circuitjs\//, replacement: circuitjs + '/' },
      // CircuitJS1 looks for its static files next to its own script. Ours
      // sit at the site root (publicDir above), so this one module of theirs
      // is swapped for ours. See src/sim/moduleBase.ts.
      { find: /^\.\/ModuleBase$/, replacement: path.resolve(root, 'src/sim/moduleBase.ts') },
      // url(images/...) in CircuitJS1's style.css
      { find: /^images\//, replacement: path.join(circuitjs, 'public/images') + '/' },
    ],
  },
  server: {
    port: 5180,
  },
  build: {
    rolldownOptions: {
      input: {
        index: path.resolve(root, 'index.html'),
        sim: path.resolve(root, 'sim.html'),
        iframe: path.resolve(root, 'iframe.html'),
      },
      output: {
        // CircuitJS1 looks element classes up by their runtime class name, so
        // minification must not rename them.
        minify: {
          mangle: {
            keepNames: { class: true, function: true },
          },
        },
      },
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    testTimeout: 120000,
  },
})
