// cloudinary/migrateToCloudinary.js

import cloudinary from './cloudinaryConfig.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Define paths to scan for media files
const mediaPaths = [
    path.join(__dirname, '../public/images'),
    path.join(__dirname, '../public/resources'),
    path.join(__dirname, '../src/assets/images')
];

// Track migration statistics
const migrationStats = {
    totalFiles: 0,
    uploadedFiles: 0,
    failedFiles: 0
};

/**
 * Scan directory for media files
 */
const scanDirectory = (dir, fileList = []) => {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                // Recursively scan subdirectories
                scanDirectory(filePath, fileList);
            } else {
                // Check if file is image or video
                const ext = path.extname(file).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.mov'].includes(ext)) {
                    fileList.push(filePath);
                }
            }
        });
        return fileList;
    } catch (error) {
        console.error(`Error scanning directory ${dir}:`, error);
        return fileList;
    }
};

/**
 * Upload file to Cloudinary
 */
const uploadToCloudinary = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
    const folder = isVideo ?
        process.env.CLOUDINARY_VIDEO_FOLDER :
        process.env.CLOUDINARY_IMAGE_FOLDER;

    // Create subfolder based on file's parent directory
    const parentDir = path.basename(path.dirname(filePath));
    const subFolder = parentDir !== 'public' && parentDir !== 'images' ?
        `${folder}/${parentDir}` : folder;

    // Generate a unique public_id based on filename (without extension)
    const filename = path.basename(filePath, ext);

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: isVideo ? 'video' : 'image',
        folder: subFolder,
        public_id: filename
    };

    try {
        const result = isVideo ?
            await cloudinary.uploader.upload_large(filePath, options) :
            await cloudinary.uploader.upload(filePath, options);

        console.log(`Uploaded ${filePath} to Cloudinary: ${result.secure_url}`);
        migrationStats.uploadedFiles++;
        return result;
    } catch (error) {
        console.error(`Failed to upload ${filePath}:`, error);
        migrationStats.failedFiles++;
        return null;
    }
};

/**
 * Generate a mapping file of old paths to new URLs
 */
const generateMappingFile = (urlMap) => {
    try {
        const mappingContent = JSON.stringify(urlMap, null, 2);
        fs.writeFileSync(path.join(__dirname, 'cloudinary-url-mapping.json'), mappingContent);
        console.log('Generated URL mapping file: cloudinary-url-mapping.json');
    } catch (error) {
        console.error('Failed to generate mapping file:', error);
    }
};

/**
 * Main migration function
 */
const migrateMedia = async () => {
    console.log('Starting media migration to Cloudinary...');
    const urlMap = {};

    // Scan all media directories
    const mediaFiles = [];
    mediaPaths.forEach(dir => {
        console.log(`Scanning directory: ${dir}`);
        const files = scanDirectory(dir);
        mediaFiles.push(...files);
    });

    migrationStats.totalFiles = mediaFiles.length;
    console.log(`Found ${mediaFiles.length} media files to migrate`);

    // Upload files to Cloudinary
    for (const filePath of mediaFiles) {
        const result = await uploadToCloudinary(filePath);
        if (result) {
            urlMap[filePath] = result.secure_url;
        }
    }

    // Generate mapping file
    generateMappingFile(urlMap);

    // Print migration stats
    console.log('\nMigration completed:');
    console.log(`Total files: ${migrationStats.totalFiles}`);
    console.log(`Successfully uploaded: ${migrationStats.uploadedFiles}`);
    console.log(`Failed uploads: ${migrationStats.failedFiles}`);
};

// Run migration
migrateMedia().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});