import styled from "@emotion/styled";

export const Pulse = styled.div`
  background: #f3f3f3;
  border-radius: 6px;
  animation: pulse 1.6s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1.2rem;
  width: 552px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Avatar = styled(Pulse)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Lines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Line = styled(Pulse)<{ width?: string; height?: string }>`
  height: ${({ height }) => height || "12px"};
  width: ${({ width }) => width || "100%"};
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
`;

export const Action = styled(Pulse)`
  width: 45%;
  height: 12px;
  border-radius: 6px;
`;
