import { useState } from "react";
import { Comment } from "../commentsection/CommentSection";
import * as S from "./ComentItem.styled";
import {ReactComponent as EditIcon} from './../../assets/EditIcon.svg';
import {ReactComponent as DeleteIcon} from './../../assets/TrashIcon.svg';

interface Props {
  comment: Comment;
  comments: Comment[];
  onAddReply: (text: string, parentId: number) => void;
  onDeleteComment: (commentId: number) => void;
}

export default function CommentItem({ comment, comments, onAddReply, onDeleteComment }: Props) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isReply = comment.parentId !== null;
  const replies = comments.filter((c) => c.parentId === comment.id);

  const handleReply = () => {
    if (replyText.trim()) {
      onAddReply(replyText.trim(), comment.id);
      setReplyText("");
      setShowReplyInput(false);
      setShowReplies(true);
    }
  };

  const handleDelete = (commentId: number) => {
    onDeleteComment(commentId);
    setMenuOpen(false);
  };

  return (
    <S.Container level={isReply ? 1 : 0}>
      <S.Header>
        <S.Avatar src={comment.avatarUrl} />
        <div style={{ flex: 1 }}>
          <S.Author>{comment.authorName}</S.Author>
          <S.Role>{comment.authorRole}</S.Role>
        </div>

        {comment.authorName === "You" && (
  <S.MenuWrapper>
    <S.DotsButton onClick={() => setMenuOpen((prev) => !prev)}>⋯</S.DotsButton>
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
                  <S.DropdownItem danger onClick={() => handleDelete(comment.id)}>
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

      <S.Body>{comment.content}</S.Body>

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

      {(isReply || showReplies) && replies.length > 0 && (
        <>
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              comments={comments}
              onAddReply={onAddReply}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </>
      )}

      {!isReply && replies.length > 0 && (
        <>
          {!showReplies ? (
            <S.ShowRepliesButton onClick={() => setShowReplies(true)}>
              Show replies ({replies.length})
            </S.ShowRepliesButton>
          ) : (
            <S.ShowRepliesButton onClick={() => setShowReplies(false)}>
              Hide replies
            </S.ShowRepliesButton>
          )}
        </>
      )}
    </S.Container>
  );
}
