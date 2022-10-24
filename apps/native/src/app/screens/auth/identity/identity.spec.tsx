import { render } from '@testing-library/react';

import Identity from './identity';

describe('Identity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Identity />);
    expect(baseElement).toBeTruthy();
  });
});
