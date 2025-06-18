import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 565px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.span`
  font-family: var(--font-family-display);
  font-weight: 600;
  font-size: 1.2rem;
  color: #181d27;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
`;

export const TextareaWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  font-family: var(--font-family-body);
  font-weight: 400;
  font-size: 0.95rem;
  color: #181d27;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

export const EmojiIcon = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: #aaa;
  cursor: pointer;
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const PreviewImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const DeleteIcon = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const PostButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#32B45F")};
  color: white;
  font-weight: 600;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;
  margin-top: 1.25rem;
  text-align: center;
`;
