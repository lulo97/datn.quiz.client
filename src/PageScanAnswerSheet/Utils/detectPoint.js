export function detectPoint(img) {
    return new Promise((resolve, reject) => {
        //console.log("Start detectpoint function");
        img.onload = function() {
            const imgMat = cv.imread(img);
            //console.log("Image read");

            const gray = new cv.Mat();
            //console.log("Empty gray Mat created");
    
            cv.cvtColor(imgMat, gray, cv.COLOR_RGBA2GRAY);
            //console.log("Image converted to grayscale");
    
            const blur = new cv.Mat();
            //console.log("Empty blur Mat created");
    
            cv.GaussianBlur(gray, blur, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
            //console.log("Image blurred");
    
            const thresh = new cv.Mat();
            //console.log("Empty threshold Mat created");
    
            cv.threshold(blur, thresh, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
            //console.log("Image thresholded");
    
            let contours = new cv.MatVector();
            //console.log("Empty contours MatVector created");
    
            let hierarchy = new cv.Mat();
            //console.log("Empty hierarchy Mat created");
    
            cv.findContours(
                thresh,
                contours,
                hierarchy,
                cv.RETR_CCOMP,
                cv.CHAIN_APPROX_SIMPLE
            );
            //console.log("Contours found");
    
            let maxArea = 0;
            let maxContourIndex = -1;
            for (let i = 0; i < contours.size(); ++i) {
                let contourArea = cv.contourArea(contours.get(i));
                if (contourArea > maxArea) {
                    maxArea = contourArea;
                    maxContourIndex = i;
                }
            }
            //console.log("Maximum contour found");
    
            const maxContour = contours.get(maxContourIndex);
            //console.log("Maximum contour retrieved");
    
            const points = getCornerPoints(maxContour);
            //console.log("Corner points calculated");
    
            //console.log(points);
    
            imgMat.delete();
            //console.log("Image Mat deleted");
            gray.delete();
            //console.log("Gray Mat deleted");
            blur.delete();
            //console.log("Blur Mat deleted");
            thresh.delete();
            //console.log("Threshold Mat deleted");
            contours.delete();
            //console.log("Contours MatVector deleted");
            hierarchy.delete();
            //console.log("Hierarchy Mat deleted");
    
            resolve(points);
        }
    });
}

function getDistance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function getCornerPoints(contour) {
    let points = [];
    let rect = cv.minAreaRect(contour);

    const center = rect.center;

    let topLeftPoint, topRightPoint, bottomLeftPoint, bottomRightPoint;
    let topLeftDistance = 0;
    let topRightDistance = 0;
    let bottomLeftDistance = 0;
    let bottomRightDistance = 0;

    for (let i = 0; i < contour.data32S.length; i += 2) {
        const point = { x: contour.data32S[i], y: contour.data32S[i + 1] };
        const distance = getDistance(point, center);
        if (point.x < center.x && point.y < center.y) {
            if (distance > topLeftDistance) {
                topLeftPoint = point;
                topLeftDistance = distance;
            }
        } else if (point.x > center.x && point.y < center.y) {
            if (distance > topRightDistance) {
                topRightPoint = point;
                topRightDistance = distance;
            }
        } else if (point.x < center.x && point.y > center.y) {
            if (distance > bottomLeftDistance) {
                bottomLeftPoint = point;
                bottomLeftDistance = distance;
            }
        } else if (point.x > center.x && point.y > center.y) {
            if (distance > bottomRightDistance) {
                bottomRightPoint = point;
                bottomRightDistance = distance;
            }
        }
    }

    points.push(topLeftPoint);
    points.push(topRightPoint);
    points.push(bottomRightPoint);
    points.push(bottomLeftPoint);
    return points;
}