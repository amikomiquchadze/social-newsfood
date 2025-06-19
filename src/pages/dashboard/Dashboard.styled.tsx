import styled from "@emotion/styled";
import { Colors } from "../../styles/colors";

const { white } = Colors;

export const DashboardWrapper = styled.div`
  background-color: ${white};
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

export const DashboardContent = styled.div`
  max-width: 65%;
`;

export const GreetingWrapper = styled.div`
  width: 552px;
  margin-bottom: 1.5rem;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  width: 296px;
  height: 84px;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  max-width: 872px;
  align-items: flex-start;
`;
export const LeftPanel = styled.div`
  width: 552px;
`;
