import styled from "@emotion/styled";
import { Colors } from "../../styles/colors";
const { lightgreen, white } = Colors;

export const Section = styled.div`
  margin-top: 1rem;
`;

export const CommentBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 1rem;
  background: ${white};
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 6px 12px;
`;

export const Input = styled.textarea`
  height: 40px;
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  resize: none;
  font-size: 0.95rem;
  font-family: var(--font-family-body);
  line-height: 1.2;
  outline: none;
  background-color: transparent;
`;

export const Button = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  color: ${lightgreen};
  cursor: pointer;
  font-size: 0.95rem;
`;
