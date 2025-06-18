import styled from "@emotion/styled";
import { Colors } from "../../styles/colors";
const { lighgray } = Colors;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.div`
  font-family: var(--font-family-body);
  font-weight: 500;
  font-size: 0.9rem;
  color: ${lighgray};
`;

export const Value = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.4rem;
`;

export const AvatarList = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
