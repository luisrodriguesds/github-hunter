import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media(max-width: 425px){
    justify-content: center;
  }
`;
