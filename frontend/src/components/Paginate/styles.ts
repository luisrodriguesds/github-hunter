import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.nav`
  margin: 20px 0 0 0;
  padding: 0;
  display: inline-block;

  ul{
    list-style: none;
    display: flex;

    li{
      background: #fff;
      color: #04d361;
      padding: 10px;
      
      border: 1px solid #fff;
      border-radius: 0.25rem;

      display: flex;
      align-items: center;
      
      transition: border 0.2s;
      cursor: pointer;

      & + li{
        margin-left: 15px;
      }

      &:hover{
        border: 1px solid #04d361;
        background: #04d361;
        color: #fff;
      }

    }

    .active{
      border: 1px solid #04d361;
      background: #04d361;
      color: #fff;
    }

    .disabled{
      color: ${shade(0.4, '#fff')};
      pointer-events: none;
      cursor: not-allowed;
    }

  }
`;
