interface Props {
    MaxPage: number,
    PageIdx: number
}
export function Footer(props: Props) {
    const {MaxPage, PageIdx} = props;
    return (<div className="w-full mt-2 flex justify-center italic">Trang {PageIdx}/{MaxPage}</div>)
}