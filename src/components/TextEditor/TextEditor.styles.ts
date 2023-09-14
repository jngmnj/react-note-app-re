import styled from "@emotion/styled";

export const Container = styled.div<{ $noteColor: string }>`
  .ql-editor {
    height: 200px;
    background-color: ${({ $noteColor }) => $noteColor};
  }
`;
