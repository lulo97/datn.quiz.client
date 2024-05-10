interface MyMenuItemProps {
    children: JSX.Element | string;
    onClick?: (event: any) => void;
    key?: string;
}

export default function MyMenuItem(props: MyMenuItemProps) {
    return (
        <div className="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm hover:bg-slate-100">
            {props.children}
        </div>
    );
}
