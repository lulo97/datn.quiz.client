interface SubjectProps {
    SubjectId: string,
}

export default function Subject(props: SubjectProps) {
    const { SubjectId } = props
    return (
        <div>
            {SubjectId}
        </div>
    )
}