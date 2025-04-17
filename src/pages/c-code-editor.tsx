import React, { useState } from "react";
import {
  AlertCircle,
  Moon,
  Sun,
  Settings,
  Play,
  Terminal,
  Loader,
} from "lucide-react";

// This component creates a text editor with C programming autocompletion, theme support and compilation
const CCodeEditor = () => {
  const [code, setCode] = useState(
    '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ row: 3, col: 8 });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof themes>("monokai");
  const [showSettings, setShowSettings] = useState(false);
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [compileError, setCompileError] = useState<string[] | null>(null);

  // Define available themes
  const themes = {
    "vscode-dark": {
      name: "VS Code Dark",
      background: "#1e1e1e",
      text: "#d4d4d4",
      headerBg: "#333333",
      headerText: "#ffffff",
      border: "#474747",
      keywords: "#569CD6",
      preprocessor: "#C586C0",
      comments: "#6A9955",
      strings: "#CE9178",
      numbers: "#B5CEA8",
      functions: "#DCDCAA",
      consoleBg: "#1e1e1e",
      consoleText: "#cccccc",
      consoleBorder: "#474747",
      buttonBg: "#0e639c",
      buttonHoverBg: "#1177bb",
      buttonText: "#ffffff",
      suggestions: {
        bg: "#252526",
        hoverBg: "#37373d",
        selectedBg: "#04395e",
        text: "#d4d4d4",
        border: "#474747",
      },
    },
    "vscode-light": {
      name: "VS Code Light",
      background: "#ffffff",
      text: "#000000",
      headerBg: "#f3f3f3",
      headerText: "#333333",
      border: "#cccccc",
      keywords: "#0000ff",
      preprocessor: "#a31515",
      comments: "#008000",
      strings: "#a31515",
      numbers: "#098658",
      functions: "#795e26",
      consoleBg: "#f3f3f3",
      consoleText: "#333333",
      consoleBorder: "#cccccc",
      buttonBg: "#007acc",
      buttonHoverBg: "#0062a3",
      buttonText: "#ffffff",
      suggestions: {
        bg: "#f3f3f3",
        hoverBg: "#e8e8e8",
        selectedBg: "#cee3f8",
        text: "#000000",
        border: "#cccccc",
      },
    },
    monokai: {
      name: "Monokai",
      background: "#272822",
      text: "#f8f8f2",
      headerBg: "#414339",
      headerText: "#f8f8f2",
      border: "#49483e",
      keywords: "#f92672",
      preprocessor: "#a6e22e",
      comments: "#75715e",
      strings: "#e6db74",
      numbers: "#ae81ff",
      functions: "#66d9ef",
      consoleBg: "#272822",
      consoleText: "#f8f8f2",
      consoleBorder: "#49483e",
      buttonBg: "#a6e22e",
      buttonHoverBg: "#b6f23f",
      buttonText: "#272822",
      suggestions: {
        bg: "#272822",
        hoverBg: "#3e3d32",
        selectedBg: "#49483e",
        text: "#f8f8f2",
        border: "#49483e",
      },
    },
    github: {
      name: "GitHub",
      background: "#ffffff",
      text: "#24292e",
      headerBg: "#f6f8fa",
      headerText: "#24292e",
      border: "#e1e4e8",
      keywords: "#d73a49",
      preprocessor: "#6f42c1",
      comments: "#6a737d",
      strings: "#032f62",
      numbers: "#005cc5",
      functions: "#6f42c1",
      consoleBg: "#f6f8fa",
      consoleText: "#24292e",
      consoleBorder: "#e1e4e8",
      buttonBg: "#2ea44f",
      buttonHoverBg: "#22863a",
      buttonText: "#ffffff",
      suggestions: {
        bg: "#ffffff",
        hoverBg: "#f6f8fa",
        selectedBg: "#0366d6",
        selectedText: "#ffffff",
        text: "#24292e",
        border: "#e1e4e8",
      },
    },
    dracula: {
      name: "Dracula",
      background: "#282a36",
      text: "#f8f8f2",
      headerBg: "#44475a",
      headerText: "#f8f8f2",
      border: "#6272a4",
      keywords: "#ff79c6",
      preprocessor: "#8be9fd",
      comments: "#6272a4",
      strings: "#f1fa8c",
      numbers: "#bd93f9",
      functions: "#50fa7b",
      consoleBg: "#282a36",
      consoleText: "#f8f8f2",
      consoleBorder: "#6272a4",
      buttonBg: "#bd93f9",
      buttonHoverBg: "#d1a0ff",
      buttonText: "#282a36",
      suggestions: {
        bg: "#282a36",
        hoverBg: "#44475a",
        selectedBg: "#6272a4",
        text: "#f8f8f2",
        border: "#6272a4",
      },
    },
  };

  // C programming keywords, functions, and common snippets for autocompletion
  const cKeywords = [
    "auto",
    "break",
    "case",
    "char",
    "const",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extern",
    "float",
    "for",
    "goto",
    "if",
    "int",
    "long",
    "register",
    "return",
    "short",
    "signed",
    "sizeof",
    "static",
    "struct",
    "switch",
    "typedef",
    "union",
    "unsigned",
    "void",
    "volatile",
    "while",
  ];

  const cLibraryFunctions = [
    "printf(",
    "scanf(",
    "fprintf(",
    "fscanf(",
    "sprintf(",
    "sscanf(",
    "fopen(",
    "fclose(",
    "fread(",
    "fwrite(",
    "fgets(",
    "fputs(",
    "malloc(",
    "calloc(",
    "realloc(",
    "free(",
    "strlen(",
    "strcpy(",
    "strncpy(",
    "strcat(",
    "strncat(",
    "strcmp(",
    "strncmp(",
    "memcpy(",
    "memmove(",
    "memset(",
    "memcmp(",
  ];

  const cSnippets = [
    "for (int i = 0; i < n; i++) {\n    \n}",
    "if () {\n    \n}",
    "if () {\n    \n} else {\n    \n}",
    "while () {\n    \n}",
    "do {\n    \n} while ();",
    "switch () {\n    case :\n        break;\n    default:\n        break;\n}",
    "struct  {\n    \n};",
  ];

  // All completion options combined
  const allCompletions: string[] = [
    ...cKeywords,
    ...cLibraryFunctions,
    ...cSnippets,
  ];

  // Function to handle input changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);

    // Get cursor position
    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newCode.substring(0, cursorPos);

    // Calculate row and column for display purposes
    const lines = textBeforeCursor.split("\n");
    const row = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursorPosition({ row, col });

    // Extract the current word being typed
    const lastWord = textBeforeCursor.split(/[\s\n;{}()[\]]/).pop() || "";

    if (lastWord && lastWord.length > 1) {
      // Filter suggestions based on the current word
      const filtered = allCompletions.filter((item) =>
        item.toLowerCase().startsWith(lastWord.toLowerCase())
      );

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Function to handle selection of a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    const cursorPos = (document.getElementById("editor") as HTMLTextAreaElement)
      .selectionStart;
    const textBeforeCursor = code.substring(0, cursorPos);
    const lastWord = textBeforeCursor.split(/[\s\n;{}()[\]]/).pop() || ""; // Fallback to an empty string

    // Replace the current word with the selected suggestion
    const textBeforeWord = textBeforeCursor.substring(
      0,
      textBeforeCursor.length - lastWord.length
    );
    const textAfterCursor = code.substring(cursorPos);

    // Handle special case for snippets (which contain newlines)
    if (suggestion.includes("\n")) {
      const indentation = textBeforeCursor.match(/^\s*/m)?.[0] || ""; // Using optional chaining
      // Add indentation to each line of the snippet
      const indentedSnippet = suggestion.replace(/\n/g, "\n" + indentation);
      setCode(textBeforeWord + indentedSnippet + textAfterCursor);
    } else {
      setCode(textBeforeWord + suggestion + textAfterCursor);
    }

    setShowSuggestions(false);

    // Focus back on the editor
    setTimeout(() => {
      const editor = document.getElementById("editor") as HTMLTextAreaElement;
      editor.focus();
      // Set cursor position after the inserted suggestion
      const newCursorPos = textBeforeWord.length + suggestion.length;
      editor.selectionStart = newCursorPos;
      editor.selectionEnd = newCursorPos;
    }, 0);
  };

  // Handle keyboard navigation through suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" || e.key === "Tab") {
        if (suggestions.length > 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedSuggestion]);
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    }
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const themeKeys = Object.keys(themes) as Array<keyof typeof themes>;
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Change to a specific theme
  const changeTheme = (themeName: keyof typeof themes) => {
    setCurrentTheme(themeName);
    setShowSettings(false);
  };

  // Toggle the console display
  const toggleConsole = () => {
    setShowConsole(!showConsole);
    if (!showConsole && !output) {
      setOutput("// Console output will appear here after running the program");
    }
  };

  // Compile the code using real GCC MinGW compiler via API
  const compileCode = () => {
    setIsCompiling(true);
    setCompileError(null);
    setShowConsole(true);
    setOutput("Compiling with GCC MinGW...");

    // Use the provided API endpoint
    fetch("http://69.62.75.214:3001/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOutput(
            "Compilation successful! Program is ready to run.\nCompiler output:\n" +
              data.compilerOutput
          );
          setIsCompiling(false);
          setCompileError(null);
        } else {
          setCompileError(data.errors || [data.compilerOutput]);
          setOutput("Compilation failed:\n\n" + data.compilerOutput);
          setIsCompiling(false);
        }
      })
      .catch((error) => {
        setCompileError([error.message]);
        setOutput(`Error connecting to compiler service: ${error.message}`);
        setIsCompiling(false);
      });
  };

  // Run the compiled code
  const runCode = () => {
    if (compileError) {
      setOutput("Cannot run: Please fix compilation errors first.");
      return;
    }

    setIsRunning(true);
    setShowConsole(true);
    setOutput("Running program...\n");

    // Use the provided API endpoint
    fetch("http://69.62.75.214:3001/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOutput("Program output:\n\n" + data.output);
        } else {
          setOutput(
            "Runtime error:\n\n" + (data.error || "An unknown error occurred.")
          );
        }
        setIsRunning(false);
      })
      .catch((error) => {
        setOutput(`Error connecting to execution service: ${error.message}`);
        setIsRunning(false);
      });
  };

  // Get current theme
  const theme = themes[currentTheme];

  // Calculate editor height based on console visibility
  const editorHeight = showConsole
    ? "calc(100vh - 260px)"
    : "calc(100vh - 60px)";

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.background,
        color: theme.text,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: editorHeight,
          border: `1px solid ${theme.border}`,
          borderRadius: "0.375rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: theme.headerBg,
            color: theme.headerText,
            padding: "8px 16px",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
            height: "40px",
          }}
        >
          <div style={{ fontSize: "0.875rem" }}>C Programming Editor</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "0.875rem", marginRight: "20px" }}>
              Line: {cursorPosition.row}, Column: {cursorPosition.col}
            </div>
            <button
              onClick={compileCode}
              disabled={isCompiling || isRunning}
              style={{
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                border: "none",
                padding: "4px 12px",
                borderRadius: "4px",
                marginRight: "8px",
                cursor: isCompiling || isRunning ? "not-allowed" : "pointer",
                opacity: isCompiling || isRunning ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                fontSize: "0.75rem",
              }}
            >
              {isCompiling ? (
                <Loader
                  size={14}
                  style={{
                    marginRight: "4px",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : null}
              Compile
            </button>
            <button
              onClick={runCode}
              disabled={isCompiling || isRunning || !!compileError}
              style={{
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                border: "none",
                padding: "4px 12px",
                borderRadius: "4px",
                marginRight: "8px",
                cursor:
                  isCompiling || isRunning || !!compileError
                    ? "not-allowed"
                    : "pointer",
                opacity: isCompiling || isRunning || !!compileError ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                fontSize: "0.75rem",
              }}
            >
              {isRunning ? (
                <Loader
                  size={14}
                  style={{
                    marginRight: "4px",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                <Play size={14} style={{ marginRight: "4px" }} />
              )}
              Run
            </button>
            <button
              onClick={toggleConsole}
              style={{
                backgroundColor: "transparent",
                color: theme.headerText,
                border: "none",
                padding: "4px 8px",
                marginRight: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "0.75rem",
              }}
            >
              <Terminal size={14} style={{ marginRight: "4px" }} />
              {showConsole ? "Hide Console" : "Show Console"}
            </button>
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "8px",
                color: theme.headerText,
                display: "flex",
                alignItems: "center",
              }}
              title="Toggle Theme"
            >
              {currentTheme.includes("dark") ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
            <button
              onClick={toggleSettings}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: theme.headerText,
                display: "flex",
                alignItems: "center",
              }}
              title="Theme Settings"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Theme Settings Panel */}
        {showSettings && (
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "0",
              width: "200px",
              backgroundColor: theme.suggestions.bg,
              border: `1px solid ${theme.suggestions.border}`,
              zIndex: 20,
              borderRadius: "0 0 0 0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                padding: "8px",
                borderBottom: `1px solid ${theme.suggestions.border}`,
              }}
            >
              <div style={{ fontWeight: "bold", color: theme.headerText }}>
                Select Theme
              </div>
            </div>
            {Object.entries(themes).map(([key, themeData]) => (
              <div
                key={key}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor:
                    key === currentTheme
                      ? theme.suggestions.selectedBg
                      : "transparent",
                  color:
                    key === currentTheme
                      ? (theme.suggestions as any).selectedText ||
                        theme.suggestions.text
                      : theme.suggestions.text,
                }}
                onClick={() => changeTheme(key as keyof typeof themes)}
              >
                {themeData.name}
              </div>
            ))}
          </div>
        )}

        {/* Editor container with layered approach */}
        <div
          style={{
            position: "relative",
            top: "40px",
            left: 0,
            width: "100%",
            height: "calc(100% - 40px)",
            overflow: "hidden",
          }}
        >
          {/* Single textarea for editing */}
          <textarea
            id="editor"
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
              padding: "16px",
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "1.5",
              backgroundColor: theme.background,
              color: theme.text,
              caretColor: theme.text,
              outline: "none",
              border: "none",
              resize: "none",
              overflow: "auto",
            }}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            spellCheck="false"
          />
        </div>

        {/* Autocomplete suggestions */}
        {showSuggestions && (
          <div
            style={{
              position: "absolute",
              top: `${Math.min(cursorPosition.row * 24 + 48, 500)}px`,
              left: `${Math.min(cursorPosition.col * 8 + 16, 500)}px`,
              border: `1px solid ${theme.suggestions.border}`,
              backgroundColor: theme.suggestions.bg,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "0.375rem",
              overflow: "auto",
              maxHeight: "240px",
              zIndex: 10,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor:
                    index === selectedSuggestion
                      ? theme.suggestions.selectedBg
                      : "transparent",
                  color:
                    index === selectedSuggestion
                      ? (theme.suggestions as any).selectedText ||
                        theme.suggestions.text
                      : theme.suggestions.text,
                }}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedSuggestion(index)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Console output */}
      {showConsole && (
        <div
          style={{
            marginTop: "8px",
            padding: "8px",
            backgroundColor: theme.consoleBg,
            border: `1px solid ${theme.consoleBorder}`,
            borderRadius: "0.375rem",
            height: "200px",
            overflow: "auto",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            color: theme.consoleText,
            whiteSpace: "pre-wrap",
          }}
        >
          {output}
        </div>
      )}

      <div
        style={{
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
          fontSize: "0.875rem",
          color: theme.text,
          padding: "4px 0",
        }}
      >
        <AlertCircle
          style={{
            width: "16px",
            height: "16px",
            marginRight: "8px",
            color: theme.keywords,
          }}
        />
        <p>
          {compileError
            ? "Fix errors before running."
            : "Compile and run to see output. "}
          Current theme: {themes[currentTheme].name}
        </p>
      </div>
    </div>
  );
};

export default CCodeEditor;
