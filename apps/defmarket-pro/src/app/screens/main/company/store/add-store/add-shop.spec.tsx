import { render } from '@testing-library/react';

import AddStore from './add-shop';

describe('AddStore', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AddStore />);
        expect(baseElement).toBeTruthy();
    });
});
