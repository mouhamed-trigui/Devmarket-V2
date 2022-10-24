import { render } from '@testing-library/react';

import Companies from './companies';

describe('Companies', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Companies />);
        expect(baseElement).toBeTruthy();
    });
});
