// mergeFilesPlugin.js
import fs from 'fs';
import path from 'path';

export default function mergeFilesPlugin(options) {
  return {
    name: 'merge-files-plugin',
    generateBundle(outputOptions) {
      const { sourceFile, targetFile } = options;
      const sourceFilePath = path.resolve(process.cwd(), sourceFile);
      const outputDir = outputOptions.dir || path.dirname(outputOptions.file);
      const targetFilePath = path.resolve(outputDir, targetFile);

      try {
        const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
        fs.appendFileSync(targetFilePath, sourceContent, 'utf8');
      } catch (err) {
        this.error(`Error in mergeFilesPlugin: ${err.message}`);
      }
    },
  };
}
