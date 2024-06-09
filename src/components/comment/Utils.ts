import { Comment, DownvoteComment, UpvoteComment, User } from "@/InterfacesDatabase";

export interface CommentDetail extends Comment {
    Replies: CommentDetail[];
    Upvotes: UpvoteComment[];
    Downvotes: DownvoteComment[];
    User: User;
}

export interface CommentSectionProps {
    comments: CommentDetail[],
    currentUser: User,
    QuizId: string,
    fetchData: () => Promise<void>
}

export interface CommentCardProps {
    comment: CommentDetail,
    currentUser: User,
    QuizId: string,
    fetchData: () => Promise<void>
}