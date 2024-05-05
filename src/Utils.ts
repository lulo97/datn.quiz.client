//Pure function: Not change input or state of system and always return output

export function getObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

export function initialAnswer() {
    return { id: getObjectId(), content: "", correct: false }
}

//Tailwind don't allow for dynamic className change
//export const ModalSizeClass = `min-h-[calc(100vh*${ModalWidthScale})] min-w-[calc(100vw*${ModalWidthHeight})]`
export const ModalSizeClass = `min-w-[95%] min-h-[90%]`

export const CardParentClass = `p-2 bg-gray-200`