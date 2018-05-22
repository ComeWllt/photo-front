import cloudinary from 'cloudinary-core';

const cloudinaryCore = new cloudinary.Cloudinary({  
  cloud_name: 'cloud_name', 
  api_key: 'api_key', 
  api_secret: 'api_secret' 
});

export default cloudinaryCore;