import dayjs from "dayjs";

export function canStartPlayQuiz(StartQuizTime: string) {
    const StartQuizTimeObject = dayjs(StartQuizTime);
    const currentTime = dayjs();
    const diffMilliseconds = StartQuizTimeObject.diff(currentTime);
    if (diffMilliseconds >= 0) return false
    return true
}