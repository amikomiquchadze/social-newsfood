import { useState } from "react";
import CommentItem from "../comentitem/CommentItem";
import * as S from "./CommentSection.styled";
import api from "../../api";
import { useUser } from "../../contexts/UserContext";
import { CreateCommentPayload } from "../../api/rest/comment";

export interface Comment {
  id: any;
  postId: number;
  parentId: number | null;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface Props {
  comments: Comment[];
  onAddComment?: (content: string, parentId: number | null) => void;
  postId: number;
}

export default function CommentSection({
  comments,
  onAddComment,
  postId,
}: Props) {
  const [text, setText] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const { currentUser } = useUser();
  const generateSafeID = () => Math.floor(Math.random() * 2_000_000_000);

  const handleSubmit = async () => {
    if (currentUser && text.trim()) {
      const newComment: CreateCommentPayload = {
        PostID: postId,
        Content: text.trim(),
      };
      await api.comments.createComment(newComment);

      // setLocalComments((prev) => [...prev, newComment]);
      // onAddComment?.(text.trim(), null);
      // setText("");
    }
  };

  const handleAddReply = (replyText: string, parentId: number) => {
    const newReply: Comment = {
      id: generateSafeID(),
      postId: 1,
      parentId,
      authorName: "You",
      authorRole: "Frontend Developer",
      avatarUrl: "/avatars/you.jpg",
      content: replyText,
      createdAt: "just now",
    };

    setLocalComments((prev) => [...prev, newReply]);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.comments.deleteComment(commentId);
      setLocalComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const topLevelComments = localComments.filter((c) => c.parentId === null);

  return (
    <S.Section>
      {topLevelComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          comments={localComments}
          onAddReply={handleAddReply}
          onDeleteComment={handleDeleteComment}
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
