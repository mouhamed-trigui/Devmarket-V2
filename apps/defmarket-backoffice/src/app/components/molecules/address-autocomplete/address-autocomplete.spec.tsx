import { render } from '@testing-library/react';

import AddressAutocomplete from './address-autocomplete';

describe('AddressAutocomplete', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AddressAutocomplete />);
        expect(baseElement).toBeTruthy();
    });
});
