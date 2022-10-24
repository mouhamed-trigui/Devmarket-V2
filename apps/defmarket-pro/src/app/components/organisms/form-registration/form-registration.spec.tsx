import { render } from '@testing-library/react';

import FormRegistration from './form-registration';

describe('FormRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormRegistration />);
    expect(baseElement).toBeTruthy();
  });
});
