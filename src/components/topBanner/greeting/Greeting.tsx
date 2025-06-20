import * as S from "./Greeting.styled";

interface GreetingProps {
  name: string;
}

export default function Greeting({ name }: GreetingProps) {
  return (
    <S.GreetingText>
      <h2>Good Morning {name}</h2>
      <p>Hello! Hope you’re having a fantastic day!</p>
    </S.GreetingText>
  );
}
