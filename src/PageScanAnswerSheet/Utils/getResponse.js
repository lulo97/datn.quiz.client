export async function getResponse(imagePathUrl, QuestionLength) {
    return new Promise(async (resolve, reject) => {
        const imageUrlResize = await wrapImageA4(imagePathUrl);

        const imgSTT = await showSectionOfImagePercent(
            imageUrlResize,
            0.5,
            0.15,
            1,
            0.15
        );

        const imgAnswers = await showSectionOfImagePercent(
            imageUrlResize,
            0,
            0.3,
            1,
            0.6
        );

        const output = {
            STT: await getSTT(imgSTT),
            Answers: await getAnswers(imgAnswers, QuestionLength),
        };

        resolve(output);
        return;
    });
}

async function getAnswers(imagePathUrl, QuestionLength) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePathUrl;
        img.onload = async function () {
            const imgMat = cv.imread(img);

            const gray = new cv.Mat();
            cv.cvtColor(imgMat, gray, cv.COLOR_RGBA2GRAY);

            const blurred = new cv.Mat();
            cv.medianBlur(gray, blurred, 5);

            const edged = new cv.Mat();
            cv.Canny(blurred, edged, 75, 200);

            const totalNumberCircle = QuestionLength;
            const numberOfCircleInRow = 24;
            const numberOfCircleInCol = 8;

            const circlesArray = await runTryDetectCircles(
                edged,
                totalNumberCircle,
                numberOfCircleInRow
            );
            if (circlesArray == null) {
                resolve(null);
                return;
            }

            const intensities = await getGrayIntensityOne(
                blurred,
                circlesArray
            );
            if (intensities == null) {
                resolve(null);
                return;
            }

            const intensities2D = chunkList(intensities, numberOfCircleInRow);
            const outliers2D = [];
            intensities2D.forEach((ele) => {
                const row = detectBooleanOfOutliers(ele);
                outliers2D.push(...chunkList(row, numberOfCircleInCol));
            });
            resolve(outliers2D);
            return;
        };
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

function distance_between_centers(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function isOverlap(circles) {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            let distance = distance_between_centers(
                circles[i].x,
                circles[i].y,
                circles[j].x,
                circles[j].y
            );

            if (distance - (circles[i].radius + circles[j].radius) < 0) {
                return true;
            }
        }
    }

    return false;
}

function convertToCircleArray(circles) {
    const circlesArray = [];
    for (let i = 0; i < circles.cols; ++i) {
        let x = circles.data32F[i * 3];
        let y = circles.data32F[i * 3 + 1];
        let radius = circles.data32F[i * 3 + 2];
        circlesArray.push({ x, y, radius });
    }

    return circlesArray;
}

function sortCirclesByRow(circlesArray, numberOfCircleInRow) {
    circlesArray.sort((a, b) => {
        return a.y - b.y;
    });

    const tempCircleArray = [];
    let tempSubCircles = [];
    circlesArray.forEach((circle) => {
        tempSubCircles.push(circle);
        if (tempSubCircles.length === numberOfCircleInRow) {
            tempSubCircles.sort((a, b) => a.x - b.x);
            tempCircleArray.push([...tempSubCircles]);
            tempSubCircles = [];
        }
    });

    if (tempSubCircles.length > 0) {
        tempSubCircles.sort((a, b) => a.x - b.x);
        tempCircleArray.push([...tempSubCircles]);
    }

    return tempCircleArray.flat();
}

async function runDetectCircles(
    img,
    minDist,
    param1,
    param2,
    minRadius,
    maxRadius
) {
    return new Promise((resolve, reject) => {
        let circles = new cv.Mat();
        cv.HoughCircles(
            img,
            circles,
            cv.HOUGH_GRADIENT,
            1,
            minDist,
            param1,
            param2,
            minRadius,
            maxRadius
        );

        resolve(circles);
        return;
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function runTryDetectCircles(
    edged,
    totalNumberCircle,
    numberOfCircleInRow
) {
    return new Promise(async (resolve, reject) => {
        let isFound = false;
        let iteration_count = 0;
        let max_iterations = 200;

        while (!isFound && iteration_count < max_iterations) {
            let param1 = getRandomInt(5, 100);
            let param2 = getRandomInt(5, 100);
            let minRadius = getRandomInt(10, 25);
            let maxRadius = getRandomInt(15, 40);
            let minDist = (maxRadius + minRadius) / 2;

            if (iteration_count % Math.trunc(max_iterations / 10) == 1) {
                //console.log(iteration_count);
            }

            let circles = await runDetectCircles(
                edged,
                minDist,
                param1,
                param2,
                minRadius,
                maxRadius
            );

            if (circles.cols == totalNumberCircle) {
                const circleArray = convertToCircleArray(circles);

                if (!isOverlap(circleArray)) {
                    const sortedCirclesArray = sortCirclesByRow(
                        circleArray,
                        numberOfCircleInRow
                    );

                    isFound = true;
                    resolve(sortedCirclesArray);
                    return;
                } else {
                }
            }

            iteration_count++;
        }

        resolve(null);
        return;
    });
}

async function getSTT(imagePathUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePathUrl;
        img.onload = async function () {
            const imgMat = cv.imread(img);

            const gray = new cv.Mat();
            cv.cvtColor(imgMat, gray, cv.COLOR_RGBA2GRAY);

            const blurred = new cv.Mat();
            cv.medianBlur(gray, blurred, 5);

            const edged = new cv.Mat();
            cv.Canny(blurred, edged, 75, 200);

            const totalNumberCircle = 30;
            const numberOfCircleInRow = 10;

            const circlesArray = await runTryDetectCircles(
                edged,
                totalNumberCircle,
                numberOfCircleInRow
            );
            if (circlesArray == null) {
                resolve(null);
                return;
            }

            const intensities = await getGrayIntensityOne(
                blurred,
                circlesArray
            );
            if (intensities == null) {
                resolve(null);
                return;
            }

            const intensities2D = chunkList(intensities, numberOfCircleInRow);
            const outliers2D = [];
            intensities2D.forEach((ele) => {
                outliers2D.push(detectBooleanOfOutliers(ele));
            });

            let stt = "";
            outliers2D.forEach((ele) => {
                const idx = ele.findIndex((value) => value);
                if (idx != -1) {
                    stt += idx;
                } else {
                    stt += "_";
                }
            });

            resolve(stt);
            return;
        };
    });
}

function chunkList(list, chunkSize) {
    const result = [];
    for (let i = 0; i < list.length; i += chunkSize) {
        const chunk = list.slice(i, i + chunkSize);
        if (chunk.length > 0) {
            result.push(chunk);
        }
    }

    return result;
}

async function getGrayIntensityOne(blurred, circlesArray) {
    if (!circlesArray) {
        return null;
    }

    return new Promise((resolve, reject) => {
        let intensities = [];
        for (let i = 0; i < circlesArray.length; i++) {
            let centerX = circlesArray[i].x;
            let centerY = circlesArray[i].y;
            let radius = circlesArray[i].radius;
            let x = Math.round(centerX - radius);
            let y = Math.round(centerY - radius);
            let intensitySum = 0;
            let pixelCount = 0;

            for (let r = y; r < y + 2 * radius; ++r) {
                for (let c = x; c < x + 2 * radius; ++c) {
                    if (
                        Math.sqrt(
                            Math.pow(r - centerY, 2) + Math.pow(c - centerX, 2)
                        ) <= radius
                    ) {
                        intensitySum += blurred.ucharAt(r, c);
                        pixelCount++;
                    }
                }
            }

            let averageIntensity = Math.trunc(intensitySum / pixelCount);
            intensities.push(averageIntensity);
        }

        resolve(intensities);
        return;
    });
}

function detectBooleanOfOutliers(data) {
    const threshold = 100;
    const output = [];
    data.forEach((ele, idx) => {
        if (ele < threshold) {
            output.push(true);
        } else {
            output.push(false);
        }
    });
    return output;
}
