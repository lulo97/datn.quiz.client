import { Star } from "lucide-react";

export function Stars({ score }: { score: number }) {
    const filledStars = Array.from(Array(score).keys());
    const emptyStars = Array.from(Array(5 - score).keys());

    return (
        <div className="flex items-center">
            <div className="text-gray-500 text-sm mr-1">{score}</div>
            {filledStars.map((_, index) => (
                <Star key={`filled-${index}`} fill="yellow" />
            ))}
            {emptyStars.map((_, index) => (
                <Star key={`empty-${index}`} fill="none" />
            ))}
        </div>
    );
}