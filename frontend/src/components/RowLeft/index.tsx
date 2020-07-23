import React from 'react';

import { Container } from './styles';

const RowLeft: React.FC = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
    );
}

export default RowLeft;