import { render } from '@testing-library/react';
import LogoDefmarket from './logo-defmarket';
describe('LogoDefmarket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LogoDefmarket />);
    expect(baseElement).toBeTruthy();
  });
});
