import { render } from '@testing-library/react';

import Splashscreen from './splashscreen';

describe('Splashscreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Splashscreen />);
    expect(baseElement).toBeTruthy();
  });
});
