import styled from "@emotion/styled";
import { Colors } from "../../../../styles/colors";
const { black, white } = Colors;

export const Popup = styled.div`
  background: ${black};
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  min-width: 180px;
`;

export const Line = styled.div`
  font-size: 0.9rem;
  margin-bottom: 8px;
  white-space: nowrap;
`;

export const SeeMore = styled.div`
  font-size: 0.9rem;
  color: ${white};
  cursor: pointer;
`;
