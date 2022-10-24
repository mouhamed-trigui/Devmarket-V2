import { render } from '@testing-library/react';
import ErrorBoundary from './error-boundary';
describe('ErrorBoundary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ErrorBoundary>
        <h1>h</h1>
      </ErrorBoundary>
    );
    expect(baseElement).toBeTruthy();
  });
});
