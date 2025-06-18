import React, { useState } from "react";
import CreatePostModal from "../createpostmodal/CreatePostModal";
import { currentUser } from "../../constants/CurrentUser";
import * as S from "./postInput.styled";
import { Post } from "../../api/models/response/post";

interface Props {
  onPostCreate: (post: Post) => void;
}

export default function PostInput({ onPostCreate }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <S.Container>
        <S.Avatar src={currentUser.avatarUrl} alt="You" />
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
