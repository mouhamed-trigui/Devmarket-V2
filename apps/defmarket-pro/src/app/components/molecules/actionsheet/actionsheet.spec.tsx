import { render } from '@testing-library/react';

import Actionsheet from './actionsheet';

describe('Actionsheet', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Actionsheet />);
        expect(baseElement).toBeTruthy();
    });
});
