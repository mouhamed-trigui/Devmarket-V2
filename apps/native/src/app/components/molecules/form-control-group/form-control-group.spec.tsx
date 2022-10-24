import { render } from '@testing-library/react';

import FormControlGroup from './form-control-group';

describe('FormControlGroup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FormControlGroup />);
        expect(baseElement).toBeTruthy();
    });
});
