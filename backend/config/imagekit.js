import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadImage = async (aiImgResponse, fileName) => {
    const uploadResponse = await client.files.upload({
      file: aiImgResponse.data, 
      fileName: fileName,
      folder: "aiya"
    });
} 

