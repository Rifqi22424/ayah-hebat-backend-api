const multer = require('multer');

const getFileExtension = (file) => {
  switch (file.mimetype.split('/')[0]) {
    case 'image':
      return 'png';
    case 'video':
      return 'mp4';
    case 'audio':
      return 'mp3';
    default:
      return 'txt';
  }
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, audio, or video are allowed.'), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = getFileExtension(file);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
});
