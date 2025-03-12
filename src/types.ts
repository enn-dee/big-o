export interface Position {
    start: number;
    end: number;
  }
  
  export interface ComplexityResult {
    name: string;
    complexity: string;
    position: Position;
  }