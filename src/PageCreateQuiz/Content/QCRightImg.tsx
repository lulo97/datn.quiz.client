import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { getDummyImage } from "@/Utils";

export function QCRightImg(question: QuestionDetail) {
    const src_img =
        question.ImageUrl != "" ? question.ImageUrl : getDummyImage();
    return (
        <img
            className="object-contain w-full rounded-lg max-h-[200px]"
            // src={question.ImageUrl ? question.ImageUrl : ""}
            src={src_img != null ? src_img : getDummyImage()}
        ></img>
    );
}
