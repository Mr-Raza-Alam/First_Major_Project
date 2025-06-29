// Used to access cloudinary account before access the uploaded files or images

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({// config-- means to integrate backened to cloudinary's account
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_API_KEY,
  api_secret : process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({// 
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowformats: ["png","jpg","jpeg"], // supports promises as well
  },
});

module.exports= {
    cloudinary,
    storage,
}
//  public_id: (req, file) => 'computed-filename-using-request',