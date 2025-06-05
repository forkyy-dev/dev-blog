import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: Pretendard, 'Noto Sans KR', sans-serif;
    background: ${props => props.theme.colors.bodyBackground};
  }

`

export default GlobalStyles
