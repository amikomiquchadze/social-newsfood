import * as S from "./PostCardSceleton.Styled";

export default function PostCardSkeleton() {
  return (
    <S.Card>
      <S.Header>
        <S.Avatar />
        <S.Lines>
          <S.Line width="120px" />
          <S.Line width="160px" height="10px" />
        </S.Lines>
      </S.Header>

      <S.ContentBlock>
        <S.Line />
        <S.Line />
        <S.Line width="80%" />
      </S.ContentBlock>

      <S.Footer>
        <S.Action />
        <S.Action />
      </S.Footer>
    </S.Card>
  );
}
