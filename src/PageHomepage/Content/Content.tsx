import { Card, CardHeader } from "@/components/ui/card";
import { QuizCardCollection } from "./QuizCardCollection";

export function Content() {
    return (
        <Card>
            <CardHeader>
                <div className="text-center pt-5 italic">
                    Khám phá ngân hàng đề thi thú vị trên hệ thống trắc nghiệm
                    QuizQuest
                </div>

                <div className="pt-10">
                    <QuizCardCollection label="Mới nổi" />
                </div>

                <div className="pt-10">
                    <QuizCardCollection label="Chơi nhiều nhất" />
                </div>
            </CardHeader>
        </Card>
    );
}
