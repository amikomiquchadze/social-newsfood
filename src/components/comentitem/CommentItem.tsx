import { useState } from "react";
import * as S from "./ComentItem.styled";
import { ReactComponent as EditIcon } from "../../assets/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/TrashIcon.svg";
import api from "../../api";

export interface Comment {
  CommentID: number;
  ParentCommentID: number | null;
  PostID: number;
  AuthorID: number;
  AuthorFirstName: string;
  AuthorLastName: string;
  AuthorAvatar?: string | null;
  Content: string;
  IsAuthor: boolean;
  TotalReactions: number;
  TotalReplies: number;
  UserReaction: string | null;
  CreateTime: string;
  Reactions: Record<string, number>;
  Comments: Comment[];
}

interface Props {
  comment: Comment;
  onDeleteComment: (commentId: number) => void;
  onReplySuccess: (newReply: Comment, parentId: number) => void;
  onRefresh?: () => void;
}

export default function CommentItem({
  comment,
  onDeleteComment,
  onReplySuccess,
  onRefresh,
}: Props) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    onDeleteComment(comment.CommentID);
    setMenuOpen(false);
  };

  const handleReply = async () => {
    if (replyText.trim()) {
      try {
        const newReply = await api.comments.createReply(
          comment.CommentID,
          replyText.trim()
        );
        if (onRefresh) onRefresh();
        onReplySuccess(newReply, comment.CommentID);
        setReplyText("");
        setShowReplyInput(false);
        setShowReplies(true);
      } catch (err) {
        console.error("Reply failed", err);
      }
    }
  };

  return (
    <S.Container level={comment.ParentCommentID ? 1 : 0}>
      <S.Header>
        <S.Avatar src={comment.AuthorAvatar || "/avatars/default.jpg"} />
        <div style={{ flex: 1 }}>
          <S.Author>{`${comment.AuthorFirstName} ${comment.AuthorLastName}`}</S.Author>
          <S.Role>{comment.IsAuthor ? "You" : "User"}</S.Role>
        </div>

        {comment.IsAuthor && (
          <S.MenuWrapper>
            <S.DotsButton onClick={() => setMenuOpen((prev) => !prev)}>
              ⋯
            </S.DotsButton>
            {menuOpen && (
              <S.Dropdown>
                <S.DropdownItem
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(false);
                  }}
                >
                  <S.IconPlaceholder>
                    <EditIcon width={16} height={16} />
                  </S.IconPlaceholder>{" "}
                  Edit
                </S.DropdownItem>
                <S.DropdownItem danger onClick={handleDelete}>
                  <S.IconPlaceholder>
                    <DeleteIcon width={16} height={16} />
                  </S.IconPlaceholder>{" "}
                  Delete
                </S.DropdownItem>
              </S.Dropdown>
            )}
          </S.MenuWrapper>
        )}
      </S.Header>

      <S.Body>
        {expanded || comment.Content.length <= 100
          ? comment.Content
          : `${comment.Content.slice(0, 100)}... `}
        {comment.Content.length > 100 && (
          <S.ToggleButton onClick={() => setExpanded(!expanded)}>
            {expanded ? "See less" : "See more"}
          </S.ToggleButton>
        )}
      </S.Body>

      <S.Actions>
        <span>Like</span>
        <span onClick={() => setShowReplyInput(!showReplyInput)}>Reply</span>
      </S.Actions>

      {showReplyInput && (
        <>
          <S.ReplyInput
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <S.Button onClick={handleReply}>Reply</S.Button>
        </>
      )}

      {comment.Comments?.length > 0 && !showReplies && (
        <S.ShowRepliesButton onClick={() => setShowReplies(true)}>
          Show replies ({comment.Comments.length})
        </S.ShowRepliesButton>
      )}

      {showReplies &&
        comment.Comments?.map((reply) => (
          <CommentItem
            key={reply.CommentID}
            comment={reply}
            onDeleteComment={onDeleteComment}
            onReplySuccess={onReplySuccess}
            onRefresh={onRefresh}
          />
        ))}

      {showReplies && comment.Comments?.length > 0 && (
        <S.ShowRepliesButton onClick={() => setShowReplies(false)}>
          Hide replies
        </S.ShowRepliesButton>
      )}
    </S.Container>
  );
}
