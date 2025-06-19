import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import CommentSection, { Comment } from "../commentsection/CommentSection";
import {
  reactionEmojiSource,
  ReactionOptions,
  ReactionType,
} from "../../utils/Reactions";
import * as S from "./Postcard.styled";
import { ReactComponent as EditIcon } from "./../../assets/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "./../../assets/TrashIcon.svg";
import api from "../../api";
import { Post } from "../../api/models/response/post";
import ReactionViewer from "../postcard/components/reactors/ReactorsViewer";
interface Props {
  post: Post;
  onDelete: (postId: number) => void;
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
export default function PostCard({ post, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactionOptions, setReactOptions] = useState<ReactionOptions[]>([]);
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
  const formattedDate = format(
    new Date(post.CreateTime),
    "MMM d, yyyy @ HH:mm"
  );
  console.log("lol");

  const handleAddComment = (content: string, parentId: number | null) => {
    const newComment: Comment = {
      CommentID: Date.now(),
      ParentCommentID: parentId,
      PostID: post.PostID,
      AuthorID: 0,
      AuthorFirstName: "You",
      AuthorLastName: "",
      AuthorAvatar: "/avatars/you.jpg",
      Content: content,
      CreateTime: new Date().toISOString(),
      IsAuthor: true,
      TotalReactions: 0,
      TotalReplies: 0,
      UserReaction: null,
      Reactions: {
        LIKE: 0,
        LOVE: 0,
        LAUGH: 0,
        WOW: 0,
        SAD: 0,
        ANGRY: 0,
      },
      Comments: [],
    };

    setComments((prev) => [...prev, newComment]);
  };

  const handleReact = async (reaction: ReactionType) => {
    try {
      await api.posts.reactToPost(post.PostID, reaction);
      setReactionCounts((prev) => {
        const newCounts = { ...prev };
        if (userReaction && newCounts[userReaction] > 0) {
          newCounts[userReaction] -= 1;
        }
        newCounts[reaction] = (newCounts[reaction] || 0) + 1;
        return newCounts;
      });
      setUserReaction(reaction);
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

  const getReactOptions = async () => {
    try {
      const resp = await api.reactions.getReactionTypes();
      if (resp?.status === 200 || resp?.status === 201) {
        const serverTypes: ReactionType[] = resp.data;

        const enriched = serverTypes
          .map((type) => reactionEmojiSource.find((r) => r.type === type))
          .filter(Boolean) as typeof reactionEmojiSource;

        setReactOptions(enriched);
      }
    } catch (err) {
      console.error("Fetching failed:", err);
    }
  };

  useEffect(() => {
    getReactOptions();
  }, []);

  return (
    <S.Card>
      <S.Header>
        <S.AvatarInfo>
          <S.Avatar src={post.AuthorAvatarUrl || "/avatars/default.jpg"} />
          <S.Info>
            <S.NameRow>{fullName}</S.NameRow>
            <S.SubText>QA Engineer • {formattedDate}</S.SubText>
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

      <S.MetaRow>
        <div style={{ position: "relative" }}>
          <S.Reactions onClick={() => setShowReactionViewer((prev) => !prev)}>
            {Object.entries(reactionCounts)
              .filter(([, val]) => val > 0)
              .slice(0, 3)
              .map(([key]) => (
                <S.ReactionEmoji
                  key={key}
                  src={reactionOptions.find((r) => r.type === key)?.emoji}
                  alt={key}
                />
              ))}
            {(() => {
              const total = Object.values(reactionCounts).reduce(
                (a, b) => a + b,
                0
              );
              if (total === 1) {
                return (
                  <span style={{ marginLeft: 4, fontSize: "0.85rem" }}>
                    Ani
                  </span>
                );
              } else if (total > 1) {
                return (
                  <span style={{ marginLeft: 4, fontSize: "0.85rem" }}>
                    Ani and {total - 1} others
                  </span>
                );
              }
              return null;
            })()}
          </S.Reactions>

          {showReactionViewer && (
            <S.ReactionPopupWrapper ref={popupRef}>
              <ReactionViewer postId={post.PostID} />
            </S.ReactionPopupWrapper>
          )}
        </div>
      </S.MetaRow>

      <S.CommentCount onClick={() => setShowCommentInput((prev) => !prev)}>
        {post.TotalComments} Comment{post.TotalComments !== 1 ? "s" : ""}
      </S.CommentCount>

      <S.ActionBar>
        <S.Action onClick={() => setShowReactions(!showReactions)}>
          <img
            src={
              userReaction
                ? reactionOptions.find((r) => r.type === userReaction)?.emoji
                : reactionOptions[0]?.emoji
            }
            alt="reaction"
            style={{ width: 20, height: 20 }}
          />
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
          <FaRegComment />
          Comment
        </S.Action>
      </S.ActionBar>

      {showCommentInput && <CommentSection postId={post.PostID} />}
    </S.Card>
  );
}
