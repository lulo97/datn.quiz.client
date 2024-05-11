import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = () => {
    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
        }
    }, [webcamRef]);

    return (
        <>
            {isCaptureEnable && (
                <>
                    <Button
                        className="w-full"
                        onClick={() => setCaptureEnable(false)}
                    >
                        Kết thúc
                    </Button>
                    <div>
                        <Webcam
                            audio={false}
                            width="full"
                            height={360}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </div>
                    <Button className="w-full" onClick={capture}>
                        Chụp
                    </Button>
                </>
            )}
            {isCaptureEnable || (
                <Button
                    className="w-full"
                    onClick={() => setCaptureEnable(true)}
                >
                    Bắt đầu
                </Button>
            )}
            {url && (
                <>
                    <div>
                        <Button
                            className="w-full"
                            onClick={() => {
                                setUrl(null);
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                    <div>
                        <img src={url} alt="Screenshot" />
                    </div>
                </>
            )}
        </>
    );
};
