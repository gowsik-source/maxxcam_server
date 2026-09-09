const multer = require('multer');

const storage = multer.memoryStorage();

const fileUploadMiddleware = multer({
  storage: storage
});

module.exports = fileUploadMiddleware;