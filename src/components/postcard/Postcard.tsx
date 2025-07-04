import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import CommentSection from "../commentsection/CommentSection";
import {
  reactionEmojiSource,
  ReactionOptions,
  ReactionType,
} from "../../utils/reactions";
import * as S from "./Postcard.styled";
import { ReactComponent as EditIcon } from "./../../assets/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "./../../assets/TrashIcon.svg";
import likeIcon from "./../../assets/thumb up.png";
import commentIcon from "./../../assets/comment.png";
import api from "../../api";
import { Post } from "../../api/models/response/post";
import Reactions from "../../common/reactions/Reactions";
import { formatDateTime } from "../../utils/formatDate";

interface Props {
  post: Post;
  onDelete: (postId: number) => void;
  reactionOptions: ReactionOptions[];
}

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

export default function PostCard({ post, onDelete, reactionOptions }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(
    getInitialReaction(post.UserReaction)
  );
  const [reactionCounts, setReactionCounts] = useState(post.Reactions);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.Content || "");
  const [loading, setLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showReactionViewer, setShowReactionViewer] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowReactionViewer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fullName = `${post.AuthorFirstName} ${post.AuthorLastName}`;

  const handleReact = async (reaction: ReactionType) => {
    try {
      if (userReaction === reaction) {
        await api.reactions.reactToggle(post.PostID, reaction);
        setReactionCounts((prev) => ({
          ...prev,
          [reaction]: Math.max(0, (prev[reaction] || 1) - 1),
        }));
        setUserReaction(null);
      } else {
        await api.reactions.reactToggle(post.PostID, reaction);

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

  const handleSave = async () => {
    if (!editContent.trim()) return;
    setLoading(true);
    try {
      await api.posts.updatePost(post.PostID, editContent.trim());
      post.Content = editContent;
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Card>
      <S.Header>
        <S.AvatarInfo>
          <S.Avatar src={post.AuthorAvatarUrl || "/avatars/default.jpg"} />

          <S.Info>
            <S.NameRow>
              <span>{fullName}</span>
              <S.FormattedDate>
                • {formatDateTime(post.CreateTime)}
              </S.FormattedDate>
            </S.NameRow>
            <S.SubText>QA Engineer</S.SubText>
          </S.Info>
        </S.AvatarInfo>

        <S.MenuWrapper>
          <S.DotsButton onClick={() => setMenuOpen(!menuOpen)}>⋯</S.DotsButton>
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
              <S.DropdownItem danger onClick={() => onDelete(post.PostID)}>
                <S.IconPlaceholder>
                  <DeleteIcon width={16} height={16} />
                </S.IconPlaceholder>{" "}
                Delete
              </S.DropdownItem>
            </S.Dropdown>
          )}
        </S.MenuWrapper>
      </S.Header>

      {isEditing ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "1rem" }}>
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(post.Content || "");
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        post.Content && (
          <S.Content>
            {expanded || post.Content.length <= 100
              ? post.Content
              : `${post.Content.slice(0, 100)}... `}
            {post.Content.length > 100 && (
              <S.ToggleButton onClick={() => setExpanded(!expanded)}>
                {expanded ? "See less" : "See more"}
              </S.ToggleButton>
            )}
          </S.Content>
        )
      )}

      {post.PostFiles?.length > 0 && (
        <S.PreviewGrid>
          {post.PostFiles.map((file) => {
            const isImage =
              file.FileType?.startsWith("image/") ||
              file.FileUrl?.startsWith("data:image");

            if (isImage) {
              return (
                <S.PreviewImage
                  key={file.PostFileID}
                  src={file.FileUrl}
                  alt={file.FileName}
                />
              );
            }

            return null;
          })}
        </S.PreviewGrid>
      )}
      <Reactions
        id={post.PostID}
        reactionCounts={reactionCounts}
        reactionOptions={reactionOptions}
      />
      <S.CommentCount onClick={() => setShowCommentInput((prev) => !prev)}>
        {post.TotalComments} Comment{post.TotalComments !== 1 ? "s" : ""}
      </S.CommentCount>

      <S.ActionBar>
        <S.Action onClick={() => setShowReactions(!showReactions)}>
          {userReaction ? (
            <img
              src={reactionOptions.find((r) => r.type === userReaction)?.emoji}
              alt="reaction"
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <img src={likeIcon} alt="React" style={{ width: 22, height: 16 }} />
          )}

          {userReaction
            ? reactionOptions.find((r) => r.type === userReaction)?.label
            : "Like"}

          {showReactions && (
            <S.ReactionPopover>
              {reactionOptions.map((r) => (
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

        <S.Action onClick={() => setShowCommentInput(!showCommentInput)}>
          <img
            src={commentIcon}
            alt="Comment"
            style={{ width: 22, height: 20 }}
          />
          Comment
        </S.Action>
      </S.ActionBar>

      {showCommentInput && (
        <CommentSection
          postId={post.PostID}
          reactionOptions={reactionOptions}
        />
      )}
    </S.Card>
  );
}
