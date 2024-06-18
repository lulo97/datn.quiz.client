enum NumericToAlpha {
    "a" = 1,
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
}

const ColorRange = ["300", "400", "500", "600", "700", "800", "900", "950", "950"];

export function AnswerBubble(props: { isAlpha: boolean; num: number }) {
    const isFill = Math.round(Math.random()) ? true : false;
    const randomGray = `bg-gray-${ColorRange[Math.floor(Math.random()*ColorRange.length)]}`;
    const fillColor = isFill ? randomGray : "";

    return (
        <div
            className={`w-4 h-4 border border-black flex items-center justify-center rounded-full text-xs ${fillColor}`}
        >
            {props.isAlpha ? NumericToAlpha[props.num + 1] : props.num}
        </div>
    );
}
