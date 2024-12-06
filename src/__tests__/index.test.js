// src/__tests__/index.test.js
import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Fix mock paths by using correct relative paths
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock('../App', () => () => 'App Component');
jest.mock('../reportWebVitals', () => jest.fn());

describe('Index', () => {
  beforeEach(() => {
    // Clear any mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup
    if (document.getElementById('root')) {
      document.getElementById('root').remove();
    }
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    
    require('../index.js');
    
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(div);
  });

  it('renders in strict mode', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    
    const mockRoot = {
      render: jest.fn()
    };
    ReactDOM.createRoot.mockReturnValue(mockRoot);
    
    require('../index.js');
    
    expect(mockRoot.render).toHaveBeenCalledWith(
      expect.objectContaining({
        type: React.StrictMode,
        props: expect.any(Object)
      })
    );
  });

  it('calls reportWebVitals', () => {
    const reportWebVitals = require('../reportWebVitals').default;
    expect(reportWebVitals).toHaveBeenCalled();
  });
});