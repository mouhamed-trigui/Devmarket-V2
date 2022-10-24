import React from 'react';
import { Button as BButton } from 'react-native';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('My button', () => {
    it('should render successfully', () => {
        const myButtonElement = renderer
            .create(<Button title={'Test'} onPress={() => jest.fn()} />)
            .toJSON();
        expect(myButtonElement).toBeTruthy();
    });
    it("have title 'My Button' ", () => {
        const myButtonElement = renderer.create(
            <Button title={'Test'} onPress={() => jest.fn()} />
        );
        expect(myButtonElement.root.findByType(BButton).props.title).toEqual(
            'My button'
        );
    });
});
