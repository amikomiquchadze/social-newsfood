import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: white;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 1.5rem;
  min-height: 80px;
  width: 552px;
`;

export const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

export const InputBox = styled.div`
  flex: 1;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 999px;
  padding: 0.65rem 1.2rem;
  color: #777;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border 0.2s ease;

  &:hover {
    border-color: #bbb;
  }
`;
