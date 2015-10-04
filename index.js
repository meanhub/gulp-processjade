var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-processjade';

function replaceContent(content) {
    var lines = content.split('\n');
    var n = lines.length;
    var result = '';
    var buildJS = false;
    var line ='';
    for(var i=0; i < n; i++) {
        line = lines[i];
        var match = line.match(/build:js (.+)?/i);
        if(match != null) {
            buildJS=true;
            result = result + line.match(/^(\s*)\S+/)[1] + "script(type='text/javascript', src='" + match[1] + "')\n"
        } else if(!buildJS) {
            result = result + line;
        }
        if(buildJS) {
            var endBuildJS = line.match(/^\s*\/\/\s+\/build\s*$/i);
            if(endBuildJS) {
                buildJS=false;
            }
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