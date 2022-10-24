import { render } from '@testing-library/react';

import FormIdentityShopRegistration from './form-identity-shop-registration';

describe('FormIdentityActivityRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormIdentityShopRegistration />);
    expect(baseElement).toBeTruthy();
  });
});
