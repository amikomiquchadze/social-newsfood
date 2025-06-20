import React, { useState } from "react";
import CreatePostModal from "../createpostmodal/CreatePostModal";
import * as S from "./postInput.styled";
import { Post } from "../../../api/models/response/post";
import { useUser } from "../../../contexts/UserContext";

interface Props {
  onPostCreate: (post: Post) => void;
}

export default function PostInput({ onPostCreate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useUser();
  return (
    <>
      <S.Container>
        <S.Avatar src={currentUser?.AvatarUrl!} alt="ProfPic" />
        <S.InputBox onClick={() => setIsOpen(true)}>Write a post</S.InputBox>
      </S.Container>

      {isOpen && (
        <CreatePostModal
          onClose={() => setIsOpen(false)}
          onPostCreate={onPostCreate}
        />
      )}
    </>
  );
}
