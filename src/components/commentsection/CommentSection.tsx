import { useEffect, useState } from "react";
import CommentItem from "../comentitem/CommentItem";
import * as S from "./CommentSection.styled";
import api from "../../api";
import { useUser } from "../../contexts/UserContext";
import { CreateCommentPayload } from "../../api/rest/comment";

export interface Comment {
  CommentID: number;
  ParentCommentID: number | null;
  PostID: number;
  AuthorID: number;
  AuthorFirstName: string;
  AuthorLastName: string;
  AuthorAvatar?: string | null;
  Content: string;
  CreateTime: string;
  IsAuthor: boolean;
  TotalReactions: number;
  TotalReplies: number;
  UserReaction: string | null;
  Reactions: Record<string, number>;
  Comments: Comment[]; // nested replies
}

interface Props {
  postId: number;
}

export default function CommentSection({ postId }: Props) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { currentUser } = useUser();

  useEffect(() => {

    loadComments();
  }, [postId]);
  const loadComments = async () => {
    try {
      const resp = await api.comments.getCommentsByPostId(postId);
      if (resp) {
        setComments(resp);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };
  const handleSubmit = async () => {
    if (!text.trim() || !currentUser) return;

    const payload: CreateCommentPayload = {
      PostID: postId,
      Content: text.trim(),
    };

    try {
      await api.comments.createComment(payload);
      setText("");
      await loadComments();
    } catch (err) {
      console.error("Comment create failed", err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.comments.deleteComment(commentId);
      setComments((prev) =>
        prev
          .map((comment) => ({
            ...comment,
            Comments: comment.Comments.filter((c) => c.CommentID !== commentId),
          }))
          .filter((c) => c.CommentID !== commentId)
      );
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <S.Section>
      {comments.map((comment) => (
        <CommentItem
          key={comment.CommentID}
          comment={comment}
          onDeleteComment={handleDeleteComment}
          onReplySuccess={(newReply, parentId) => {
            setComments((prev) =>
              prev.map((c) =>
                c.CommentID === parentId
                  ? { ...c, Comments: [...(c.Comments || []), newReply] }
                  : c
              )
            );
          }}
        />
      ))}

      <S.Input
        placeholder="Write your comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <S.Button onClick={handleSubmit}>Post</S.Button>
    </S.Section>
  );
}
