const fs = require('fs');
const path = require('path');

class MergeFilesPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('MergeFilesPlugin', (compilation, callback) => {
      const { sourceFile, targetFile } = this.options;
      const sourceFilePath = path.resolve(compiler.options.context, sourceFile);
      const targetFilePath = path.resolve(compiler.options.output.path, targetFile);

      fs.readFile(sourceFilePath, 'utf8', (err, sourceContent) => {
        if (err) {
          compilation.errors.push(err);
          return callback();
        }

        fs.appendFile(targetFilePath, sourceContent, 'utf8', appendErr => {
          if (appendErr) {
            compilation.errors.push(appendErr);
          }
          callback();
        });
      });
    });
  }
}

module.exports = MergeFilesPlugin;