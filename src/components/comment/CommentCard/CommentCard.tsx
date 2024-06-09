import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, MySQLDatetimeFormat } from "@/Utils";
import { CommentCardProps } from "../Utils";
import { ReplyInput } from "./ReplyInput";
import { useState } from "react";
import { VoteCard } from "./VoteCard";
import { EditDeletePopover } from "./EditDeletePopover";
const API_URL = BACKEND_URL + "public/Image/DummyImage.png";

export function CommentCard(props: CommentCardProps) {
    const { comment, currentUser, QuizId, fetchData } = props;

    const isCurrentUserComment = comment.CreateUserId == currentUser.UserId;

    const [isReply, setIsReply] = useState(false);
    return (
        <div>
            <div className="mt-3 flex items-start justify-between gap-1">
                <Avatar className="border mt-2">
                    <AvatarImage src={comment.User.ImageUrl || API_URL} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="w-full">
                    <div className="border rounded-lg bg-gray-100 h-full w-full px-2 py-1">
                        <div className="flex justify-between">
                            <div>{comment.Content}</div>
                            <div>
                                {isCurrentUserComment && (
                                    <EditDeletePopover
                                        fetchData={fetchData}
                                        QuizId={QuizId}
                                        comment={comment}
                                        currentUser={currentUser}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <VoteCard
                                fetchData={fetchData}
                                comment={comment}
                                currentUser={currentUser}
                                QuizId={QuizId}
                            />
                            <Button
                                onClick={() => setIsReply(!isReply)}
                                className="p-0 m-0 h-fit"
                                variant="link"
                            >
                                Phản hồi
                            </Button>

                            <div className="text-sm text-gray-500">
                                {MySQLDatetimeFormat(comment.CreatedAt)}
                            </div>
                        </div>
                    </div>

                    {isReply && (
                        <ReplyInput
                            fetchData={fetchData}
                            comment={comment}
                            currentUser={currentUser}
                            QuizId={QuizId}
                        />
                    )}
                </div>
            </div>

            {comment.Replies.map((ele) => (
                <div key={ele.CommentId} className="ml-10">
                    <CommentCard
                        fetchData={fetchData}
                        comment={ele}
                        currentUser={currentUser}
                        QuizId={QuizId}
                    />
                </div>
            ))}
        </div>
    );
}
