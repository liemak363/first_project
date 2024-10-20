const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary config
cloudinary.config({ 
    cloud_name: process.env.Cloudinary_cloud_name, 
    api_key: process.env.Cloudinary_api_key, 
    api_secret: process.env.Cloudinary_api_secret // Click 'View API Keys' above to copy your API secret
});
// End Cloudanary config

module.exports.upload = (req, res, next) => {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.url;
        next();
    }

    upload(req);
}