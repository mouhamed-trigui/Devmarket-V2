import { render } from '@testing-library/react';

import AppLoading from './app-loading';

describe('AppLoading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppLoading />);
    expect(baseElement).toBeTruthy();
  });
});
