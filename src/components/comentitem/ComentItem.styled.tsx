import styled from "@emotion/styled";
import { Colors } from "../../styles/colors";

const {
  gray,
  lighgray,
  white,
  red,
  graytext,
  black,
  lightgreen,
  darkgreen,
  darkgrey,
} = Colors;
export const Container = styled.div<{ level: number }>`
  margin-top: 1rem;
  padding-left: ${(props) => props.level * 20}px;
  border-left: ${(props) => (props.level > 0 ? "1px solid #ddd" : "none")};
  margin-left: ${(props) => (props.level > 0 ? "6px" : "0")};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Author = styled.div`
  font-weight: bold;
`;

export const Role = styled.div`
  font-size: 0.8rem;
  color: ${lighgray};
`;

export const Body = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0.5rem 0;
`;

export const Button = styled.button`
  background-color: ${lighgray};
  border: none;
  padding: 0.3rem 0.6rem;
  margin-top: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
`;

export const ShowRepliesButton = styled.div`
  font-size: 0.8rem;
  color: ${gray};
  cursor: pointer;
  margin-top: 0.3rem;
  margin-left: 2.2rem;
`;

export const MenuWrapper = styled.div`
  position: relative;
`;

export const DotsButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${lighgray};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 120px;
  z-index: 100;
  padding: 0.5rem 0;
`;

export const DropdownItem = styled.div<{ danger?: boolean }>`
  padding: 8px 16px;
  font-size: 0.9rem;
  color: ${(props) => (props.danger ? red : graytext)};
  cursor: pointer;

  &:hover {
    background-color: ${white};
  }
`;

export const IconPlaceholder = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const ToggleButton = styled.span`
  color: ${darkgrey};
  cursor: pointer;
  font-weight: 500;
  margin-left: 4px;
`;

export const ActionBar = styled.div`
  justify-content: space-around;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: var(--font-family-body);
  color: ${gray};
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const ReactionPopover = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: ${black};
  border: 1px solid #ccc;
  padding: 6px 8px;
  border-radius: 30px;
  display: flex;
  gap: 6px;
  z-index: 999;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${lighgray};
`;
export const ReplyContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ReplyWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${white};
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  margin-left: 2.2rem;
  gap: 0.5rem;
`;

export const ReplyInput = styled.textarea`
  border: none;
  background: transparent;
  resize: none;
  flex: 1;
  font-size: 0.9rem;
  color: ${lighgray};
  outline: none;
  height: 40px;
  padding: 0;
  margin: 0;
  line-height: 10px;
  overflow: hidden;
`;
export const CommentButton = styled.button`
  background: none;
  border: none;
  color: ${lightgreen};
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: ${darkgreen};
  }
`;
