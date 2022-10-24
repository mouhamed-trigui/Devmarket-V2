import { render } from '@testing-library/react';

import OfferItem from './offer-item';

describe('OfferItem', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<OfferItem />);
        expect(baseElement).toBeTruthy();
    });
});
