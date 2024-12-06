// src/__tests__/reportWebVitals.test.js
describe('reportWebVitals', () => {
    let reportWebVitals;
    let mockGetCLS;
    let mockGetFID;
    let mockGetFCP;
    let mockGetLCP;
    let mockGetTTFB;
  
    beforeEach(() => {
      // Reset all mocks
      jest.resetModules();
      
      // Create fresh mocks for each test
      mockGetCLS = jest.fn(cb => cb({ name: 'CLS', value: 0.1 }));
      mockGetFID = jest.fn(cb => cb({ name: 'FID', value: 100 }));
      mockGetFCP = jest.fn(cb => cb({ name: 'FCP', value: 200 }));
      mockGetLCP = jest.fn(cb => cb({ name: 'LCP', value: 300 }));
      mockGetTTFB = jest.fn(cb => cb({ name: 'TTFB', value: 400 }));
  
      // Mock web-vitals module
      jest.mock('web-vitals', () => ({
        getCLS: mockGetCLS,
        getFID: mockGetFID,
        getFCP: mockGetFCP,
        getLCP: mockGetLCP,
        getTTFB: mockGetTTFB
      }));
  
      // Import reportWebVitals after mocking
      reportWebVitals = require('../reportWebVitals').default;
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should call the callback with web vitals data when provided a valid function', async () => {
      const onPerfEntry = jest.fn();
      
      // Call reportWebVitals with mock function
      await reportWebVitals(onPerfEntry);
      
      // Wait for all promises to resolve
      await new Promise(process.nextTick);
  
      // Verify all metrics were collected
      expect(mockGetCLS).toHaveBeenCalled();
      expect(mockGetFID).toHaveBeenCalled();
      expect(mockGetFCP).toHaveBeenCalled();
      expect(mockGetLCP).toHaveBeenCalled();
      expect(mockGetTTFB).toHaveBeenCalled();
  
      // Verify callback was called with each metric
      expect(onPerfEntry).toHaveBeenCalledWith(expect.objectContaining({
        name: 'CLS',
        value: 0.1
      }));
      expect(onPerfEntry).toHaveBeenCalledWith(expect.objectContaining({
        name: 'FID',
        value: 100
      }));
      expect(onPerfEntry).toHaveBeenCalledWith(expect.objectContaining({
        name: 'FCP',
        value: 200
      }));
      expect(onPerfEntry).toHaveBeenCalledWith(expect.objectContaining({
        name: 'LCP',
        value: 300
      }));
      expect(onPerfEntry).toHaveBeenCalledWith(expect.objectContaining({
        name: 'TTFB',
        value: 400
      }));
    });
  
    it('should not call web-vitals when no callback is provided', async () => {
      await reportWebVitals();
      
      // Wait for all promises to resolve
      await new Promise(process.nextTick);
  
      expect(mockGetCLS).not.toHaveBeenCalled();
      expect(mockGetFID).not.toHaveBeenCalled();
      expect(mockGetFCP).not.toHaveBeenCalled();
      expect(mockGetLCP).not.toHaveBeenCalled();
      expect(mockGetTTFB).not.toHaveBeenCalled();
    });
  
    it('should not call web-vitals when callback is not a function', async () => {
      await reportWebVitals('not a function');
      await reportWebVitals(123);
      await reportWebVitals({});
      await reportWebVitals(null);
      
      // Wait for all promises to resolve
      await new Promise(process.nextTick);
  
      expect(mockGetCLS).not.toHaveBeenCalled();
      expect(mockGetFID).not.toHaveBeenCalled();
      expect(mockGetFCP).not.toHaveBeenCalled();
      expect(mockGetLCP).not.toHaveBeenCalled();
      expect(mockGetTTFB).not.toHaveBeenCalled();
    });
  
    it('should handle import errors gracefully', async () => {
      jest.resetModules();
      
      // Mock web-vitals to simulate import failure
      jest.mock('web-vitals', () => {
        throw new Error('Import failed');
      });
  
      // Re-import reportWebVitals with failed import mock
      const reportWebVitals = require('../reportWebVitals').default;
      const onPerfEntry = jest.fn();
  
      // Should not throw error
      await expect(reportWebVitals(onPerfEntry)).resolves.not.toThrow();
      expect(onPerfEntry).not.toHaveBeenCalled();
    });
  });