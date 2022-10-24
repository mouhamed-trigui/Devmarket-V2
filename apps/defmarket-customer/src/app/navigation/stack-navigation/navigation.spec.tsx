import React from 'react';
import NavigationContainer from './navigation';
import { RenderReduxComponent } from '../../utils/test/RenderRedux';
import { act } from 'react-test-renderer';
let state = {};

beforeEach(() => {
    state = {
        /* user store */
        user: {
            user: {
                name: 'test',
            },
        },
        /* language store */
        language: {
            language: 'fr',
        },
    };
});

afterEach(() => {
    state = {};
});

describe('Navigation', () => {
    it('1 should be equal to 1', () => {
        expect(1).toEqual(1);
    });
});
