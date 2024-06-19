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

const ColorRange = [
    "#f7fafc",
    "#edf2f7",
    "#e2e8f0",
    "#cbd5e1",
    "#a0aec0",
    "#718096",
    "#4a5568",
    "#2d3748",
    "#1f2933",
    "#151a21",
    "#1a202c",
];

export function AnswerBubble(props: { isAlpha: boolean; num: number }) {
    const isFill = Math.round(Math.random()) ? true : false;
    const randomGray =
        ColorRange[Math.floor(Math.random() * ColorRange.length)];
    const fillColor = isFill ? randomGray : "";

    return (
        <div
            style={{ backgroundColor: fillColor }}
            className={`w-4 h-4 border border-black flex items-center justify-center rounded-full text-xs ${fillColor}`}
        >
            {props.isAlpha ? NumericToAlpha[props.num + 1] : props.num}
        </div>
    );
}
