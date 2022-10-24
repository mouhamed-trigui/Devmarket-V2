import { render } from '@testing-library/react';

import Cgv from './cgv';

describe('Cgv', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cgv />);
    expect(baseElement).toBeTruthy();
  });
});
