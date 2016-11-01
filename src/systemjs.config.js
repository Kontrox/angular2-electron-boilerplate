/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.defaultJSExtensions = true;
    System.config({
        paths: {
            // paths serve as alias
            'root:': '',
            'npm:': 'assets/vendor/',
            'nedblibs:': 'assets/vendor/nedb/node_modules/',
            '*': 'assets/vendor/*',
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'root:app',
            character: 'root:app/character',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',

            'nedb': 'nedb/index.js',
            'async': 'nedblibs:async/lib/async.js',
            'mkdirp': 'nedblibs:mkdirp/index.js',
            'underscore': 'nedblibs:underscore/index.js',
            'minimist': 'nedblibs:minimist/index.js',
            'binary-search-tree': 'nedblibs:binary-search-tree/index.js',

            // Node core modules
            "fs": "@node/fs",
            "events": "@node/events",
            "crypto": "@node/crypto",
            "util": "@node/util",
            "path": "@node/path"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            character: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
