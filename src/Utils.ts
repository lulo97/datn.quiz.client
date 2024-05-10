//Pure function: Not change input or state of system and always return output

export function getObjectId() {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
                return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
    );
}

export function initialAnswer() {
    return { id: getObjectId(), content: "", correct: false };
}

//Tailwind don't allow for dynamic className change
//export const ModalSizeClass = `min-h-[calc(100vh*${ModalWidthScale})] min-w-[calc(100vw*${ModalWidthHeight})]`
export const ModalSizeClass = `min-w-[95%] min-h-[90%]`;

export const CardParentClass = `p-2 bg-gray-200`;

export function getRandomDate(): string {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);

    const day = randomDate.getDate().toString().padStart(2, "0");
    const month = (randomDate.getMonth() + 1).toString().padStart(2, "0");
    const year = randomDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

export function strToDate(date: string): Date {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);

}