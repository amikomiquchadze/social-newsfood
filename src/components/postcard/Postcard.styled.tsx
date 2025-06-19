import styled from "@emotion/styled";
import { Colors } from "../../styles/colors";

const { black, white, gray, red, graytext } = Colors;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 552px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AvatarInfo = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameRow = styled.div`
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SubText = styled.div`
  color: ${gray};
  font-size: 0.8rem;
`;

export const FormattedDate = styled.span`
  font-weight: normal;
  color: ${gray};
  font-size: 0.8rem;
`;
export const MenuWrapper = styled.div`
  position: relative;
`;

export const DotsButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${gray};
  cursor: pointer;
  padding: 0;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 140px;
  z-index: 100;
  padding: 0.5rem 0;
`;

export const DropdownItem = styled.div<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  color: ${(props) => (props.danger ? red : graytext)};
  font-weight: 500;
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

export const Content = styled.p`
  margin-top: 0.8rem;
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const ToggleButton = styled.span`
  color: ${black};
  cursor: pointer;
  font-weight: 500;
  margin-left: 4px;
`;

export const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const PreviewImage = styled.img`
  width: 520px;
  height: 420px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
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

export const CommentCount = styled.div`
  cursor: pointer;
  color: #333;
  font-size: 0.9rem;
  margin: 8px 0 4px;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #1876f2;
    text-decoration: underline;
  }
`;
