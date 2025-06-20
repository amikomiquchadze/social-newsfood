import { Global, css } from "@emotion/react";
import { Colors } from "./colors";
const { white } = Colors;
const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        background-color: ${white};
        color: #333;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      ul {
        list-style: none;
        padding-left: 0;
      }
    `}
  />
);

export default GlobalStyles;
