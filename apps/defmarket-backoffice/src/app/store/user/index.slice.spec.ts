import {
  fetchStoreIndex,
  storeIndexAdapter,
  storeIndexReducer,
} from './store/index.slice';
describe('storeIndex reducer', () => {
  it('should handle initial state', () => {
    const expected = storeIndexAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });
    expect(storeIndexReducer(undefined, { type: '' })).toEqual(expected);
  });
  it('should handle fetchStoreIndexs', () => {
    let state = storeIndexReducer(
      undefined,
      fetchStoreIndex.pending(null, null)
    );
    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );
    state = storeIndexReducer(
      state,
      fetchStoreIndex.fulfilled([{ id: 1 }], null, null)
    );
    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );
    state = storeIndexReducer(
      state,
      fetchStoreIndex.rejected(new Error('Uh oh'), null, null)
    );
    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
