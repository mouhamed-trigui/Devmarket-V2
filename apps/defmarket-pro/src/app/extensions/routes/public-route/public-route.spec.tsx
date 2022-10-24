import { render } from '@testing-library/react';

import PublicRoute from './public-route';

describe('PublicRoute', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PublicRoute />);
        expect(baseElement).toBeTruthy();
    });
});
