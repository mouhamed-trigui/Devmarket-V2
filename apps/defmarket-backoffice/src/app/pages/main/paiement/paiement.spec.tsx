import { render } from '@testing-library/react';

import Paiement from './paiement';

describe('Paiement', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Paiement />);
        expect(baseElement).toBeTruthy();
    });
});
