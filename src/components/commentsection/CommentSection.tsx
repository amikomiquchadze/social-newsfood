import { useEffect, useState } from "react";
import * as S from "./CommentSection.styled";
import api from "../../api";
import { useUser } from "../../contexts/UserContext";
import { CreateCommentPayload } from "../../api/models/payload/comment";
import { Comment } from "../../api/models/response/comment";
import CommentItem from "./components/comentitem/CommentItem";


interface Props {
  postId: number;
  postReload: any;
  reactionOptions: any;
}

export default function CommentSection({
  postId,
  postReload,
  reactionOptions,
}: Props) {
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

  //to refetch totalComments on Posts
  const reloadComments = () => {
    loadComments();
    postReload();
    console.log("section");
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
      loadComments();
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
          reactionOptions={reactionOptions}
          key={comment.CommentID}
          comment={comment}
          onRefresh={reloadComments}
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

      <S.CommentBoxWrapper>
        <S.Input
          placeholder="Write your comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <S.Button onClick={handleSubmit}>Comment</S.Button>
      </S.CommentBoxWrapper>
    </S.Section>
  );
}
