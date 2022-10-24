import axios from 'axios';
import { act } from 'react-test-renderer';
import { RenderReduxComponent } from '../../../../utils/test/RenderRedux';
import Card from './TestCard';
import { Button } from 'react-native';
let state;
//--MockAxios---
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
    state = {
        user: {
            data: [],
        },
    };
});

// clear all mocks
afterEach(() => {
    state = {};
    jest.clearAllMocks();
});

test('Test axios', async () => {
    let cardEelement = RenderReduxComponent(<Card />, state);
    let responseData = {
        data: ['test 1', 'test 2'],
    };

    await act(async () => {
        /* await mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve(responseData)
        ); */
        await mockedAxios.get.mockResolvedValue(responseData);
    });
    /* EXPECT */
    await expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    await expect(axios.get).toHaveBeenCalledWith(
        'https://dog.ceo/api/breeds/list/all'
    );
});

test('Test axios when click to button', async () => {
    let cardEelement = RenderReduxComponent(<Card />, state);
    cardEelement.root.findByType(Button).props.onPress();
    let responseData = {
        data: ['test 3', 'test 4'],
    };

    await act(async () => {
        await mockedAxios.get.mockResolvedValue(responseData);
    });
    /* EXPECT */
    await expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    await expect(axios.get).toHaveBeenCalledWith(
        'https://dog.ceo/api/breeds/list/all'
    );
});
