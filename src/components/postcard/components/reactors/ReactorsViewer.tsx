import React, { useEffect, useState } from "react";
import * as S from "./ReactorsViewer.styled";
import api from "../../../../api";

interface Props {
  reactors: Reactor[];
}

export interface Reactor {
  UserID: number;
  FirstName: string;
  LastName: string;
  ReactionType: string;
  AvatarUrl?: string | null;
}

export default function ReactorsViewer({ reactors }: Props) {
  const [showAll, setShowAll] = useState(false);

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
