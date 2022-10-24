import { render } from '@testing-library/react';

import Structures from './structures';

describe('Structures', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Structures />);
        expect(baseElement).toBeTruthy();
    });
});
