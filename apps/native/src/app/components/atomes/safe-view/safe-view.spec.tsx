import { render } from '@testing-library/react';

import SafeView from './safe-view';

describe('SafeView', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SafeView />);
        expect(baseElement).toBeTruthy();
    });
});
