import { QuizSubjectCard } from "@/PageQuizSubject/QuizSubjectCard";

export function Content() {
    return (
        <div className="overflow-y-scroll h-screen border p-3 flex flex-col gap-5">
            <QuizSubjectCard />
            <QuizSubjectCard />
            <QuizSubjectCard />
            <QuizSubjectCard />
            <QuizSubjectCard />
            <QuizSubjectCard />
        </div>
    );
}
