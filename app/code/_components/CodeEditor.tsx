'use client';
import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiCode, 
  FiTool, 
  FiZap, 
  FiMessageSquare, 
  FiSend, 
  FiX,
  FiCpu,
  FiLoader
} from 'react-icons/fi';

interface CodeEditorProps {
  language?: string;
  initialCode?: string;
  theme?: 'vs-dark' | 'light';
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  language = 'python', 
  initialCode = '', 
  theme = 'vs-dark' 
}) => {
  const [code, setCode] = useState(initialCode);
  const [selection, setSelection] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [actionMenuPosition, setActionMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready');
  
  const editorRef = useRef<any>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const questionInputRef = useRef<HTMLInputElement>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    
    // Listen for selection changes
    editor.onDidChangeCursorSelection((e: any) => {
      const selectedText = editor.getModel().getValueInRange(editor.getSelection());
      
      if (selectedText && selectedText.trim().length > 0) {
        setSelection(selectedText);
        
        // Calculate position for the menu (near the end of selection)
        const selectionRange = editor.getSelection();
        const endPos = editor.getScrolledVisiblePosition(
          { lineNumber: selectionRange.endLineNumber, column: selectionRange.endColumn }
        );
        
        if (endPos) {
          // Get editor container position for offset calculation
          const editorContainer = editor.getDomNode().getBoundingClientRect();
          
          // Make sure the menu appears within the editor bounds
          const menuX = Math.min(
            editorContainer.left + endPos.left + 10,
            editorContainer.right - 150 // Approximate menu width
          );
          
          const menuY = Math.min(
            editorContainer.top + endPos.top,
            editorContainer.bottom - 160 // Approximate menu height
          );
          
          setActionMenuPosition({ x: menuX, y: menuY });
        }
      } else {
        // Hide menu when no text is selected
        setActionMenuPosition(null);
      }
    });
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActionMenuPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus the question input when opening the question panel
  useEffect(() => {
    if (isAskingQuestion && questionInputRef.current) {
      questionInputRef.current.focus();
    }
  }, [isAskingQuestion]);

  const handleAIAction = async (action: 'debug' | 'improve' | 'fix') => {
    try {
      // Close the action menu
      setActionMenuPosition(null);
      
      // Show loading state
      setIsLoading(true);
      setStatusMessage(`Processing ${action} request...`);
      setSuggestion(`Generating ${action} suggestion for your code...`);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: selection, 
          action 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      setSuggestion(data.suggestion || 'AI could not generate a meaningful suggestion.');
      setStatusMessage('Ready');
    } catch (error) {
      console.error('AI Error:', error);
      setSuggestion('Failed to get AI suggestion. Please try again.');
      setStatusMessage('Error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAskQuestion = () => {
    setActionMenuPosition(null);
    setIsAskingQuestion(true);
  };
  
  const submitQuestion = async () => {
    if (!question.trim()) return;
    
    try {
      setIsLoading(true);
      setStatusMessage('Processing question...');
      setSuggestion(`Analyzing your question: "${question}"...`);
      setIsAskingQuestion(false);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: selection || code, // Use selection if available, otherwise full code
          question: question
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      setSuggestion(data.response || 'No response received from the AI.');
      setStatusMessage('Ready');
      setQuestion(''); // Reset question after submission
    } catch (error) {
      console.error('Question API Error:', error);
      setSuggestion('Failed to process your question. Please try again.');
      setStatusMessage('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestion = () => {
    if (editorRef.current && suggestion) {
      if (selection) {
        // If there was a selection, replace it
        const selectionRange = editorRef.current.getSelection();
        editorRef.current.executeEdits('ai-suggestion', [
          { range: selectionRange, text: suggestion },
        ]);
      } else {
        // If no selection, insert at cursor
        const position = editorRef.current.getPosition();
        editorRef.current.executeEdits('ai-suggestion', [
          { 
            range: { 
              startLineNumber: position.lineNumber, 
              startColumn: position.column, 
              endLineNumber: position.lineNumber, 
              endColumn: position.column 
            }, 
            text: suggestion 
          }
        ]);
      }
      
      // Clear suggestion after applying
      setSuggestion('');
    }
  };

  // Function to determine the text color based on the theme
  const getTextColor = () => {
    return theme === 'vs-dark' ? 'text-white' : 'text-gray-800';
  };

  // Function to determine panel background color based on the theme
  const getPanelBgColor = () => {
    return theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100';
  };

  // Function to determine border color based on the theme
  const getBorderColor = () => {
    return theme === 'vs-dark' ? 'border-gray-700' : 'border-gray-300';
  };

  return (
    <div className="editor-container relative h-screen flex flex-col">
      <div className="flex-grow relative">
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={initialCode}
          theme={theme}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            fontSize: 14,
            lineHeight: 1.5,
            tabSize: 2,
            automaticLayout: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderWhitespace: 'selection',
          }}
        />
        
        {actionMenuPosition && (
          <div 
            ref={actionMenuRef}
            className={`action-menu absolute rounded-lg shadow-lg overflow-hidden transform transition-opacity duration-200 ease-in-out z-50 ${
              theme === 'vs-dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{ 
              top: `${actionMenuPosition.y}px`, 
              left: `${actionMenuPosition.x}px`,
            }}
          >
            <div className="flex flex-col divide-y divide-gray-700">
              <button 
                className={`flex items-center px-4 py-3 ${
                  theme === 'vs-dark' 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => handleAIAction('debug')}
              >
                <FiTool className="mr-2 text-blue-500" /> Debug Code
              </button>
              <button 
                className={`flex items-center px-4 py-3 ${
                  theme === 'vs-dark' 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => handleAIAction('improve')}
              >
                <FiZap className="mr-2 text-yellow-500" /> Improve Code
              </button>
              <button 
                className={`flex items-center px-4 py-3 ${
                  theme === 'vs-dark' 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => handleAIAction('fix')}
              >
                <FiCode className="mr-2 text-green-500" /> Fix Code
              </button>
              <button 
                className={`flex items-center px-4 py-3 ${
                  theme === 'vs-dark' 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={handleAskQuestion}
              >
                <FiMessageSquare className="mr-2 text-purple-500" /> Ask Question
              </button>
            </div>
          </div>
        )}
        
        {isAskingQuestion && (
          <div className={`question-panel absolute bottom-24 left-0 right-0 ${getPanelBgColor()} p-4 border-t ${getBorderColor()} shadow-lg transition-all duration-300 ease-in-out`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`${getTextColor()} font-medium flex items-center`}>
                <FiMessageSquare className="mr-2 text-purple-500" /> 
                Ask about your code
              </h3>
              <button 
                onClick={() => setIsAskingQuestion(false)}
                className={`rounded-full p-1 ${
                  theme === 'vs-dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <FiX className={getTextColor()} />
              </button>
            </div>
            <div className="flex items-center">
              <input
                ref={questionInputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitQuestion()}
                placeholder="Ask a question about the selected code..."
                className={`w-full px-4 py-3 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'vs-dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 border border-gray-300'
                }`}
              />
              <button
                onClick={submitQuestion}
                disabled={isLoading}
                className={`px-4 py-3 bg-blue-600 text-white rounded-r flex items-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isLoading ? <FiLoader className="mr-1 animate-spin" /> : <FiSend className="mr-1" />}
                Send
              </button>
            </div>
          </div>
        )}

        {suggestion && (
          <div className={`suggestion-panel absolute bottom-0 left-0 right-0 ${
            theme === 'vs-dark' ? 'bg-gray-900' : 'bg-gray-50'
          } border-t ${getBorderColor()} p-4 max-h-1/3 overflow-auto transition-all duration-300 ease-in-out`}>
            <div className="suggestion-header flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FiCpu className="text-blue-500 mr-2" />
                <h3 className={`${getTextColor()} font-medium`}>AI Response</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSuggestion('')}
                  className={`${
                    theme === 'vs-dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center`}
                >
                  <FiX className="mr-1" /> Dismiss
                </button>
                <button 
                  onClick={applySuggestion}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  <FiCheckCircle className="mr-1" /> Apply to Editor
                </button>
              </div>
            </div>
            <div className={`${
              theme === 'vs-dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
            } p-4 rounded-lg overflow-auto max-h-96 shadow-inner`}>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <FiLoader className="animate-spin text-blue-500 mr-2" />
                  <span className={getTextColor()}>Processing...</span>
                </div>
              ) : (
                <pre className={`${getTextColor()} text-sm font-mono whitespace-pre-wrap`}>{suggestion}</pre>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Status bar */}
      <div className={`status-bar flex justify-between items-center px-4 py-2 text-xs ${
        theme === 'vs-dark' 
          ? 'bg-blue-900 text-white'
          : 'bg-blue-100 text-blue-800 border-t border-blue-200'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="font-medium capitalize">{language}</div>
          <div className="text-xs opacity-80">Editor v1.0</div>
        </div>
        <div className="flex items-center">
          {isLoading && <FiLoader className="animate-spin mr-1" />}
          {statusMessage}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;