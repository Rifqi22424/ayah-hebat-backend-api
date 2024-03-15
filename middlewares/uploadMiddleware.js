const multer = require('./multerConfig'); 

const uploadMiddleware = multer.fields([
  { name: 'file1', maxCount: 1 }, 
  { name: 'file2', maxCount: 1 }, 
  { name: 'file3', maxCount: 1 }, 
]);

const uploadPhotoMiddleware = multer.single('photo');

module.exports = {uploadMiddleware, uploadPhotoMiddleware};