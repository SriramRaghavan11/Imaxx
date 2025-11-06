// IMAX/cloudinary/updateComponents.js

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the URL mapping file created by the migration script
let urlMap = {};
try {
    const mappingData = fs.readFileSync(path.join(__dirname, 'cloudinary-url-mapping.json'), 'utf8');
    urlMap = JSON.parse(mappingData);
} catch (error) {
    console.error('Error loading URL mapping file:', error);
    process.exit(1);
}

// Convert file paths in the map to formats that might be used in components
const expandedMap = {};
Object.entries(urlMap).forEach(([oldPath, newUrl]) => {
    // Original path
    expandedMap[oldPath] = newUrl;

    // Public path (without ./public prefix)
    const publicPath = oldPath.replace(/.*[\/\\](public|assets)[\/\\]/, '/');
    expandedMap[publicPath] = newUrl;

    // Path with forward slashes for Windows paths
    const normalizedPath = oldPath.replace(/\\/g, '/');
    expandedMap[normalizedPath] = newUrl;

    // Public path with forward slashes
    const normalizedPublicPath = publicPath.replace(/\\/g, '/');
    expandedMap[normalizedPublicPath] = newUrl;

    // Just the filename
    const filename = path.basename(oldPath);
    expandedMap[filename] = newUrl;
});

// Find all JS and JSX files in the src directory
const findComponentFiles = () => {
    return glob.sync('D:/GetMaxSolutions/Imax-Website/IMAX/src/**/*.{js,jsx}');
}

// Update references in the component files
const updateComponentFiles = (files) => {
    const stats = {
        totalFiles: files.length,
        modifiedFiles: 0,
        totalReplacements: 0
    };

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fileReplacements = 0;

        // Replace all old URLs with new Cloudinary URLs
        Object.entries(expandedMap).forEach(([oldPath, newUrl]) => {
            // Skip if oldPath is empty or just a slash
            if (!oldPath || oldPath === '/') return;

            // Create regex to match the path in various formats
            const patterns = [
                `["']${oldPath}["']`,                    // "path" or 'path'
                `{["']${oldPath}["']}`,                  // {"path"} or {'path'}
                `\`${oldPath}\``,                        // `path`
                `["']${oldPath.replace(/^\//, '')}["']`  // path without leading slash
            ];

            patterns.forEach(pattern => {
                const regex = new RegExp(pattern, 'g');
                const matches = content.match(regex);
                if (matches) {
                    const replacement = matches[0].charAt(0) + newUrl + matches[0].charAt(matches[0].length - 1);
                    content = content.replace(regex, replacement);
                    fileReplacements += matches.length;
                    stats.totalReplacements += matches.length;
                }
            });
        });

        // If content changed, write the file back
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            stats.modifiedFiles++;
            console.log(`Updated ${file} (${fileReplacements} replacements)`);
        }
    });

    return stats;
};

// Main function
const updateComponents = () => {
    console.log('Scanning for component files...');
    const files = findComponentFiles();
    console.log(`Found ${files.length} component files.`);

    console.log('Updating URL references...');
    const stats = updateComponentFiles(files);

    console.log('\nUpdate completed:');
    console.log(`Total files scanned: ${stats.totalFiles}`);
    console.log(`Files modified: ${stats.modifiedFiles}`);
    console.log(`Total URL replacements: ${stats.totalReplacements}`);
};

updateComponents();