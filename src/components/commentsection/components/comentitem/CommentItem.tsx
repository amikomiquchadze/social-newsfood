import { useState } from "react";
import * as S from "./ComentItem.styled";
import { ReactComponent as EditIcon } from "../../../../assets/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/TrashIcon.svg";
import api from "../../../../api";
import Reactions from "../../../../common/reactions/Reactions";
import { ReactionType } from "../../../../utils/reactions";
import { formatShortTimeSince } from "../../../../utils/formatShortTimeSince";

const validReactions: ReactionType[] = [
  "LIKE",
  "LOVE",
  "LAUGH",
  "WOW",
  "SAD",
  "ANGRY",
];

const getInitialReaction = (value: any): ReactionType | null => {
  return validReactions.includes(value) ? (value as ReactionType) : null;
};

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
  reactionOptions: any;
}

export default function CommentItem({
  comment,
  onDeleteComment,
  onReplySuccess,
  onRefresh,
  reactionOptions,
}: Props) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reactionCounts, setReactionCounts] = useState(comment.Reactions);
  const [showReactions, setShowReactions] = useState(false);

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
  const [userReaction, setUserReaction] = useState<ReactionType | null>(
    getInitialReaction(comment.UserReaction)
  );

  const handleReact = async (reaction: ReactionType) => {
    try {
      if (userReaction === reaction) {
        await api.reactions.commentReactToggle(comment.CommentID, reaction);
        setReactionCounts((prev) => ({
          ...prev,
          [reaction]: Math.max(0, (prev[reaction] || 1) - 1),
        }));
        setUserReaction(null);
      } else {
        await api.reactions.commentReactToggle(comment.CommentID, reaction);

        setReactionCounts((prev) => {
          const newCounts = { ...prev };
          if (userReaction && newCounts[userReaction] > 0) {
            newCounts[userReaction] -= 1;
          }
          newCounts[reaction] = (newCounts[reaction] || 0) + 1;
          return newCounts;
        });

        setUserReaction(reaction);
      }

      setShowReactions(false);
    } catch (err) {
      console.error("Reaction error", err);
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
        <S.Role>{formatShortTimeSince(comment.CreateTime)}</S.Role>

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
        <S.ActionBar>
          <S.Action onClick={() => setShowReactions(!showReactions)}>
            <img
              src={
                userReaction
                  ? reactionOptions.find((r: any) => r.type === userReaction)
                      ?.emoji
                  : reactionOptions[0]?.emoji
              }
              alt="reaction"
              style={{ width: 20, height: 20 }}
            />
            {userReaction
              ? reactionOptions.find((r: any) => r.type === userReaction)?.label
              : "Like"}

            {showReactions && (
              <S.ReactionPopover>
                {reactionOptions.map((r: any) => (
                  <img
                    key={r.type}
                    src={r.emoji}
                    alt={r.label}
                    onClick={() => handleReact(r.type)}
                    style={{
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                ))}
              </S.ReactionPopover>
            )}
          </S.Action>
        </S.ActionBar>

        <Reactions
          commentId={comment.CommentID}
          reactionCounts={reactionCounts}
          reactionOptions={reactionOptions}
        />
        <span onClick={() => setShowReplyInput(!showReplyInput)}>Reply</span>
            </S.Actions>
        <div>
         {showReplyInput && (
  <S.ReplyWrapper>
    <S.ReplyInput
      rows={1}
      placeholder="Write your comment"
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
    />
    <S.CommentButton onClick={handleReply}>Comment</S.CommentButton>
  </S.ReplyWrapper>
)}
        </div>
  
      {comment.Comments?.length > 0 && !showReplies && (
        <S.ShowRepliesButton onClick={() => setShowReplies(true)}>
          Show replies ({comment.Comments.length})
        </S.ShowRepliesButton>
      )}

      {showReplies &&
        comment.Comments?.map((reply) => (
          <CommentItem
            reactionOptions={reactionOptions}
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
