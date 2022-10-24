import { render } from '@testing-library/react';

import ValidationProAccount from './validation-pro-account';

describe('ValidationProAccount', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ValidationProAccount />);
        expect(baseElement).toBeTruthy();
    });
});
