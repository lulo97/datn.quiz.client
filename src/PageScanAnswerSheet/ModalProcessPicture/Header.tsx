import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { wrapImageByPoints } from "../Utils/wrapImageByPoints";
import {
    PropsScanAnswerSheet,
    calculateScaledPoints,
    getUserResponseDetail,
} from "../Utils/Utils";
import _ from "lodash";
import { getResponse } from "../Utils/getResponse";
import { getQuizId } from "../Utils/getQuizId";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { getAllByQuizId } from "@/api/QuestionDetail";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function Header(props: PropsScanAnswerSheet) {
    const {
        setFile,
        parentRef,
        positions,
        setCroppedImg,
        imageRefFromFile,
        setUserResponseDetail,
        userResponseDetail,
        dataASR,
        setDataASR,
    } = props;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
            const reader = new FileReader();
            reader.onload = function (e) {
                imageRefFromFile.current.src = reader.result as string;
            };
            reader.readAsDataURL(files[0]);
        }
    }

    function handleProcessImage() {
        if (!parentRef) return;
        const scaled_points = calculateScaledPoints(
            positions,
            imageRefFromFile.current,
            parentRef
        );
        wrapImageByPoints(
            imageRefFromFile.current,
            scaled_points.map((ele) => [ele.x, ele.y])
        ).then((dataUrl) => {
            setCroppedImg(dataUrl);
            fetchData(dataUrl);
        });
    }

    function handleAddDataASR() {
        if (userResponseDetail) {
            setDataASR([...dataASR, userResponseDetail]);
            toast.success("Thêm thành công");
            return;
        }
        toast.warning("Dữ liệu người chơi rỗng!");
    }

    async function fetchData(dataUrl: any) {
        const id = toast.loading("Xử lý ảnh...");
        const QuizId = await getQuizId(dataUrl);
        if (!QuizId) {
            toast.update(id, {
                render: "Không tìm thấy mã đề!",
                type: "warning",
                isLoading: false,
                autoClose: 2000,
            });
            return;
        }
        const Questions: QuestionDetail[] = await getAllByQuizId(QuizId);
        const userResponse = await getResponse(
            dataUrl,
            400
            //Questions.length * 8
        );
        if (userResponse.STT.includes("_")) {
            toast.update(id, {
                render: "Nhận diện mã đề lỗi!",
                type: "warning",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (!userResponse.STT) {
            toast.update(id, {
                render: "Không tìm thấy mã người làm đề!",
                type: "warning",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (!userResponse.Answers) {
            toast.update(id, {
                render: "Không tìm thấy đáp án được chọn!",
                type: "warning",
                isLoading: false,
                autoClose: 2000,
            });
            return;
        }
        const userResponseDetail = getUserResponseDetail(
            Questions,
            userResponse
        );
        console.log(userResponseDetail);
        setUserResponseDetail(userResponseDetail);
        toast.update(id, {
            render: "Xử lý ảnh thành công!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
    }

    return (
        <div className="flex justify-between h-fit">
            <div className="flex w-full justify-between">
                <div className="flex gap-5">
                    <Button>Chụp</Button>
                    <Input
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleChange(e)}
                    />
                    <Button onClick={handleProcessImage}>Xử lý ảnh</Button>
                </div>
                <Button onClick={handleAddDataASR} className="mr-5">
                    Thêm dữ liệu
                </Button>
            </div>
        </div>
    );
}
