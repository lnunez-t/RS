require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');

(async function () {
  cloudinary.config({
    cloud_name: 'di0ifatat',
    api_key:   '914831141944181',
    api_secret: 'Js0wmJnf-Y0YLLYBfi7SdUdbJJU',
  });

  const uploadResult = await cloudinary.uploader
    .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
      public_id: 'shoes',
    })
    .catch(console.error);

  console.log('Uploaded image:', uploadResult.secure_url);

  const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log('Optimized image URL:', optimizeUrl);
})();
