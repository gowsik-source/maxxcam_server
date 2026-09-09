const cloudinary = require('cloudinary').v2;
const cloudinaryHelper = new Object();
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

cloudinaryHelper.create = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderName
            },
            (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
        );
        stream.end(buffer);
    });
};

cloudinaryHelper.update = (buffer, publicId) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                overwrite: true
            },
            (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        stream.end(buffer);
    });
};

cloudinaryHelper.delete = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: "image",
                type: "upload",
                invalidate: true
            },
            (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );
    });
};

module.exports = cloudinaryHelper;