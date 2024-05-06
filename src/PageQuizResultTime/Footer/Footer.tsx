import QuizCardCollection from "@/PageHomepage/Content/QuizCardCollection";

export default function Footer() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <QuizCardCollection label="Các đề liên quan" />
            <div>Comment</div>
        </div>
    );
}
