import { Answer } from "@/Interfaces";
import { initialAnswer } from "@/Utils";

export class AnswersStateController {
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;

    constructor(answers: Answer[], setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>) {
        this.answers = answers;
        this.setAnswers = setAnswers;
    }

    addAnswer = () => {
        this.setAnswers([...this.answers, initialAnswer()]);
    };

    deleteAnswer = (answer_id: string) => {
        const newAnswers = this.answers.filter((ele) => ele.id !== answer_id);
        this.setAnswers(newAnswers);
    };

    updateAnswerContent = (id: string, newContent: string) => {
        const updatedAnswers = this.answers.map((ele) => {
            if (ele.id === id) return { ...ele, content: newContent };
            return ele;
        });
        this.setAnswers(updatedAnswers);
    };

    updateAnswerCorrect = (id: string) => {
        const updatedAnswers = this.answers.map((ele) => {
            if (ele.id === id) return { ...ele, correct: !ele.correct };
            return ele;
        });
        this.setAnswers(updatedAnswers);
    };
}