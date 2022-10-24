import styled from 'styled-components/native';
import { View, Text } from 'native-base';
import AppLoading from 'expo-app-loading';
/* eslint-disable-next-line */
export interface AppLoadingProps {}

const StyledAppLoading = styled.View`
  color: pink;
`;

export function AppLoading_(props: AppLoadingProps) {
  return (
    <StyledAppLoading>
      <AppLoading />{' '}
    </StyledAppLoading>
  );
}

export default AppLoading_;
