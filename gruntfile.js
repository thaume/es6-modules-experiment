// Inspired from the article by thomas boyt on ES6 modules
// http://www.thomasboyt.com/2013/06/21/es6-module-transpiler
module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-es6-module-transpiler");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({
    transpile: {
      amd: {
        type: 'amd',
        files: [{
          expand: true,
          cwd: 'tasks/',
          src: ['**/*.js'],
          dest: 'tmp/',
          ext: '.amd.js'
        }]
      }
    },
    concat: {
      amd: {
        src: "tmp/**/*.amd.js",
        dest: "dist/my_module.amd.js"
      }
    },
    browser: {
      dist: {
        src: ["vendor/loader.js", "dist/my_module.amd.js"],
        dest: "dist/my_module.js",
        options: {
          barename: "my_module",
          namespace: "MyModule"
        }
      }
    }
  });

  // Made by Yehuda Katz
  grunt.registerMultiTask('browser', "Export a module to the window", function() {
    var opts = this.options();
    this.files.forEach(function(f) {
      var output = ["(function(globals) {"];

      output.push.apply(output, f.src.map(grunt.file.read));

      output.push(grunt.template.process(
        'window.<%= namespace %> = requireModule("<%= barename %>");', {
        data: {
          namespace: opts.namespace,
          barename: opts.barename
        }
      }));
      output.push('})(window);');

      grunt.file.write(f.dest, grunt.template.process(output.join("\n")));
    });
  });

  grunt.registerTask("default", ["transpile", "concat:amd", "browser"]);
}
