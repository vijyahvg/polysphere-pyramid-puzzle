// src/setupTests.js
import '@testing-library/jest-dom';

// Mock canvas element for Three.js
window.HTMLCanvasElement.prototype.getContext = () => ({
  fillStyle: '',
  fillRect: jest.fn(),
  drawImage: jest.fn(),
  getImageData: jest.fn(),
  putImageData: jest.fn(),
  createPattern: jest.fn(),
  scale: jest.fn()
});

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock ResizeObserver
window.ResizeObserver = window.ResizeObserver || jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));