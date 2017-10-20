import nodeResolve from 'rollup-plugin-node-resolve-angular';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-only';

export default {
    entry: 'build/main.aot.js', // entry point for the application
    dest: 'dist/js/bundle.js',
    sourceMap: false,
    useStrict: false,
    format: 'iife', // ready-to-execute form, to put on a page
    onwarn: function (warning) {
        // Skip certain warnings
        if (warning.code === 'THIS_IS_UNDEFINED') { return; }
        console.warn(warning.message);
    },
    plugins: [
      //sourcemaps(), // currently makes it crash
      nodeResolve({
        es2015: true,  // Use new Angular es2015.
        module: false, // skip the ES5-in-ES2015 modules we aren't using.
        browser: true  // Not needed for this example, needed for certain libs
      }),
      commonjs({
        // make it possible to find these individual intra-package files
        include: [
          'node_modules/core-js/**',
          'node_modules/zone.js/**',
          'node_modules/rxjs/**',
          'node_modules/angular-2-local-storage/**'
        ]
      }),
      css({ output: 'build/bundle.css' }), // just redirect the css-output to somewhere else, we take the webpack one
      buble({ transforms: { dangerousForOf: true } }),
      uglify()
    ]
}
