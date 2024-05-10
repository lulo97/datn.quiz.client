interface MyMenubarItemProps {
    children: JSX.Element | string;
    onClick?: (event: any) => void;
    key?: string;
}

export function MyMenubarItem(props: MyMenubarItemProps) {
    return (
        <div className="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm hover:bg-slate-100">
            {props.children}
        </div>
    );
}
