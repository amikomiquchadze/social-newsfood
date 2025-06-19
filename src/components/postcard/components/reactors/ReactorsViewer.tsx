import React, { useEffect, useState } from "react";
import * as S from "./ReactorsViewer.styled";
import api from "../../../../api";

interface Props {
  postId: number;
}

interface Reactor {
  UserID: number;
  FirstName: string;
  LastName: string;
  ReactionType: string;
  AvatarUrl?: string | null;
}

export default function ReactionViewer({ postId }: Props) {
  const [reactors, setReactors] = useState<Reactor[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchReactors = async () => {
    try {
      const resp = await api.reactions.getReactors(postId);
      if (resp) {
        setReactors(resp);
        setLoaded(true);
      }
    } catch (err) {
      console.error("Failed to fetch reactors", err);
    }
  };

  useEffect(() => {
    fetchReactors();
  }, [postId]);

  if (!loaded || reactors.length === 0) return null;

  return (
    <S.Popup>
      {(showAll ? reactors : reactors.slice(0, 4)).map((r) => (
        <S.Line key={r.UserID}>
          {r.FirstName} {r.LastName}
        </S.Line>
      ))}
      {reactors.length > 4 && !showAll && (
        <S.SeeMore onClick={() => setShowAll(true)}>... and more</S.SeeMore>
      )}
    </S.Popup>
  );
}
