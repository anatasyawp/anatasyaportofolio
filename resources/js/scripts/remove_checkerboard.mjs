import sharp from 'sharp';

async function removeCheckerboard() {
    const inputPath = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\815a4074-70b3-465c-b7bd-fbc444cbb640\\tasya_editorial_clean_1793076067787.jpg';
    const outputPath = 'public/images/tasya_cutout.png';

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const width = metadata.width;
    const height = metadata.height;

    const { data } = await image
        .raw()
        .toBuffer({ resolveWithObject: true });

    const rgba = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
        const srcIdx = i * 3;
        const tgtIdx = i * 4;

        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];

        rgba[tgtIdx] = r;
        rgba[tgtIdx + 1] = g;
        rgba[tgtIdx + 2] = b;

        // Checkerboard pixels are either white (255,255,255) or light gray (204,204,204)
        // With very small diff: diff <= 5 and avg >= 195
        const diff = Math.max(r, g, b) - Math.min(r, g, b);
        const avg = (r + g + b) / 3;

        const isChecker = (diff <= 8 && avg >= 190);

        if (isChecker) {
            rgba[tgtIdx + 3] = 0; // transparent
        } else {
            rgba[tgtIdx + 3] = 255;
        }
    }

    await sharp(rgba, {
        raw: {
            width,
            height,
            channels: 4,
        }
    })
    .png()
    .toFile(outputPath);

    console.log('Checkerboard removed, saved to:', outputPath);
}

removeCheckerboard().catch(console.error);
