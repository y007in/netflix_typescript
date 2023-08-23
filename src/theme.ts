//theme => 스타일컴포넌트 => 전역 컴포넌트 모두 사용할 수 있도록 테마프로바이더라는 컴포넌트 Props : 기본 타입 any
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  red: "#e51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2f2f2f",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};
