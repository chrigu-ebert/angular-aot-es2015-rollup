#!/bin/bash
set -e

# See README.md for more explanation

# Doing all this with package scripts and so on would be more
# cross-platform, but harder to talk through when shown on the screen
# during a presentation.

# Cleanup from any past runs
rm -rf src/app/aot dist build
mkdir -p build

# AOT and TypeScript compile
node_modules/.bin/ngc

# Tree-shake bundle the results
node_modules/.bin/rollup -c

# Use Brotli, if available, to see the best-case network transfer size
if hash bro 2>/dev/null; then
  bro --input dist/js/bundle.js --output dist/js/bundle.js.br
fi

# Copy resources
mkdir -p dist/css
mkdir -p dist/img
cp -R node_modules/materialize-css/dist/css/materialize.min.css dist/css
cp -R node_modules/materialize-css/dist/fonts dist
cp -R node_modules/materialize-css/dist/js/materialize.min.js dist/js
cp -R src/css dist
cp -R src/img dist
cp -R src/index.html dist

# Remove Source Maps on Production Build
rm -rf dist/**/*.map

echo "AOT output size"
ls -l dist/js/bundle.js*
