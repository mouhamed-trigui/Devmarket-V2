import { render } from '@testing-library/react';

import FilterOffer from './filter-offer';

describe('FilterOffer', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FilterOffer />);
        expect(baseElement).toBeTruthy();
    });
});
