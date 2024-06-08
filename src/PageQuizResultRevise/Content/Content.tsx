import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getRandomWallpaper } from "@/Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

function QuizResultCard() {
    return (
        <div className="flex flex-col gap-5 ">
            <Card>
                <CardHeader>
                    <Label>Câu 1: Con gì bơi nhanh nhất?</Label>
                </CardHeader>
                <CardContent className="flex gap-5">
                    <div className="w-1/2 overflow-y-auto h-72 flex flex-col gap-3 p-2 border rounded-lg">
                        <div className="flex items-center gap-5 border px-3 py-1 rounded-lg bg-green-300">
                            <Checkbox />
                            <p>Con cá</p>
                        </div>

                        <div className="flex items-center gap-5 border px-3 py-1 rounded-lg bg-red-300">
                            <Checkbox checked />
                            <p>Con mèo</p>
                        </div>
                        <div className="flex items-center gap-5 border px-3 py-1 rounded-lg bg-green-300">
                            <Checkbox checked />
                            <p>Con chó</p>
                        </div>
                        <div className="flex items-center gap-5 border px-3 py-1 rounded-lg">
                            <Checkbox />
                            <p>Con gà</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <img
                            className="object-contain rounded-lg"
                            src={getRandomWallpaper()}
                        ></img>
                        <audio controls className="w-full mt-5">
                            <source
                                type="audio/ogg"
                                src="https://www.w3schools.com/tags/horse.ogg"
                            ></source>
                        </audio>
                    </div>
                </CardContent>
                <CardContent>
                    <Label>Giải thích</Label>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel nemo dolorem hic tempora unde quae, magnam
                        voluptatibus. Ab quaerat repudiandae nihil assumenda
                        repellendus, rem minus accusantium, corrupti enim, harum
                        odio!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export function Content(Quiz: QuizDetail) {
    return (
        <div>
            <Card className="bg-gray-200">
                <CardHeader className="flex flex-col gap-3">
                    <QuizResultCard />
                    <QuizResultCard />
                    <QuizResultCard />
                </CardHeader>
            </Card>
        </div>
    );
}
