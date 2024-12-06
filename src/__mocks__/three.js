export const TextureLoader = jest.fn();
export const WebGLRenderer = jest.fn();
export const Scene = jest.fn();
export const PerspectiveCamera = jest.fn();
export const Vector3 = jest.fn(() => ({
  set: jest.fn(),
  copy: jest.fn(),
  add: jest.fn(),
  sub: jest.fn(),
  multiplyScalar: jest.fn()
}));