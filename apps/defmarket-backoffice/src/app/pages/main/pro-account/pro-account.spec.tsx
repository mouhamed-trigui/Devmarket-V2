import { render } from '@testing-library/react';

import ProAccount from './pro-account';

describe('ProAccount', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProAccount />);
        expect(baseElement).toBeTruthy();
    });
});
