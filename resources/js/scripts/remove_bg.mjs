import sharp from 'sharp';

async function removeBackgroundCropClean() {
    const inputPath = 'public/images/tasya_original.jpg';
    const outputPath = 'public/images/tasya_nobg.png';

    // We can crop the portrait gracefully from head down to mid-waist / blazer
    // Original dimensions: 2000 x 3000
    // Crop area: x: 400 to 1800, y: 350 to 2200 (perfect professional hero portrait)
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const width = metadata.width;
    const height = metadata.height;

    const { data } = await image
        .raw()
        .toBuffer({ resolveWithObject: true });

    const isBg = new Uint8Array(width * height);
    const isVisited = new Uint8Array(width * height);
    const queue = new Int32Array(width * height);
    let qHead = 0;
    let qTail = 0;

    function isBackdrop(idx, x, y) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const avg = (r + g + b) / 3;
        const diff = Math.max(r, g, b) - Math.min(r, g, b);

        // Warm skin guard
        if (r > 115 && (r - b) >= 10 && avg > 105) return false;

        // Dark clothing guard
        if (avg < 90) return false;

        // Backdrop wall & shadow
        if (avg > 150 && diff < 30) return true;
        if (x > width * 0.60 && diff < 20 && avg > 65) return true;
        if (y > height * 0.65 && x > width * 0.40 && diff < 25 && avg > 100) return true;

        return false;
    }

    for (let x = 0; x < width; x++) {
        const idxT = x * 3;
        if (isBackdrop(idxT, x, 0)) {
            queue[qTail++] = x;
            isVisited[x] = 1;
            isBg[x] = 1;
        }
    }
    for (let y = 0; y < height; y++) {
        const idxL = (y * width) * 3;
        if (isBackdrop(idxL, 0, y) && !isVisited[y * width]) {
            queue[qTail++] = y * width;
            isVisited[y * width] = 1;
            isBg[y * width] = 1;
        }
        const idxR = (y * width + (width - 1)) * 3;
        if (isBackdrop(idxR, width - 1, y) && !isVisited[y * width + (width - 1)]) {
            queue[qTail++] = y * width + (width - 1);
            isVisited[y * width + (width - 1)] = 1;
            isBg[y * width + (width - 1)] = 1;
        }
    }

    while (qHead < qTail) {
        const curr = queue[qHead++];
        const cx = curr % width;
        const cy = Math.floor(curr / width);

        const neighbors = [
            cy > 0 ? (cy - 1) * width + cx : -1,
            cy < height - 1 ? (cy + 1) * width + cx : -1,
            cx > 0 ? cy * width + (cx - 1) : -1,
            cx < width - 1 ? cy * width + (cx + 1) : -1,
        ];

        for (const n of neighbors) {
            if (n !== -1 && !isVisited[n]) {
                isVisited[n] = 1;
                const nx = n % width;
                const ny = Math.floor(n / width);
                if (isBackdrop(n * 3, nx, ny)) {
                    isBg[n] = 1;
                    queue[qTail++] = n;
                }
            }
        }
    }

    // Now clean stray pixels on left/right and the bottom box
    const rgba = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        const srcIdx = i * 3;
        const tgtIdx = i * 4;

        rgba[tgtIdx] = data[srcIdx];
        rgba[tgtIdx + 1] = data[srcIdx + 1];
        rgba[tgtIdx + 2] = data[srcIdx + 2];

        // Below y > 0.70 and x > 0.60 is the white cube / cast shadow
        const isBottomBox = (y > height * 0.67 && x > width * 0.58);
        const isFarLeft = (x < width * 0.08);

        if (isBg[i] || isBottomBox || isFarLeft) {
            rgba[tgtIdx + 3] = 0;
        } else {
            rgba[tgtIdx + 3] = 255;
        }
    }

    // We can also extract the optimal portrait crop (from top of hijab down to hands)
    // and save it cleanly
    await sharp(rgba, {
        raw: {
            width,
            height,
            channels: 4,
        }
    })
    .extract({
        left: Math.round(width * 0.08),
        top: Math.round(height * 0.12),
        width: Math.round(width * 0.76),
        height: Math.round(height * 0.76)
    })
    .png()
    .toFile(outputPath);

    console.log('Finished polished crop to:', outputPath);
}

removeBackgroundCropClean().catch(console.error);
