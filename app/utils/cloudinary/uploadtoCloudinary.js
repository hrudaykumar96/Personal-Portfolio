import cloudinary from "./cloudinary";

const uploadToCloudinary = async (file) => {
    if (!file || file.size === 0 || file === 'null') {
        return Promise.resolve(null); 
    }

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    const timestamp = Date.now();
    const originalFilename = file.name;

    return new Promise(async (resolve, reject) => {
        const resourceType = file.type === 'application/pdf' ? 'raw' : 'image';
        cloudinary.uploader.upload_stream({
            resource_type: resourceType,
            folder: 'Portfolio',
            public_id: `${timestamp}${originalFilename}`,
        },
        async (err, result) => {
            if (err) {
                return reject(err.message);
            }
            return resolve(result);
        }).end(bytes);
    });
};

export default uploadToCloudinary;