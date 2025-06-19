import styled from "@emotion/styled";
import { Colors } from "../../styles/colors";

const { gray, lighgray, white, red, graytext } = Colors;
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
  margin-top: 0.5rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${lighgray};
`;

export const ReplyInput = styled.textarea`
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0.4rem;
  resize: none;
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
