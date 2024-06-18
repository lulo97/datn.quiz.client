export function wrapImageByPoints(img, points) {
    return new Promise((resolve, reject) => {
        //console.log("Image onload event triggered.");
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        //console.log("Image natural dimensions - width:", width, "height:", height);

        const output_corners = [
            [0, 0],
            [width, 0],
            [0, height],
            [width, height],
        ];

        //console.log("points:", points);
        //console.log("Output corners:", output_corners);

        // Convert points to a format expected by OpenCV.js
        const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, points.flat());
        //console.log(srcPoints);
        const dstPoints = cv.matFromArray(
            4,
            1,
            cv.CV_32FC2,
            output_corners.flat()
        );

        const perspectiveTransform = cv.getPerspectiveTransform(
            srcPoints,
            dstPoints
        );
        //console.log("Perspective transformation matrix:", perspectiveTransform);

        const warpedImage = new cv.Mat();

        // Convert img to Mat format
        //console.log("IMPORTANT:", img);

        // Create an HTMLImageElement
        var img2 = new Image();

        // Set the src attribute with the base64 string
        img2.src = img.src;

        img2.onload = function () {
            const warpedImage = new cv.Mat();
            //warpPerspective accept Mat instead of HTMLImageElement
            const imgMat = cv.imread(img2);
            //console.log("Image converted to Mat format:", imgMat);

            // Perform warpPerspective operation
            cv.warpPerspective(
                imgMat,
                warpedImage,
                perspectiveTransform,
                new cv.Size(width + 1, height + 1) // Size of the output image
            );
            //console.log("warpPerspective operation performed.");

            // Create canvas placeholder for warped image
            const canvas = document.createElement("canvas");
            cv.imshow(canvas, warpedImage);
            //console.log("Warped image displayed on canvas.");

            // Get base64 data image
            const dataUrl = canvas.toDataURL();

            // Clean up allocated memory
            srcPoints.delete();
            dstPoints.delete();
            perspectiveTransform.delete();
            warpedImage.delete();
            //console.log("Memory cleaned up.");

            resolve(dataUrl);
        };
    });
}
