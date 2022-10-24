import { render } from '@testing-library/react';

import FormIdentityEstablishmentRegistration from './form-identity-establishment-registration';

describe('FormIdentityStoreRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormIdentityEstablishmentRegistration />);
    expect(baseElement).toBeTruthy();
  });
});
