import * as S from "./StatsCard.styled";

interface StatsCardProps {
  title: string;
  value?: string;
  avatars?: string[];
}

export default function StatsCard({ title, value, avatars }: StatsCardProps) {
  return (
    <S.Card>
      <S.Title>{title}</S.Title>
      {value && <S.Value>{value}</S.Value>}
      {avatars && (
        <S.AvatarList>
          {avatars.map((src, idx) => (
            <S.Avatar key={idx} src={src} />
          ))}
        </S.AvatarList>
      )}
    </S.Card>
  );
}
