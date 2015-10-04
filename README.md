# gulp-processjade

UNDER DEVELOPMENT. PLEASE DO NOT USE THIS YET !!

Gulp plugin to process/transform jade files. This is based on similar linees as Adam Timberlake's [gulp-processhtml](https://github.com/Wildhoney/gulp-processhtml)

![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat)

* **npm:** `npm install gulp-processjade --save-dev`

## Gulpfile

```js
var gulp = require('gulp'),
    processjade = require('gulp-processjade')
    opts = { /* plugin options */ };

gulp.task('default', function () {
    return gulp.src('./*.jade')
               .pipe(processjade(opts))
               .pipe(gulp.dest('dist'));
});
```

## Example Usage

You might need to change some attributes in your jade, when you're releasing
for a different environment.

Using this plugin, you can transform this:

```
doctype html
html
  head
    // build:css style.min.css
    link(rel='stylesheet', href='css/style.css')
    // /build
  body
    // build:js app.min.js
    script(src='app.js')
    // /build
    // build:remove
    script(src='http://192.168.0.1:35729/livereload.js?snipver=1')
    // /build
    // build:replace 'Goodbye Livereload...'
    script(src='http://192.168.0.1:35729/livereload.js?snipver=1')
    // /build
```

To this:

```
doctype html
html
  head
    link(rel='stylesheet', href='style.min.css')
  body
    script(src='app.min.js')
    |   Goodbye Livereload...

```

## Credits

[Denis Ciccale](https://twitter.com/tdecs)
[Adam Timberlake](https://github.com/Wildhoney)