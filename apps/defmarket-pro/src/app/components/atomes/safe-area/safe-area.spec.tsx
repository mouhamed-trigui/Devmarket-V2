import { render } from '@testing-library/react';

import SafeArea from './safe-area';

describe('SafeArea', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SafeArea />);
        expect(baseElement).toBeTruthy();
    });
});
