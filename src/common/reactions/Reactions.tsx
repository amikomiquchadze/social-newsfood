import { useEffect, useRef, useState } from "react";
import * as S from "./Reactions.styled";
import ReactorViewer, { Reactor } from "../reactors/ReactorsViewer";
import api from "../../api";

interface ReactionsProps {
  reactionCounts: any;
  reactionOptions: { type: string; emoji: string }[];
  id?: number;
  commentId?: number;
}
export default function Reactions({
  reactionCounts,
  reactionOptions,
  id,
  commentId,
}: ReactionsProps) {
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

  const [reactors, setReactors] = useState<Reactor[]>([]);

  const fetchReactors = async () => {
    const path = id ? "post" : commentId ? "comment" : "";
    const argID = id || commentId;
    const payloadProperty = id ? "PostID" : commentId ? "CommentID" : "";
    if (!path || !argID) return;
    try {
      const resp = await api.reactions.getReactors(
        argID,
        path,
        payloadProperty
      );
      if (resp) {
        setReactors(resp);
        console.log("com reactors", resp);
      }
    } catch (err) {
      console.error("Failed to fetch reactors", err);
    }
  };

  useEffect(() => {
    fetchReactors();
  }, [id]);

  return (
    <>
      <S.MetaRow commentId={commentId}>
        <div style={{ position: "relative" }}>
          <S.Reactions
            onClick={() => setShowReactionViewer((prev: any) => !prev)}
          >
            {Object.entries(reactionCounts)
              .filter(([, val]: any) => val > 0)
              .slice(0, 3)
              .map(([key]) => {
                return (
                  <S.ReactionEmoji
                    key={key}
                    src={
                      reactionOptions.find((r: any) => r.type === key)?.emoji
                    }
                    alt={key}
                  />
                );
              })}
            {(() => {
              const total: number = Object.values(
                reactionCounts as Record<string, number>
              ).reduce((a, b) => a + b, 0);
              if(id){
              if (total === 1) {
                return (
                  <span style={{ marginLeft: 4, fontSize: "0.85rem" }}>
                    {reactors[0]?.FirstName + " " + reactors[0]?.LastName}
                  </span>
                );
              } else if (total > 1) {
                return (
                  <span style={{ marginLeft: 4, fontSize: "0.85rem" }}>
                    {reactors[0]?.FirstName + " " + reactors[0]?.LastName} and{" "}
                    {total - 1} others
                  </span>
                );
              }}
              if(commentId){
                return (
                  <span style={{ marginLeft: 4, fontSize: "0.85rem" }}>
                    {total} 
                  </span>
                );
              }
              return null;
            })()}
          </S.Reactions>

          {showReactionViewer && (
            <S.ReactionPopupWrapper ref={popupRef}>
              <ReactorViewer reactors={reactors} />
            </S.ReactionPopupWrapper>
          )}
        </div>
      </S.MetaRow>
    </>
  );
}
