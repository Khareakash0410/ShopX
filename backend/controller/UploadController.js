const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

// cloudinary configuration-----------
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const UploadSingleFile = async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({message: "No file found!"});
  
      // function to handle upload to cloudinary------
      const streamUpload = (fileBuffer) => {
          return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(error)
                }
              });

            //   streamifier to file buffer => stream------
            streamifier.createReadStream(fileBuffer).pipe(stream);
          });
      };

    //   stream upload function calling-------------
    const result = await streamUpload(req.file.buffer);

    // upload successfully response secure url-----
    res.status(200).json({imageUrl: result.secure_url, message: "Uploaded success"});
   
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
};


module.exports = {
    UploadSingleFile,
};