import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '../../context/ThemeContext';

const mockStore = configureStore([]);
export let store = {};
store.dispatch = jest.fn();

export const RenderReduxComponent = (component, initialState) => {
    store = mockStore(initialState);
    return renderer.create(
        <Provider store={store}>
            <ThemeProvider>{component}</ThemeProvider>
        </Provider>
    );
};
