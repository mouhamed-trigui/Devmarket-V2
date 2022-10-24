import { render } from '@testing-library/react';

import Communication from './communication';

describe('Communication', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Communication />);
        expect(baseElement).toBeTruthy();
    });
});
