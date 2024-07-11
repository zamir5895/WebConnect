/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #0070f3;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  background: #0070f3;
  mask: url('src/assets/connectlogo.svg') no-repeat center / contain;
  margin-right: 10px;
`;

const ConnectLogo = () => {
    return (
        <LogoContainer>
            <Icon />
            <LogoText>Connect</LogoText>
        </LogoContainer>
    );
};

export default ConnectLogo;
