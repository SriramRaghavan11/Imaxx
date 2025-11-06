// IMAX/src/services/cloudinary.js

const CLOUD_NAME = "dfmtazecg"; // Your Cloudinary cloud name

/**
 * Generate optimized Cloudinary URL for images
 */
export const getImageUrl = (publicId, options = {}) => {
    const {
        width = "auto",
        height = "auto",
        crop = null,
        quality = "auto",
        format = "auto",
    } = options;

    let transformations = `f_${format},q_${quality}`;

    if (width !== "auto") transformations += `,w_${width}`;
    if (height !== "auto") transformations += `,h_${height}`;
    if (crop) transformations += `,c_${crop}`;

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

/**
 * Generate optimized Cloudinary URL for videos
 */
export const getVideoUrl = (publicId, options = {}) => {
    const {
        quality = "auto",
        format = "auto",
    } = options;

    const transformations = `f_${format},q_${quality}`;

    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
};

export default { getImageUrl, getVideoUrl };