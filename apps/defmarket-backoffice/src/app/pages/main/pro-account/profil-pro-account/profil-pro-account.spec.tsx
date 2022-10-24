import { render } from '@testing-library/react';

import ProfilProAccount from './profil-pro-account';

describe('ProfilProAccount', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProfilProAccount />);
        expect(baseElement).toBeTruthy();
    });
});
