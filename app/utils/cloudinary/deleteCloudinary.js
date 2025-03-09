import cloudinary from "./cloudinary";

const deleteUploadFile = async(publicId, resourceType)=>{
    const type = resourceType === 'raw' ? 'raw' : 'image';
    await cloudinary.uploader.destroy(publicId, { resource_type: type });
};

export default deleteUploadFile;