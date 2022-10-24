import { render } from '@testing-library/react';

import FormIdentityRegistration from './form-identity-user-registration';

describe('FormIdentityRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormIdentityRegistration />);
    expect(baseElement).toBeTruthy();
  });
});
