const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const util = require('util');
const compressWithBrotli = util.promisify(zlib.brotliCompress);
const compressWithGzip = util.promisify(zlib.gzip);

console.log('Compressing files..');
const getFiles = function(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(file => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      const filePath = path.join(dirPath, '/', file);
      if (['.js', '.html', '.css'].includes(path.extname(filePath))) {
        arrayOfFiles.push(filePath);
      }
    }
  });
  return arrayOfFiles;
};

const compressFile = async file => {
  const buffer = fs.readFileSync(file);

  const brotliOptions = {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY
    }
  };
  const gzipOptions = {
    level: zlib.constants.Z_BEST_COMPRESSION
  };

  const [compressedFileBrotli, compressedFileGzip] = await Promise.all([
    compressWithBrotli(buffer, brotliOptions),
    compressWithGzip(buffer, gzipOptions)
  ]);

  fs.writeFileSync(file + '.gz', compressedFileGzip);
  fs.writeFileSync(file + '.br', compressedFileBrotli);
};

const files = getFiles(path.join(__dirname, '/build'));
files.forEach(file => {
  compressFile(file);
});

console.log('Files compressed');
