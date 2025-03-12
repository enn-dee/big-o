import * as vscode from 'vscode';
import { analyzeBigOComplexity } from './analyzer';
import { ComplexityResult } from './types';

export function activate(context: vscode.ExtensionContext) {
  console.log('Big O Complexity extension is now active');

  // Create a decorator type that we'll use to decorate functions
  const complexityDecorationType = vscode.window.createTextEditorDecorationType({
    after: {
      margin: '0 0 0 1em',
      textDecoration: 'none; opacity: 0.75;'
    }
  });

  let activeEditor = vscode.window.activeTextEditor;
  let timeout: NodeJS.Timeout | undefined = undefined;

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }

    const config = vscode.workspace.getConfiguration('bigOComplexity');
    if (!config.get<boolean>('enable')) {
      return;
    }

    const languages = config.get<string[]>('languages') || [];
    if (!languages.includes(activeEditor.document.languageId)) {
      return;
    }

    const text = activeEditor.document.getText();
    const languageId = activeEditor.document.languageId;
    
    // Get complexity analysis results
    const results = analyzeBigOComplexity(text, languageId);

    const decorations: vscode.DecorationOptions[] = results.map(result => {
      const start = activeEditor!.document.positionAt(result.position.start);
      const end = activeEditor!.document.positionAt(result.position.end);
      
      return {
        range: new vscode.Range(start, end),
        renderOptions: {
          after: {
            contentText: `  O(${result.complexity})`,
            color: getColorForComplexity(result.complexity),
            fontWeight: 'normal'
          }
        }
      };
    });

    activeEditor.setDecorations(complexityDecorationType, decorations);
  }

  function getColorForComplexity(complexity: string): string {
    // Simple color scheme based on complexity
    switch (complexity) {
      case '1': 
      case 'log n': 
        return '#4CAF50'; // Green for efficient
      case 'n': 
      case 'n log n': 
        return '#2196F3'; // Blue for decent
      case 'n²': 
        return '#FF9800'; // Orange for concerning
      case 'n³': 
      case '2^n': 
      case 'n!': 
        return '#F44336'; // Red for inefficient
      default: 
        return '#9E9E9E'; // Grey for unknown
    }
  }

  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(updateDecorations, 500);
  }

  if (activeEditor) {
    triggerUpdateDecorations();
  }

  // Update decorations when editor changes
  vscode.window.onDidChangeActiveTextEditor(editor => {
    activeEditor = editor;
    if (editor) {
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);

  // Update decorations when document changes
  vscode.workspace.onDidChangeTextDocument(event => {
    if (activeEditor && event.document === activeEditor.document) {
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);

  // Register a command to manually trigger analysis
  const disposable = vscode.commands.registerCommand('bigOComplexity.analyze', () => {
    updateDecorations();
    vscode.window.showInformationMessage('Big O complexity analysis completed');
  });

  context.subscriptions.push(disposable);
}