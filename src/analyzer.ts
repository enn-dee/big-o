import { ComplexityResult } from './types';

/**
 * Analyzes code to determine Big O complexity of functions
 * @param code The source code to analyze
 * @param language The programming language
 * @returns Array of complexity results with positions
 */
export function analyzeBigOComplexity(code: string, language: string): ComplexityResult[] {
  // Language-specific analyzers
  switch (language) {
    case 'javascript':
    case 'typescript':
      return analyzeJavaScript(code);
    case 'python':
      return analyzePython(code);
    case 'java':
      return analyzeJava(code);
    case 'c':
    case 'cpp':
      return analyzeCCpp(code);
    default:
      return [];
  }
}

/**
 * Analyzes JavaScript/TypeScript code for complexity
 */
function analyzeJavaScript(code: string): ComplexityResult[] {
  const results: ComplexityResult[] = [];
  
  // Example parser for demo purposes
  // In a real implementation, you'd use a proper parser like Babel or TypeScript
  
  // Simple regex patterns to identify functions (this is just for demonstration)
  const functionPatterns = [
    /function\s+(\w+)\s*\([^)]*\)\s*{/g, // function declarations
    /const\s+(\w+)\s*=\s*function\s*\([^)]*\)\s*{/g, // function expressions
    /const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{/g, // arrow functions
    /(\w+)\s*\([^)]*\)\s*{/g // method definitions
  ];
  
  // Identify built-in functions with known complexities
  const builtInComplexities: Record<string, string> = {
    'sort': 'n log n',
    'filter': 'n',
    'map': 'n',
    'reduce': 'n',
    'indexOf': 'n',
    'find': 'n',
    'includes': 'n'
  };
  
  // Find functions using patterns
  functionPatterns.forEach(pattern => {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(code)) !== null) {
      const funcName = match[1];
      const startPos = match.index;
      
      // Find function body (very simplified)
      let openBraces = 1;
      let closePos = startPos + match[0].length;
      
      for (let i = closePos; i < code.length; i++) {
        if (code[i] === '{') openBraces++;
        if (code[i] === '}') openBraces--;
        
        if (openBraces === 0) {
          closePos = i + 1;
          break;
        }
      }
      
      // Analyze function complexity (simplified)
      const functionBody = code.substring(startPos, closePos);
      let complexity = analyzeCodeComplexity(functionBody);
      
      results.push({
        name: funcName,
        complexity: complexity,
        position: {
          start: startPos,
          end: startPos + funcName.length
        }
      });
    }
  });
  
  return results;
}

/**
 * Analyzes Python code for complexity
 */
function analyzePython(code: string): ComplexityResult[] {
  const results: ComplexityResult[] = [];
  
  // Simple regex to find Python functions (simplified for demo)
  const functionPattern = /def\s+(\w+)\s*\([^)]*\)\s*:/g;
  
  let match: RegExpExecArray | null;
  while ((match = functionPattern.exec(code)) !== null) {
    const funcName = match[1];
    const startPos = match.index;
    
    // Find function body (simplified)
    const functionBody = extractPythonFunctionBody(code, startPos);
    
    // Analyze function complexity
    let complexity = analyzeCodeComplexity(functionBody);
    
    results.push({
      name: funcName,
      complexity: complexity,
      position: {
        start: startPos,
        end: startPos + match[0].length - 1
      }
    });
  }
  
  return results;
}

/**
 * Extract Python function body (simplified)
 */
function extractPythonFunctionBody(code: string, startPos: number): string {
  // Find the beginning of the function body
  const bodyStartPos = code.indexOf(':', startPos) + 1;
  
  // Simple indentation-based extraction (simplified)
  const lines = code.substring(bodyStartPos).split('\n');
  let bodyLines: string[] = [];
  let insideFunction = false;
  let baseIndent = -1;
  
  for (const line of lines) {
    if (!insideFunction) {
      // Skip blank lines until we find the function body
      if (line.trim() === '') continue;
      
      baseIndent = line.search(/\S/);
      if (baseIndent >= 0) {
        insideFunction = true;
        bodyLines.push(line);
      }
    } else {
      // If we reach a line with less indentation, we're out of the function
      const indent = line.search(/\S/);
      if (line.trim() !== '' && indent <= baseIndent) {
        break;
      }
      bodyLines.push(line);
    }
  }
  
  return bodyLines.join('\n');
}

/**
 * Analyzes Java code for complexity
 */
function analyzeJava(code: string): ComplexityResult[] {
  // Similar implementation as JavaScript but with Java syntax
  const results: ComplexityResult[] = [];
  
  // Simple regex for Java methods (simplified)
  const methodPattern = /(\w+)\s+(\w+)\s*\([^)]*\)\s*{/g;
  
  // Implementation would be similar to JavaScript analyzer
  
  return results;
}

/**
 * Analyzes C/C++ code for complexity
 */
function analyzeCCpp(code: string): ComplexityResult[] {
  // Similar implementation as JavaScript but with C/C++ syntax
  const results: ComplexityResult[] = [];
  
  // Implementation would be similar to JavaScript analyzer
  
  return results;
}

/**
 * Analyzes code to determine Big O complexity
 * This is a simplified version for demonstration
 * A real implementation would need much more sophisticated analysis
 */
function analyzeCodeComplexity(code: string): string {
  // Check for nested loops (simplified)
  let loopDepth = 0;
  let maxLoopDepth = 0;
  
  // Common loop patterns
  const loopPatterns = [
    /for\s*\(/g,
    /while\s*\(/g,
    /forEach/g,
    /map\(/g
  ];
  
  // Count nested loops
  for (const pattern of loopPatterns) {
    const matches = code.match(pattern);
    if (matches) {
      loopDepth += matches.length;
    }
  }
  
  if (loopDepth > maxLoopDepth) {
    maxLoopDepth = loopDepth;
  }
  
  // Check for recursion (simplified)
  const functionNameMatch = code.match(/function\s+(\w+)/);
  if (functionNameMatch) {
    const funcName = functionNameMatch[1];
    if (code.includes(funcName + '(')) {
      // Recursive function detected
      // This is a very simplified check
      if (code.includes('return')) {
        return 'log n'; // Assume divide-and-conquer
      } else {
        return '2^n'; // Assume exponential complexity
      }
    }
  }
  
  // Check for common patterns (simplified)
  if (code.includes('sort(')) {
    return 'n log n';
  }
  
  // Based on loop nesting
  switch (maxLoopDepth) {
    case 0: return '1';
    case 1: return 'n';
    case 2: return 'n²';
    case 3: return 'n³';
    default: return 'n^' + maxLoopDepth;
  }
}