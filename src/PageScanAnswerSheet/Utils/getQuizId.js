function downloadImage(dataUrl, filename) {
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = filename;
    anchor.click();
}

export async function getQuizId(imagePathUrl) {
    return new Promise(async (resolve, reject) => {
        const imageUrlResize = await wrapImageA4(imagePathUrl);
        const imgQR = await showSectionOfImagePercent(
            imageUrlResize,
            0,
            0.15,
            0.5,
            0.15
        );
        //downloadImage(imgQR, "qr.png");
        const QuizId = await getQR(imgQR);
        resolve(QuizId);
        return;
    });
}

async function wrapImageA4(imagePathUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imagePathUrl;
        image.onload = function () {
            const w = image.width;
            const h = (w * 297) / 210;

            const srcMat = cv.imread(image);

            const dstMat = new cv.Mat();
            const dsize = new cv.Size(w, h);

            const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
                0,
                0,
                image.width,
                0,
                0,
                image.height,
                image.width,
                image.height,
            ]);
            const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
                0,
                0,
                w,
                0,
                0,
                h,
                w,
                h,
            ]);

            const M = cv.getPerspectiveTransform(srcTri, dstTri);

            cv.warpPerspective(
                srcMat,
                dstMat,
                M,
                dsize,
                cv.INTER_LINEAR,
                cv.BORDER_CONSTANT,
                new cv.Scalar()
            );

            const canvas = document.createElement("canvas");
            cv.imshow(canvas, dstMat);

            const dataUrl = canvas.toDataURL();

            resolve(dataUrl);
            return;
        };
    });
}

async function showSectionOfImagePercent(
    imagePathUrl,
    percentx,
    percenty,
    percentw,
    percenth
) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imagePathUrl;
        image.onload = function () {
            const imgW = image.width;
            const imgH = image.height;
            const x = imgW * percentx;
            const y = imgH * percenty;
            const w = imgW * percentw;
            const h = imgH * percenth;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

            const outputImageDataUrl = canvas.toDataURL();

            resolve(outputImageDataUrl);
            return;
        };
    });
}

async function getQR(imagePathUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePathUrl;
        img.onload = function () {
            const imgMat = cv.imread(img);

            const gray = new cv.Mat();
            cv.cvtColor(imgMat, gray, cv.COLOR_RGBA2GRAY);

            const blurred = new cv.Mat();
            cv.medianBlur(gray, blurred, 5);

            const decoder = new cv.QRCodeDetector();
            const data = decoder.detectAndDecode(blurred);

            resolve(data);
            return;
        };
    });
}
