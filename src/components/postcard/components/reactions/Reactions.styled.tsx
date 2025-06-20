import styled from "@emotion/styled";
import { Colors } from "../../../../styles/colors";

const { black } = Colors;

export const MetaRow = styled("div", {
  shouldForwardProp: (prop) => prop !== "commentId",
})<{ commentId?: number }>`
  position: relative;
  margin-top: ${(props) => (props.commentId ? "0px" : "0.8rem")};
  font-size: 0.8rem;
  color: ${black};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Reactions = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  gap: 1px;
  cursor: pointer;
`;

export const ReactionPopupWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 10px;
  background: ${black};
  color: ${black};
  border-radius: 12px;
  padding: 0.75rem 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  min-width: 180px;
`;

export const ReactionEmoji = styled.img`
  width: 16px;
  height: 16px;
  margin-right: -3px;
  vertical-align: middle;
`;
