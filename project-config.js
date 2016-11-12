exports.VENDOR_FILES = [{
        source: "reflect-metadata",
        files: "Reflect.js"
    },
    {
        source: "systemjs",
        files: "dist/system.src.js"
    },
    {
        source: "zone.js",
        files: "dist/zone.js"
    },
    {
        source: "@angular",
        files: "**/*"
    },
    {
        source: "rxjs",
        files: "**/*"
    },
    {
        source: "core-js",
        files: "**/*"
    },
    {
        source: "nedb",
        files: "**/*"
    }
]

exports.BOWER_PACKAGES = [{
        source: "bootstrap",
        files: "dist/**/*"
    },
    {
        source: "web-animations-js",
        files: "web-animations.min.js"
    }
]

exports.SYSTEMJS = {
    paths: {
        // paths serve as alias
        'npm:': 'assets/vendor/'
    },
    // map tells the System loader where to look for things
    map: {
        // our app is within the app folder
        app: 'app',

        // Node core modules
        "fs": "@node/fs",
        "events": "@node/events",
        "crypto": "@node/crypto",
        "util": "@node/util",
        "path": "@node/path",

        //Special snowflakes
        "rxjs": "npm:rxjs"

        // Dependencies will be loaded by gulp here
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        app: {
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
}