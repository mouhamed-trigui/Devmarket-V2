import { render } from '@testing-library/react';

import AutoSearchInput from './auto-search-input';

describe('AutoSearchInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AutoSearchInput />);
        expect(baseElement).toBeTruthy();
    });
});
