#!/bin/bash
set -e

# Doing all this with package scripts and so on would be more
# cross-platform, but harder to talk through when shown on the screen
# during a presentation.

# Cleanup from any past runs
echo "aot-build> cleanup"
rm -rf src/aot dist build
mkdir -p build

# AOT and TypeScript compile
echo "aot-build> ngc"
node_modules/.bin/ngc

# Webpack Build
echo "aot-build> webpack build"
node_modules/.bin/webpack --config config/webpack.prod.js --progress --profile --bail

echo "aot-build> copy css crap"
mkdir -p build/css
cp -R src/css build

# Tree-shake bundle the results
echo "aot-build> rollup"
# node --max-old-space-size=8192 node_modules/.bin/rollup -c
node_modules/.bin/rollup -c

# Override old js files
echo "aot-build> override js files"
cp dist/js/bundle.js dist/app.js
> dist/polyfills.js
> dist/vendor.js
rm dist/js/bundle.js