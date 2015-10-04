var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-processjade';

function replaceContent(content) {
    var lines = content.split('\n');
    var result = '';
    var buildJS = false;
    var buildCSS = false;
    for(var i= 0, line; line = lines[i]; i++) {
        var matchJS = line.match(/build:js (.+)?/i);
        if(matchJS != null) {
            buildJS=true;
            result = result + line.match(/^(\s*)\S+/)[1] + "script(type='text/javascript', src='" + matchJS[1] + "')\n"
        }

        var matchCSS = line.match(/build:css (.+)?/i);
        if(matchCSS != null) {
            buildCSS=true;
            result = result + line.match(/^(\s*)\S+/)[1] + "link(rel='stylesheet', href='" + matchCSS[1] + "')\n"
        }

        if(!buildJS && !buildCSS) {
            result = result + line;
        }

        var endBuildJS = line.match(/^\s*\/\/\s+\/build\s*$/i);
        if(buildJS && endBuildJS) {
            buildJS=false;
        } else if(buildCSS && endBuildJS) {
            buildCSS=false;
        }
    }
    return result;
}

function gulpProcessJade() {

    var stream = through.obj(function(file, enc, cb) {

        if (file.isBuffer()) {
            var content = replaceContent(file.contents.toString(enc));
            file.contents = new Buffer(content, enc);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
            return cb();
        }

        this.push(file);
        cb();
    });

    return stream;
}

module.exports = gulpProcessJade;