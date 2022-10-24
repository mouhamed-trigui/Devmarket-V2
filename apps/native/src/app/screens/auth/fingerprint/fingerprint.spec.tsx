import { render } from '@testing-library/react';

import Fingerprint from './fingerprint';

describe('Fingerprint', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Fingerprint />);
    expect(baseElement).toBeTruthy();
  });
});
