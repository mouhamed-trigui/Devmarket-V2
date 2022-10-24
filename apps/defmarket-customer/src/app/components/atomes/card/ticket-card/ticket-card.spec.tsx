import { render } from '@testing-library/react';

import TicketCard from './ticket-card';

describe('TicketCard', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TicketCard />);
        expect(baseElement).toBeTruthy();
    });
});
