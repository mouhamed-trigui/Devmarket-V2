import { render } from '@testing-library/react';

import Separate from './separate';

describe('Separate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Separate />);
    expect(baseElement).toBeTruthy();
  });
});
