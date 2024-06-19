let logNumber = 0;
let isLog = false;

function showLog(
    functionName,
    logNumberOfFunction,
    variableName,
    variableValue
) {
    if (!isLog) return;
    console.log(
        `${logNumber}|${logNumberOfFunction}|${functionName}|${variableName} = ${variableValue}`
    );
    logNumber += 1;
}

const ActionType = {
    QR: 1,
    STT: 2,
    Answers: 3,
};

const cropRegions = [
    {
        percent: {
            x: 0,
            y: 1 / 6.5,
            w: 1 / 4,
            h: 1 / 9,
        },
        Action: ActionType.QR,
    },
    {
        percent: {
            x: 1 / 2 + 1 / 9,
            y: 1 / 6.5,
            w: 1 / 2 - 1 / 9,
            h: 1 / 9,
        },
        Action: ActionType.STT,
        TargetCircle: 30,
        NumberOfCircleInRow: 10,
        NumberOfCircleInCol: 10,
    },
    {
        percent: {
            x: 0,
            y: 2 / 7,
            w: 1,
            h: 1 - 4 / 9,
        },
        Action: ActionType.Answers,
        TargetCircle: 400,
        NumberOfCircleInRow: 24,
        NumberOfCircleInCol: 8,
    },
];

const threshold = 200;

export async function getAnswerSheetResponse(imagePathUrl) {
    showLog("getAnswerSheetResponse", 1, "imagePathUrl", imagePathUrl);
    return await new Promise((resolve, reject) => {
        showLog("getAnswerSheetResponse", 2, "Promise", "created");
        let tempImage = new Image();
        tempImage.src = imagePathUrl;

        tempImage.onload = function () {
            showLog("getAnswerSheetResponse", 3, "tempImage", "loaded");
            const tempImageWidth = tempImage.naturalWidth;
            const tempImageHeight = tempImage.naturalHeight;
            showLog(
                "getAnswerSheetResponse",
                4,
                "tempImageWidth",
                tempImageWidth
            );
            showLog(
                "getAnswerSheetResponse",
                5,
                "tempImageHeight",
                tempImageHeight
            );

            const output = {
                STT: "",
                Response: [],
            };
            showLog(
                "getAnswerSheetResponse",
                6,
                "output",
                JSON.stringify(output)
            );

            cropRegions.forEach((region, index) => {
                showLog(
                    "getAnswerSheetResponse",
                    7,
                    "region",
                    JSON.stringify(region)
                );
                const x = region.percent.x * tempImageWidth;
                const y = region.percent.y * tempImageHeight;
                const w = region.percent.w * tempImageWidth;
                const h = region.percent.h * tempImageHeight;
                showLog("getAnswerSheetResponse", 8, "x", x);
                showLog("getAnswerSheetResponse", 9, "y", y);
                showLog("getAnswerSheetResponse", 10, "w", w);
                showLog("getAnswerSheetResponse", 11, "h", h);

                let canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(tempImage, x, y, w, h, 0, 0, w, h);
                showLog("getAnswerSheetResponse", 12, "canvas", canvas);
                showLog("getAnswerSheetResponse", 13, "ctx", ctx);

                const canvasDataUrl = canvas.toDataURL();
                showLog("getAnswerSheetResponse", 14, "canvasDataUrl", "");

                // if (region.Action == ActionType.QR) {
                //     QrScanner.scanImage(canvasDataUrl).then((result) => {
                //         output.QuizId = result;
                //         showLog(
                //             "getAnswerSheetResponse",
                //             15,
                //             "output.QuizId",
                //             result
                //         );
                //         resolve(output);
                //     });
                // }

                if (
                    region.Action == ActionType.Answers ||
                    region.Action == ActionType.STT
                ) {
                    let resultCircles = stt;
                    if (region.Action == ActionType.Answers) {
                        resultCircles = answers;
                    }
                    showLog(
                        "getAnswerSheetResponse",
                        16,
                        "resultCircles",
                        resultCircles.length
                    );
                    getGrayIntensityOne(canvasDataUrl, resultCircles).then(
                        (resultIntensities) => {
                            showLog(
                                "getAnswerSheetResponse",
                                17,
                                "resultIntensities",
                                resultIntensities.length
                            );
                            drawCircles(canvasDataUrl, resultCircles);

                            let intensitiyForEachQuestion = [];
                            let intensityOneQuestion = [];
                            for (
                                let i = 0;
                                i < resultIntensities.length;
                                i += 1
                            ) {
                                intensityOneQuestion.push(resultIntensities[i]);
                                if (
                                    intensityOneQuestion.length ==
                                    region.NumberOfCircleInCol
                                ) {
                                    intensitiyForEachQuestion.push([
                                        ...intensityOneQuestion,
                                    ]);
                                    intensityOneQuestion = [];
                                    showLog(
                                        "getAnswerSheetResponse",
                                        18,
                                        "intensitiyForEachQuestion",
                                        intensitiyForEachQuestion.length
                                    );
                                }
                            }
                            if (intensityOneQuestion.length > 0) {
                                intensitiyForEachQuestion.push([
                                    ...intensityOneQuestion,
                                ]);
                                showLog(
                                    "getAnswerSheetResponse",
                                    19,
                                    "intensitiyForEachQuestion",
                                    intensitiyForEachQuestion
                                );
                            }

                            const circleIdxDetect = [];
                            for (
                                let i = 0;
                                i < intensitiyForEachQuestion.length;
                                i += 1
                            ) {
                                circleIdxDetect.push(
                                    intensitiyForEachQuestion[i]
                                        .map((ele, index) =>
                                            ele <= threshold ? index : -1
                                        )
                                        .filter((index) => index !== -1)
                                );
                                showLog(
                                    "getAnswerSheetResponse",
                                    20,
                                    "circleIdxDetect",
                                    circleIdxDetect
                                );
                            }
                            if (region.Action == ActionType.STT) {
                                output.STT = circleIdxDetect.join("");
                                showLog(
                                    "getAnswerSheetResponse",
                                    21,
                                    "output.STT",
                                    output.STT
                                );
                            }
                            if (region.Action == ActionType.Answers) {
                                output.Response = circleIdxDetect;
                                showLog(
                                    "getAnswerSheetResponse",
                                    22,
                                    "output.Response",
                                    output.Response
                                );
                                resolve(output);
                            }
                        }
                    );
                }
            });

            //resolve(output);
            showLog(
                "getAnswerSheetResponse",
                23,
                "resolve",
                JSON.stringify(output)
            );
        };

        tempImage.onerror = function () {
            console.error("Error loading image:", imagePathUrl);
            showLog("getAnswerSheetResponse", 24, "tempImage", "error");
            reject(new Error("Failed to load image."));
        };
    });
}

async function getGrayIntensityOne(imgdata, circlesArray) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgdata;

        img.onload = function () {
            const imgread = cv.imread(img);
            const gray = new cv.Mat();
            cv.cvtColor(imgread, gray, cv.COLOR_RGBA2GRAY);

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
                                Math.pow(r - centerY, 2) +
                                    Math.pow(c - centerX, 2)
                            ) <= radius
                        ) {
                            intensitySum += gray.ucharAt(r, c);
                            pixelCount++;
                        }
                    }
                }

                let averageIntensity = Math.trunc(intensitySum / pixelCount);

                intensities.push(averageIntensity);
            }

            resolve(intensities);
        };

        img.onerror = function () {
            console.error("Error loading image:", imgdata);
            reject(new Error("Failed to load the image."));
        };
    });
}

function drawCircles(canvasDataUrl, circlesArray) {
    const canvasInput = new Image();
    canvasInput.src = canvasDataUrl;

    canvasInput.onload = function () {
        document.body.appendChild(canvasInput);
        const canvasOutput = document.createElement("canvas");
        canvasOutput.style.display = "none";
        document.body.appendChild(canvasOutput);
        canvasOutput.width = canvasInput.width;
        canvasOutput.height = canvasInput.height;

        const ctxOutput = canvasOutput.getContext("2d");
        ctxOutput.drawImage(canvasInput, 0, 0);
        ctxOutput.strokeStyle = "green";
        ctxOutput.lineWidth = 2;

        for (let i = 0; i < circlesArray.length; ++i) {
            let x = circlesArray[i].x;
            let y = circlesArray[i].y;
            let radius = circlesArray[i].radius;
            ctxOutput.beginPath();
            ctxOutput.arc(x, y, radius, 0, 2 * Math.PI);
            ctxOutput.stroke();
        }

        const outputImage = new Image();
        outputImage.src = canvasOutput.toDataURL();
        const outputImageContainer = document.createElement("div");
        document.body.appendChild(outputImageContainer);
        outputImageContainer.appendChild(outputImage);
    };
}

const stt = [
    {
        x: 83.5,
        y: 95.5,
        radius: 18.799999237060547,
    },
    {
        x: 136.5,
        y: 95.5,
        radius: 18.350000381469727,
    },
    {
        x: 188.5,
        y: 95.5,
        radius: 19.100000381469727,
    },
    {
        x: 240.5,
        y: 95.5,
        radius: 18.799999237060547,
    },
    {
        x: 292.5,
        y: 95.5,
        radius: 18.200000762939453,
    },
    {
        x: 345.5,
        y: 96.5,
        radius: 18.350000381469727,
    },
    {
        x: 397.5,
        y: 95.5,
        radius: 18.799999237060547,
    },
    {
        x: 449.5,
        y: 95.5,
        radius: 18.200000762939453,
    },
    {
        x: 502.5,
        y: 96.5,
        radius: 18.350000381469727,
    },
    {
        x: 554.5,
        y: 95.5,
        radius: 18.799999237060547,
    },
    {
        x: 83.5,
        y: 147.5,
        radius: 19,
    },
    {
        x: 136.5,
        y: 148.5,
        radius: 19.399999618530273,
    },
    {
        x: 188.5,
        y: 147.5,
        radius: 19.100000381469727,
    },
    {
        x: 240.5,
        y: 147.5,
        radius: 19,
    },
    {
        x: 293.5,
        y: 148.5,
        radius: 19.399999618530273,
    },
    {
        x: 344.5,
        y: 147.5,
        radius: 18.350000381469727,
    },
    {
        x: 397.5,
        y: 147.5,
        radius: 19,
    },
    {
        x: 449.5,
        y: 147.5,
        radius: 18.200000762939453,
    },
    {
        x: 502.5,
        y: 147.5,
        radius: 19.100000381469727,
    },
    {
        x: 554.5,
        y: 148.5,
        radius: 18.350000381469727,
    },
    {
        x: 83.5,
        y: 199.5,
        radius: 19,
    },
    {
        x: 135.5,
        y: 199.5,
        radius: 18.350000381469727,
    },
    {
        x: 188.5,
        y: 200.5,
        radius: 18.350000381469727,
    },
    {
        x: 240.5,
        y: 199.5,
        radius: 19,
    },
    {
        x: 292.5,
        y: 199.5,
        radius: 18.350000381469727,
    },
    {
        x: 345.5,
        y: 200.5,
        radius: 18.350000381469727,
    },
    {
        x: 396.5,
        y: 200.5,
        radius: 19.399999618530273,
    },
    {
        x: 449.5,
        y: 199.5,
        radius: 18.350000381469727,
    },
    {
        x: 501.5,
        y: 200.5,
        radius: 19.399999618530273,
    },
    {
        x: 555.5,
        y: 200.5,
        radius: 19.399999618530273,
    },
];

const answers = [
    {
        x: 148.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 78.5,
        radius: 19.100000381469727,
    },
    {
        x: 252.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 304.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 79.5,
        radius: 19,
    },
    {
        x: 410.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 462.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 513.5,
        y: 79.5,
        radius: 19.399999618530273,
    },
    {
        x: 673.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 725.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 777.5,
        y: 78.5,
        radius: 19.399999618530273,
    },
    {
        x: 830.5,
        y: 79.5,
        radius: 19,
    },
    {
        x: 883.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 935.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 987.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 1039.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 1199.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 1303.5,
        y: 79.5,
        radius: 19.100000381469727,
    },
    {
        x: 1355.5,
        y: 79.5,
        radius: 18.350000381469727,
    },
    {
        x: 1408.5,
        y: 79.5,
        radius: 19.100000381469727,
    },
    {
        x: 1460.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 1513.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 1565.5,
        y: 78.5,
        radius: 18.350000381469727,
    },
    {
        x: 148.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 151.5,
        radius: 19,
    },
    {
        x: 253.5,
        y: 152.5,
        radius: 19.399999618530273,
    },
    {
        x: 305.5,
        y: 151.5,
        radius: 19.100000381469727,
    },
    {
        x: 357.5,
        y: 151.5,
        radius: 19,
    },
    {
        x: 409.5,
        y: 151.5,
        radius: 19.100000381469727,
    },
    {
        x: 462.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 514.5,
        y: 151.5,
        radius: 19,
    },
    {
        x: 672.5,
        y: 152.5,
        radius: 19.399999618530273,
    },
    {
        x: 725.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 778.5,
        y: 151.5,
        radius: 19.100000381469727,
    },
    {
        x: 831.5,
        y: 151.5,
        radius: 19.399999618530273,
    },
    {
        x: 882.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 935.5,
        y: 151.5,
        radius: 19.100000381469727,
    },
    {
        x: 986.5,
        y: 152.5,
        radius: 19.399999618530273,
    },
    {
        x: 1039.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 1198.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 151.5,
        radius: 19.100000381469727,
    },
    {
        x: 1303.5,
        y: 151.5,
        radius: 18.799999237060547,
    },
    {
        x: 1355.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 1408.5,
        y: 151.5,
        radius: 18.799999237060547,
    },
    {
        x: 1459.5,
        y: 152.5,
        radius: 19.399999618530273,
    },
    {
        x: 1512.5,
        y: 151.5,
        radius: 18.350000381469727,
    },
    {
        x: 1566.5,
        y: 152.5,
        radius: 19.399999618530273,
    },
    {
        x: 148.5,
        y: 225.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 224.5,
        radius: 18.799999237060547,
    },
    {
        x: 251.5,
        y: 224.5,
        radius: 19.399999618530273,
    },
    {
        x: 304.5,
        y: 224.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 224.5,
        radius: 18.799999237060547,
    },
    {
        x: 409.5,
        y: 224.5,
        radius: 19.100000381469727,
    },
    {
        x: 462.5,
        y: 224.5,
        radius: 19.100000381469727,
    },
    {
        x: 514.5,
        y: 224.5,
        radius: 18.799999237060547,
    },
    {
        x: 673.5,
        y: 224.5,
        radius: 18.799999237060547,
    },
    {
        x: 726.5,
        y: 224.5,
        radius: 18.350000381469727,
    },
    {
        x: 778.5,
        y: 224.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 224.5,
        radius: 18.799999237060547,
    },
    {
        x: 883.5,
        y: 224.5,
        radius: 18.350000381469727,
    },
    {
        x: 936.5,
        y: 224.5,
        radius: 19.399999618530273,
    },
    {
        x: 987.5,
        y: 224.5,
        radius: 18.799999237060547,
    },
    {
        x: 1039.5,
        y: 225.5,
        radius: 18.350000381469727,
    },
    {
        x: 1199.5,
        y: 225.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 224.5,
        radius: 19,
    },
    {
        x: 1303.5,
        y: 224.5,
        radius: 19,
    },
    {
        x: 1356.5,
        y: 225.5,
        radius: 18.350000381469727,
    },
    {
        x: 1408.5,
        y: 224.5,
        radius: 19,
    },
    {
        x: 1460.5,
        y: 224.5,
        radius: 19,
    },
    {
        x: 1513.5,
        y: 225.5,
        radius: 18.350000381469727,
    },
    {
        x: 1565.5,
        y: 224.5,
        radius: 19,
    },
    {
        x: 148.5,
        y: 297.5,
        radius: 19.100000381469727,
    },
    {
        x: 200.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 252.5,
        y: 297.5,
        radius: 19,
    },
    {
        x: 304.5,
        y: 297.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 297.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 297.5,
        radius: 19,
    },
    {
        x: 462.5,
        y: 297.5,
        radius: 19.100000381469727,
    },
    {
        x: 514.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 673.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 725.5,
        y: 298.5,
        radius: 19.399999618530273,
    },
    {
        x: 777.5,
        y: 297.5,
        radius: 18.350000381469727,
    },
    {
        x: 830.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 882.5,
        y: 297.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 1039.5,
        y: 297.5,
        radius: 19.100000381469727,
    },
    {
        x: 1199.5,
        y: 297.5,
        radius: 18.25,
    },
    {
        x: 1251.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 1355.5,
        y: 297.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 1460.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 1512.5,
        y: 297.5,
        radius: 18.25,
    },
    {
        x: 1565.5,
        y: 297.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 369.5,
        radius: 19.399999618530273,
    },
    {
        x: 200.5,
        y: 370.5,
        radius: 18.600000381469727,
    },
    {
        x: 252.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 304.5,
        y: 370.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 370.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 370.5,
        radius: 19,
    },
    {
        x: 461.5,
        y: 370.5,
        radius: 18.350000381469727,
    },
    {
        x: 514.5,
        y: 370.5,
        radius: 18.600000381469727,
    },
    {
        x: 673.5,
        y: 370.5,
        radius: 18.600000381469727,
    },
    {
        x: 726.5,
        y: 370.5,
        radius: 18.350000381469727,
    },
    {
        x: 777.5,
        y: 370.5,
        radius: 18.350000381469727,
    },
    {
        x: 830.5,
        y: 370.5,
        radius: 18.600000381469727,
    },
    {
        x: 883.5,
        y: 370.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 1040.5,
        y: 370.5,
        radius: 18.350000381469727,
    },
    {
        x: 1199.5,
        y: 371.5,
        radius: 19.399999618530273,
    },
    {
        x: 1251.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 1355.5,
        y: 371.5,
        radius: 19.399999618530273,
    },
    {
        x: 1408.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 1460.5,
        y: 370.5,
        radius: 18.600000381469727,
    },
    {
        x: 1513.5,
        y: 371.5,
        radius: 19.399999618530273,
    },
    {
        x: 1565.5,
        y: 370.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 200.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 252.5,
        y: 443.5,
        radius: 18.799999237060547,
    },
    {
        x: 304.5,
        y: 443.5,
        radius: 19.100000381469727,
    },
    {
        x: 357.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 462.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 514.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 673.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 725.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 778.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 882.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 935.5,
        y: 443.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 1039.5,
        y: 443.5,
        radius: 19,
    },
    {
        x: 1199.5,
        y: 443.5,
        radius: 19.100000381469727,
    },
    {
        x: 1251.5,
        y: 443.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 1355.5,
        y: 443.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 443.5,
        radius: 18.600000381469727,
    },
    {
        x: 1460.5,
        y: 443.5,
        radius: 18.799999237060547,
    },
    {
        x: 1512.5,
        y: 443.5,
        radius: 19.100000381469727,
    },
    {
        x: 1565.5,
        y: 443.5,
        radius: 18.799999237060547,
    },
    {
        x: 147.5,
        y: 516.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 252.5,
        y: 516.5,
        radius: 18.799999237060547,
    },
    {
        x: 304.5,
        y: 516.5,
        radius: 19.100000381469727,
    },
    {
        x: 357.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 516.5,
        radius: 19,
    },
    {
        x: 463.5,
        y: 516.5,
        radius: 19.399999618530273,
    },
    {
        x: 514.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 673.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 726.5,
        y: 516.5,
        radius: 18.350000381469727,
    },
    {
        x: 777.5,
        y: 516.5,
        radius: 18.350000381469727,
    },
    {
        x: 830.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 882.5,
        y: 517.5,
        radius: 19.399999618530273,
    },
    {
        x: 934.5,
        y: 516.5,
        radius: 18.350000381469727,
    },
    {
        x: 986.5,
        y: 515.5,
        radius: 19.399999618530273,
    },
    {
        x: 1039.5,
        y: 517.5,
        radius: 19.399999618530273,
    },
    {
        x: 1199.5,
        y: 515.5,
        radius: 19.399999618530273,
    },
    {
        x: 1250.5,
        y: 516.5,
        radius: 18.350000381469727,
    },
    {
        x: 1303.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 1355.5,
        y: 516.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 516.5,
        radius: 18.600000381469727,
    },
    {
        x: 1461.5,
        y: 516.5,
        radius: 18.350000381469727,
    },
    {
        x: 1514.5,
        y: 516.5,
        radius: 19.399999618530273,
    },
    {
        x: 1565.5,
        y: 516.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 589.5,
        radius: 19,
    },
    {
        x: 200.5,
        y: 590.5,
        radius: 19.399999618530273,
    },
    {
        x: 252.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 305.5,
        y: 589.5,
        radius: 19,
    },
    {
        x: 357.5,
        y: 589.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 589.5,
        radius: 19,
    },
    {
        x: 462.5,
        y: 590.5,
        radius: 19.399999618530273,
    },
    {
        x: 514.5,
        y: 589.5,
        radius: 18.600000381469727,
    },
    {
        x: 673.5,
        y: 589.5,
        radius: 18.600000381469727,
    },
    {
        x: 725.5,
        y: 588.5,
        radius: 19.399999618530273,
    },
    {
        x: 778.5,
        y: 589.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 882.5,
        y: 589.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 589.5,
        radius: 18.600000381469727,
    },
    {
        x: 1039.5,
        y: 588.5,
        radius: 19.399999618530273,
    },
    {
        x: 1199.5,
        y: 588.5,
        radius: 19.399999618530273,
    },
    {
        x: 1251.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 1356.5,
        y: 588.5,
        radius: 19.399999618530273,
    },
    {
        x: 1408.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 1460.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 1513.5,
        y: 588.5,
        radius: 19.399999618530273,
    },
    {
        x: 1565.5,
        y: 589.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 662.5,
        radius: 19.100000381469727,
    },
    {
        x: 200.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 252.5,
        y: 661.5,
        radius: 18.350000381469727,
    },
    {
        x: 304.5,
        y: 661.5,
        radius: 19.399999618530273,
    },
    {
        x: 357.5,
        y: 661.5,
        radius: 18.350000381469727,
    },
    {
        x: 410.5,
        y: 661.5,
        radius: 19.399999618530273,
    },
    {
        x: 462.5,
        y: 662.5,
        radius: 19.100000381469727,
    },
    {
        x: 514.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 673.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 725.5,
        y: 662.5,
        radius: 19.100000381469727,
    },
    {
        x: 778.5,
        y: 662.5,
        radius: 18.299999237060547,
    },
    {
        x: 830.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 883.5,
        y: 662.5,
        radius: 18.350000381469727,
    },
    {
        x: 935.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 1039.5,
        y: 662.5,
        radius: 19.100000381469727,
    },
    {
        x: 1198.5,
        y: 661.5,
        radius: 19.399999618530273,
    },
    {
        x: 1251.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 1356.5,
        y: 662.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 1460.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 1513.5,
        y: 661.5,
        radius: 19.399999618530273,
    },
    {
        x: 1565.5,
        y: 662.5,
        radius: 18.799999237060547,
    },
    {
        x: 147.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 252.5,
        y: 734.5,
        radius: 18.350000381469727,
    },
    {
        x: 304.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 410.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 462.5,
        y: 736.5,
        radius: 19.399999618530273,
    },
    {
        x: 514.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 673.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 725.5,
        y: 734.5,
        radius: 18.350000381469727,
    },
    {
        x: 778.5,
        y: 735.5,
        radius: 19.100000381469727,
    },
    {
        x: 830.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 883.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 935.5,
        y: 734.5,
        radius: 18.350000381469727,
    },
    {
        x: 987.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 1040.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 1198.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 735.5,
        radius: 19,
    },
    {
        x: 1303.5,
        y: 735.5,
        radius: 18.799999237060547,
    },
    {
        x: 1355.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 1408.5,
        y: 734.5,
        radius: 18.350000381469727,
    },
    {
        x: 1460.5,
        y: 735.5,
        radius: 19,
    },
    {
        x: 1512.5,
        y: 735.5,
        radius: 18.350000381469727,
    },
    {
        x: 1565.5,
        y: 735.5,
        radius: 19,
    },
    {
        x: 148.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 807.5,
        radius: 19.100000381469727,
    },
    {
        x: 252.5,
        y: 808.5,
        radius: 19.100000381469727,
    },
    {
        x: 305.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 808.5,
        radius: 19,
    },
    {
        x: 410.5,
        y: 807.5,
        radius: 19.399999618530273,
    },
    {
        x: 461.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 514.5,
        y: 807.5,
        radius: 19.100000381469727,
    },
    {
        x: 673.5,
        y: 808.5,
        radius: 19,
    },
    {
        x: 725.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 777.5,
        y: 807.5,
        radius: 19.399999618530273,
    },
    {
        x: 830.5,
        y: 808.5,
        radius: 19,
    },
    {
        x: 882.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 935.5,
        y: 808.5,
        radius: 19.100000381469727,
    },
    {
        x: 987.5,
        y: 807.5,
        radius: 18.25,
    },
    {
        x: 1039.5,
        y: 807.5,
        radius: 18.350000381469727,
    },
    {
        x: 1198.5,
        y: 807.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 807.5,
        radius: 18.350000381469727,
    },
    {
        x: 1303.5,
        y: 808.5,
        radius: 19,
    },
    {
        x: 1355.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 1408.5,
        y: 807.5,
        radius: 18.350000381469727,
    },
    {
        x: 1460.5,
        y: 808.5,
        radius: 19.100000381469727,
    },
    {
        x: 1512.5,
        y: 808.5,
        radius: 18.350000381469727,
    },
    {
        x: 1564.5,
        y: 807.5,
        radius: 19.399999618530273,
    },
    {
        x: 147.5,
        y: 880.5,
        radius: 18.350000381469727,
    },
    {
        x: 201.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 252.5,
        y: 880.5,
        radius: 18.350000381469727,
    },
    {
        x: 305.5,
        y: 881.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 880.5,
        radius: 19,
    },
    {
        x: 409.5,
        y: 880.5,
        radius: 19.100000381469727,
    },
    {
        x: 461.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 514.5,
        y: 881.5,
        radius: 19.100000381469727,
    },
    {
        x: 672.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 726.5,
        y: 880.5,
        radius: 18.350000381469727,
    },
    {
        x: 777.5,
        y: 881.5,
        radius: 19.399999618530273,
    },
    {
        x: 830.5,
        y: 880.5,
        radius: 19,
    },
    {
        x: 882.5,
        y: 880.5,
        radius: 18.350000381469727,
    },
    {
        x: 936.5,
        y: 881.5,
        radius: 19.399999618530273,
    },
    {
        x: 986.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 1040.5,
        y: 880.5,
        radius: 18.350000381469727,
    },
    {
        x: 1199.5,
        y: 881.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 881.5,
        radius: 19.100000381469727,
    },
    {
        x: 1302.5,
        y: 881.5,
        radius: 19.399999618530273,
    },
    {
        x: 1356.5,
        y: 880.5,
        radius: 18.350000381469727,
    },
    {
        x: 1407.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 1459.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 1512.5,
        y: 881.5,
        radius: 18.350000381469727,
    },
    {
        x: 1566.5,
        y: 880.5,
        radius: 19.399999618530273,
    },
    {
        x: 148.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 200.5,
        y: 953.5,
        radius: 18.799999237060547,
    },
    {
        x: 252.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 305.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 357.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 409.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 462.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 514.5,
        y: 954.5,
        radius: 19.100000381469727,
    },
    {
        x: 673.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 725.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 778.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 830.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 882.5,
        y: 953.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 953.5,
        radius: 19,
    },
    {
        x: 987.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 1039.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 1199.5,
        y: 953.5,
        radius: 18.350000381469727,
    },
    {
        x: 1251.5,
        y: 953.5,
        radius: 19,
    },
    {
        x: 1303.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 1356.5,
        y: 954.5,
        radius: 18.350000381469727,
    },
    {
        x: 1408.5,
        y: 953.5,
        radius: 19,
    },
    {
        x: 1460.5,
        y: 953.5,
        radius: 19,
    },
    {
        x: 1513.5,
        y: 953.5,
        radius: 18.350000381469727,
    },
    {
        x: 1565.5,
        y: 953.5,
        radius: 19,
    },
    {
        x: 147.5,
        y: 1026.5,
        radius: 18.350000381469727,
    },
    {
        x: 200.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 252.5,
        y: 1026.5,
        radius: 19,
    },
    {
        x: 304.5,
        y: 1026.5,
        radius: 18.350000381469727,
    },
    {
        x: 357.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 409.5,
        y: 1026.5,
        radius: 19,
    },
    {
        x: 462.5,
        y: 1027.5,
        radius: 18.350000381469727,
    },
    {
        x: 514.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 673.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 725.5,
        y: 1026.5,
        radius: 19.100000381469727,
    },
    {
        x: 778.5,
        y: 1026.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 883.5,
        y: 1027.5,
        radius: 19.399999618530273,
    },
    {
        x: 935.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 1026.5,
        radius: 19.100000381469727,
    },
    {
        x: 1039.5,
        y: 1027.5,
        radius: 18.350000381469727,
    },
    {
        x: 1198.5,
        y: 1027.5,
        radius: 19.399999618530273,
    },
    {
        x: 1251.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 1355.5,
        y: 1026.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 1460.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 1512.5,
        y: 1025.5,
        radius: 19.399999618530273,
    },
    {
        x: 1565.5,
        y: 1026.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 1099.5,
        radius: 19,
    },
    {
        x: 200.5,
        y: 1099.5,
        radius: 18.600000381469727,
    },
    {
        x: 252.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 305.5,
        y: 1099.5,
        radius: 19,
    },
    {
        x: 357.5,
        y: 1099.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 1099.5,
        radius: 19,
    },
    {
        x: 462.5,
        y: 1100.5,
        radius: 18.350000381469727,
    },
    {
        x: 514.5,
        y: 1099.5,
        radius: 18.600000381469727,
    },
    {
        x: 673.5,
        y: 1099.5,
        radius: 18.600000381469727,
    },
    {
        x: 725.5,
        y: 1099.5,
        radius: 19,
    },
    {
        x: 778.5,
        y: 1099.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 882.5,
        y: 1099.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 1100.5,
        radius: 18.350000381469727,
    },
    {
        x: 987.5,
        y: 1100.5,
        radius: 18.350000381469727,
    },
    {
        x: 1039.5,
        y: 1099.5,
        radius: 19.100000381469727,
    },
    {
        x: 1198.5,
        y: 1099.5,
        radius: 19.100000381469727,
    },
    {
        x: 1251.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 1355.5,
        y: 1099.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 1460.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 1512.5,
        y: 1099.5,
        radius: 18.25,
    },
    {
        x: 1565.5,
        y: 1099.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 200.5,
        y: 1171.5,
        radius: 19.399999618530273,
    },
    {
        x: 252.5,
        y: 1172.5,
        radius: 18.799999237060547,
    },
    {
        x: 305.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 357.5,
        y: 1172.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 462.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 514.5,
        y: 1171.5,
        radius: 19.399999618530273,
    },
    {
        x: 673.5,
        y: 1171.5,
        radius: 19.399999618530273,
    },
    {
        x: 725.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 778.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 1172.5,
        radius: 18.600000381469727,
    },
    {
        x: 882.5,
        y: 1172.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 1172.5,
        radius: 18.799999237060547,
    },
    {
        x: 987.5,
        y: 1172.5,
        radius: 18.600000381469727,
    },
    {
        x: 1039.5,
        y: 1172.5,
        radius: 19,
    },
    {
        x: 1199.5,
        y: 1172.5,
        radius: 19.100000381469727,
    },
    {
        x: 1251.5,
        y: 1172.5,
        radius: 18.799999237060547,
    },
    {
        x: 1303.5,
        y: 1172.5,
        radius: 18.600000381469727,
    },
    {
        x: 1356.5,
        y: 1172.5,
        radius: 19.100000381469727,
    },
    {
        x: 1408.5,
        y: 1172.5,
        radius: 18.600000381469727,
    },
    {
        x: 1460.5,
        y: 1172.5,
        radius: 18.799999237060547,
    },
    {
        x: 1512.5,
        y: 1172.5,
        radius: 19.100000381469727,
    },
    {
        x: 1565.5,
        y: 1172.5,
        radius: 18.799999237060547,
    },
    {
        x: 148.5,
        y: 1245.5,
        radius: 19,
    },
    {
        x: 199.5,
        y: 1245.5,
        radius: 19.399999618530273,
    },
    {
        x: 252.5,
        y: 1245.5,
        radius: 18.799999237060547,
    },
    {
        x: 305.5,
        y: 1245.5,
        radius: 19,
    },
    {
        x: 357.5,
        y: 1245.5,
        radius: 18.600000381469727,
    },
    {
        x: 409.5,
        y: 1244.5,
        radius: 19.399999618530273,
    },
    {
        x: 462.5,
        y: 1246.5,
        radius: 19.399999618530273,
    },
    {
        x: 514.5,
        y: 1245.5,
        radius: 18.600000381469727,
    },
    {
        x: 673.5,
        y: 1246.5,
        radius: 19.399999618530273,
    },
    {
        x: 725.5,
        y: 1245.5,
        radius: 19,
    },
    {
        x: 778.5,
        y: 1245.5,
        radius: 19,
    },
    {
        x: 830.5,
        y: 1245.5,
        radius: 18.600000381469727,
    },
    {
        x: 883.5,
        y: 1245.5,
        radius: 19.100000381469727,
    },
    {
        x: 935.5,
        y: 1245.5,
        radius: 18.799999237060547,
    },
    {
        x: 986.5,
        y: 1245.5,
        radius: 19.399999618530273,
    },
    {
        x: 1039.5,
        y: 1245.5,
        radius: 19,
    },
];
