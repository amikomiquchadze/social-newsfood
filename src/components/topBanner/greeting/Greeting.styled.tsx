import styled from "@emotion/styled";
import { Colors } from "../../../styles/colors";
const { lighgray, black } = Colors;
export const GreetingText = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: ${black};
    font-family: "Helvetica Neue LT GEO", sans-serif;
  }

  p {
    margin: 8px 0 0; /* Add top margin for spacing */
    color: ${lighgray};
    font-size: 16px;
    font-weight: 400;
    font-family: "Helvetica Neue LT GEO", sans-serif;
  }
`;
