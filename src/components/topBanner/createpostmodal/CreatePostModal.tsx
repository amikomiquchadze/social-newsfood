import React, { useState } from "react";
import { FiX, FiSmile, FiImage } from "react-icons/fi";
import * as S from "./CreatePostModal.styled";
import { Post } from "../../../api/models/response/post";
import { Base64FileDto, CreatePostPayload } from "../../../api/models/payload/post";
import api from "../../../api";

interface Props {
  onClose: () => void;
  onPostCreate: (post: Post) => void;
}

export default function CreatePostModal({ onClose, onPostCreate }: Props) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const newFiles = selected.filter(
      (file) => !files.some((f) => f.name === file.name && f.size === file.size)
    );
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!content.trim() && files.length === 0) return;

    const base64Files: Base64FileDto[] = [];

    for (const file of files) {
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>
            resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
        });

      const fileData = await toBase64(file);
      base64Files.push({
        FileName: file.name,
        FileType: file.type,
        FileData: fileData,
        FileSize: file.size,
      });
    }

    const payload: CreatePostPayload = {
      Content: content.trim(),
      FilesJson: JSON.stringify(base64Files),
    };

    try {
      const createdPost = await api.posts.createPost(payload);
      onPostCreate(createdPost);
      setContent("");
      setFiles([]);
      setPreviewUrls([]);
      onClose();
    } catch (error) {
      console.error("Post failed", error);
    }
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.Header>
          <S.Title>Create Post</S.Title>
          <S.CloseButton onClick={onClose}>
            <FiX size={20} />
          </S.CloseButton>
        </S.Header>

        <S.TextareaWrapper>
          <S.TextArea
            placeholder="What would you like to talk about today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <S.EmojiIcon>
            <FiSmile size={20} />
          </S.EmojiIcon>
        </S.TextareaWrapper>

        <S.FileRow>
          <label style={{ cursor: "pointer" }}>
            <FiImage size={20} />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              multiple
              onChange={handleFileChange}
            />
          </label>
        </S.FileRow>

        {previewUrls.length > 0 && (
          <S.PreviewWrapper>
            {previewUrls.map((url, idx) => (
              <S.PreviewImage key={idx}>
                <img src={url} alt={`Preview ${idx}`} />
                <S.DeleteIcon onClick={() => handleRemoveImage(idx)}>
                  ×
                </S.DeleteIcon>
              </S.PreviewImage>
            ))}
          </S.PreviewWrapper>
        )}

        <S.PostButton
          disabled={!content.trim() && files.length === 0}
          onClick={handlePost}
        >
          Post
        </S.PostButton>
      </S.ModalContainer>
    </S.Overlay>
  );
}
