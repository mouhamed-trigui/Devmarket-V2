import { render } from '@testing-library/react';

import AddStructure from './add-structure';

describe('AddStructure', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AddStructure />);
        expect(baseElement).toBeTruthy();
    });
});
