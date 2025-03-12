import * as assert from 'assert';
import { analyzeBigOComplexity } from '../../analyzer';

suite('Analyzer Tests', () => {
  test('Should detect JavaScript function with O(1) complexity', () => {
    const code = `
      function simpleFunction() {
        return 42;
      }
    `;
    
    const results = analyzeBigOComplexity(code, 'javascript');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].name, 'simpleFunction');
    assert.strictEqual(results[0].complexity, '1');
  });
  
  test('Should detect JavaScript function with O(n) complexity', () => {
    const code = `
      function linearSearch(arr, target) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === target) return i;
        }
        return -1;
      }
    `;
    
    const results = analyzeBigOComplexity(code, 'javascript');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].name, 'linearSearch');
    assert.strictEqual(results[0].complexity, 'n');
  });
  
  test('Should detect JavaScript function with O(n²) complexity', () => {
    const code = `
      function bubbleSort(arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
        }
        return arr;
      }
    `;
    
    const results = analyzeBigOComplexity(code, 'javascript');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].name, 'bubbleSort');
    assert.strictEqual(results[0].complexity, 'n²');
  });
});