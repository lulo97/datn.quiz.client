import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import QuizCard from "./QuizCard";

export default function Content() {
    return (
        <Card>
            <CardHeader>
                <div className="text-center pt-5 italic">
                    Khám phá ngân hàng đề thi thú vị trên hệ thống trắc nghiệm
                    QuizQuest
                </div>

                <div className="pt-10">
                    <Label>Mới nổi</Label>
                    <CardHeader className="border rounded-lg flex flex-row">
                        <div className="flex flex-row items-center justify-between gap-2 w-11/12">
                            <QuizCard />
                            <QuizCard />
                            <QuizCard />
                            <QuizCard />
                            <QuizCard />
                        </div>
                        <div className="w-1/12 flex items-center justify-end">
                            <ChevronRight size={64} />
                        </div>
                    </CardHeader>
                </div>

                <div className="pt-10">
                    <Label>Chơi nhiều nhất</Label>
                    <CardHeader className="border rounded-lg flex flex-row">
                        <div className="flex flex-row items-center justify-between gap-2 w-11/12">
                            <QuizCard />
                            <QuizCard />
                            <QuizCard />
                            <QuizCard />
                            <QuizCard />
                        </div>
                        <div className="w-1/12 flex items-center justify-end">
                            <ChevronRight size={64} />
                        </div>
                    </CardHeader>
                </div>
            </CardHeader>
        </Card>
    );
}
