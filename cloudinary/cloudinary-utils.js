// cloudinary/cloudinary-utils.js

// Use this file to optimize Cloudinary URLs in your components

const CLOUD_NAME = "your_cloud_name"; // Replace with your actual cloud name

/**
 * Generate optimized Cloudinary URL for images
 * @param {string} publicId - Cloudinary public ID or full URL
 * @param {Object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getImageUrl = (publicId, options = {}) => {
    const {
        width = "auto",
        height = "auto",
        crop = null,
        quality = "auto",
        format = "auto",
    } = options;

    // If the input is already a full Cloudinary URL, extract just the public ID part
    if (publicId.includes('cloudinary.com')) {
        const urlParts = publicId.split('/upload/');
        if (urlParts.length > 1) {
            publicId = urlParts[1];
        }
    }

    let transformations = `f_${format},q_${quality}`;

    if (width !== "auto") transformations += `,w_${width}`;
    if (height !== "auto") transformations += `,h_${height}`;
    if (crop) transformations += `,c_${crop}`;

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

/**
 * Generate optimized Cloudinary URL for videos
 * @param {string} publicId - Cloudinary public ID or full URL
 * @param {Object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getVideoUrl = (publicId, options = {}) => {
    const {
        quality = "auto",
        format = "auto",
    } = options;

    // If the input is already a full Cloudinary URL, extract just the public ID part
    if (publicId.includes('cloudinary.com')) {
        const urlParts = publicId.split('/upload/');
        if (urlParts.length > 1) {
            publicId = urlParts[1];
        }
    }

    const transformations = `f_${format},q_${quality}`;

    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
};

export default { getImageUrl, getVideoUrl };