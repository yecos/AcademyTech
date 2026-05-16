"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Code2,
  Eye,
  Terminal,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Cargando editor...</span>
      </div>
    </div>
  ),
});

export interface SandboxFile {
  language: "html" | "css" | "javascript";
  code: string;
  filename?: string;
}

interface CodeSandboxProps {
  files?: SandboxFile[];
  initialCode?: string;
  language?: "html" | "css" | "javascript";
  title?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
}

// Default starter code for each language
const DEFAULT_FILES: Record<string, SandboxFile[]> = {
  html: [
    {
      language: "html",
      code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Página</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    h1 {
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body>
  <h1>¡Hola Mundo!</h1>
</body>
</html>`,
      filename: "index.html",
    },
  ],
  css: [
    {
      language: "css",
      code: `/* Estilos CSS */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.title {
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
      filename: "styles.css",
    },
  ],
  javascript: [
    {
      language: "javascript",
      code: `// JavaScript - Prueba tu código aquí
console.log("¡Hola desde JavaScript!");

// Ejemplo: operaciones con arrays
const numeros = [1, 2, 3, 4, 5];
const cuadrados = numeros.map(n => n ** 2);
console.log("Números:", numeros);
console.log("Cuadrados:", cuadrados);
console.log("Suma:", cuadrados.reduce((a, b) => a + b, 0));

// Ejemplo: objeto
const estudiante = {
  nombre: "Ana",
  edad: 22,
  curso: "Programación Web"
};
console.log("Estudiante:", estudiante);`,
      filename: "script.js",
    },
  ],
};

function getMonacoLanguage(lang: string): string {
  switch (lang) {
    case "html":
      return "html";
    case "css":
      return "css";
    case "javascript":
      return "javascript";
    default:
      return "plaintext";
  }
}

export function CodeSandbox({
  files: propFiles,
  initialCode,
  language: propLanguage = "html",
  title = "Code Sandbox",
  isExpanded: propIsExpanded,
  onToggleExpand,
  onClose,
}: CodeSandboxProps) {
  const { resolvedTheme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [previewKey, setPreviewKey] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("html");

  // Determine initial files
  const [files, setFiles] = useState<SandboxFile[]>(() => {
    if (propFiles && propFiles.length > 0) {
      return propFiles;
    }
    if (initialCode) {
      return [
        {
          language: propLanguage,
          code: initialCode,
          filename:
            propLanguage === "html"
              ? "index.html"
              : propLanguage === "css"
                ? "styles.css"
                : "script.js",
        },
      ];
    }
    return DEFAULT_FILES[propLanguage] || DEFAULT_FILES.html;
  });

  // Store the initial files for reset
  const initialFilesRef = useRef<SandboxFile[]>(files);

  // Determine which tabs to show
  const availableTabs = files.map((f, i) => ({
    id: f.language === "javascript" ? "js" : f.language,
    label:
      f.language === "html"
        ? "HTML"
        : f.language === "css"
          ? "CSS"
          : f.language === "javascript"
            ? "JS"
            : String(f.language).toUpperCase(),
    index: i,
  }));

  // Ensure a "Preview" tab is always available
  const allTabs = [...availableTabs, { id: "preview", label: "Preview", index: -1 }];

  // Get current file index
  const currentFileIndex = availableTabs.find(
    (t) => t.id === activeTab
  )?.index;
  const currentFile =
    currentFileIndex !== undefined && currentFileIndex >= 0
      ? files[currentFileIndex]
      : null;

  // Build the HTML for preview
  const buildPreviewHtml = useCallback((): string => {
    const htmlFile = files.find((f) => f.language === "html");
    const cssFile = files.find((f) => f.language === "css");
    const jsFile = files.find((f) => f.language === "javascript");

    // If there's a full HTML file, use it as base
    if (htmlFile) {
      let html = htmlFile.code;

      if (cssFile) {
        const styleTag = `<style>\n${cssFile.code}\n</style>`;
        if (html.includes("</head>")) {
          html = html.replace("</head>", `${styleTag}\n</head>`);
        } else if (html.includes("<head>")) {
          html = html.replace("<head>", `<head>\n${styleTag}`);
        } else {
          html = `${styleTag}\n${html}`;
        }
      }

      if (jsFile) {
        const scriptTag = `<script>\n${jsFile.code}\n<\/script>`;
        if (html.includes("</body>")) {
          html = html.replace("</body>", `${scriptTag}\n</body>`);
        } else {
          html = `${html}\n${scriptTag}`;
        }
      }

      return html;
    }

    // No HTML file - build minimal document
    const parts: string[] = [];
    parts.push("<!DOCTYPE html>");
    parts.push("<html><head><meta charset='utf-8'>");
    parts.push(
      "<meta name='viewport' content='width=device-width, initial-scale=1'>"
    );

    if (cssFile) {
      parts.push(`<style>\n${cssFile.code}\n</style>`);
    }

    parts.push("</head><body>");

    if (jsFile) {
      // JS-only: capture console output
      parts.push(
        `<div id="console-output" style="font-family:'Courier New',monospace;background:#1e1e1e;color:#e0e0e0;padding:12px;min-height:100vh;margin:0;font-size:13px;white-space:pre-wrap;line-height:1.6;"></div>`
      );
      parts.push(`<script>
(function() {
  const output = document.getElementById('console-output');
  function appendLine(type, args) {
    const div = document.createElement('div');
    div.style.color = type === 'error' ? '#ff5555' : type === 'warn' ? '#f0ad4e' : type === 'info' ? '#5bc0de' : '#e0e0e0';
    div.textContent = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    output.appendChild(div);
  }
  const origLog = console.log;
  console.log = function() { appendLine('log', Array.from(arguments)); origLog.apply(console, arguments); window.parent.postMessage({type:'console',method:'log',args:Array.from(arguments).map(a=>typeof a==='object'?JSON.stringify(a):String(a))}, '*'); };
  console.error = function() { appendLine('error', Array.from(arguments)); window.parent.postMessage({type:'console',method:'error',args:Array.from(arguments).map(a=>String(a))}, '*'); };
  console.warn = function() { appendLine('warn', Array.from(arguments)); window.parent.postMessage({type:'console',method:'warn',args:Array.from(arguments).map(a=>String(a))}, '*'); };
  try {
    ${jsFile.code}
  } catch(e) {
    appendLine('error', ['Error: ' + e.message]);
    window.parent.postMessage({type:'console',method:'error',args:['Error: ' + e.message]}, '*');
  }
})();
<\/script>`);
    } else if (cssFile) {
      // CSS-only: show sample HTML with the styles applied
      parts.push(
        `<div class="preview"><h1>CSS Preview</h1><p>Add HTML to see your styles in action.</p></div>`
      );
    }

    parts.push("</body></html>");
    return parts.join("\n");
  }, [files]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        event.data.type === "console" &&
        event.data.method
      ) {
        const prefix =
          event.data.method === "error"
            ? "❌ "
            : event.data.method === "warn"
              ? "⚠️ "
              : event.data.method === "info"
                ? "ℹ️ "
                : "→ ";
        setConsoleOutput((prev) => [
          ...prev,
          `${prefix}${event.data.args.join(" ")}`,
        ]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Run the code
  const handleRun = useCallback(() => {
    setConsoleOutput([]);
    setPreviewKey((k) => k + 1);
  }, []);

  // Reset code to initial
  const handleReset = useCallback(() => {
    setFiles(initialFilesRef.current);
    setConsoleOutput([]);
    setPreviewKey((k) => k + 1);
  }, []);

  // Copy code
  const handleCopy = useCallback(() => {
    const codeToCopy = currentFile
      ? currentFile.code
      : files.map((f) => f.code).join("\n\n");
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [currentFile, files]);

  // Toggle fullscreen
  const handleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Update code in a file
  const handleCodeChange = (value: string | undefined) => {
    if (currentFileIndex !== undefined && currentFileIndex >= 0) {
      setFiles((prev) =>
        prev.map((f, i) =>
          i === currentFileIndex ? { ...f, code: value || "" } : f
        )
      );
    }
  };

  const editorTheme =
    resolvedTheme === "dark" ? "vs-dark" : "light";

  const lineCount = currentFile
    ? currentFile.code.split("\n").length
    : 0;

  // Fullscreen overlay
  if (isFullscreen) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gray-950 flex flex-col"
        >
          {/* Fullscreen toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium text-sm">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRun}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-8 gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                Ejecutar
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5 text-xs h-8 gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>
              <Button
                onClick={handleFullscreen}
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5 text-xs h-8"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Fullscreen content */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Editor */}
            <div className="flex-1 min-h-[300px] lg:min-h-0 border-r border-white/10">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <TabsList className="bg-gray-900 rounded-none border-b border-white/10 w-full justify-start h-9 p-0 px-2">
                  {availableTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="text-xs data-[active=true]:bg-white/10 data-[active=true]:text-emerald-400 text-gray-400 px-3 py-1.5"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {availableTabs.map((tab) => (
                  <TabsContent
                    key={tab.id}
                    value={tab.id}
                    className="flex-1 min-h-0"
                  >
                    <Editor
                      height="100%"
                      language={getMonacoLanguage(
                        files[tab.index].language
                      )}
                      theme={editorTheme}
                      value={files[tab.index].code}
                      onChange={(val) => {
                        setFiles((prev) =>
                          prev.map((f, i) =>
                            i === tab.index ? { ...f, code: val || "" } : f
                          )
                        );
                      }}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        tabSize: 2,
                        automaticLayout: true,
                        padding: { top: 8 },
                      }}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Preview */}
            <div className="flex-1 min-h-[300px] lg:min-h-0 bg-white relative">
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-1.5 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-white/10 z-10">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  Vista previa
                </span>
              </div>
              <iframe
                key={`preview-full-${previewKey}`}
                ref={iframeRef}
                sandbox="allow-scripts"
                srcDoc={buildPreviewHtml()}
                className="w-full h-full border-0 pt-9"
                title="Preview"
              />
            </div>
          </div>

          {/* Console (in fullscreen) */}
          {consoleOutput.length > 0 && (
            <div className="h-40 bg-gray-900 border-t border-white/10 overflow-y-auto">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  Consola ({consoleOutput.length})
                </span>
                <button
                  onClick={() => setConsoleOutput([])}
                  className="text-xs text-gray-500 hover:text-gray-300"
                >
                  Limpiar
                </button>
              </div>
              <div className="p-2 font-mono text-xs space-y-0.5">
                {consoleOutput.map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.startsWith("❌")
                        ? "text-red-400"
                        : line.startsWith("⚠️")
                          ? "text-amber-400"
                          : "text-gray-300"
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Expanded inline mode (when "Probar código" is clicked)
  const isInlineExpanded =
    propIsExpanded !== undefined ? propIsExpanded : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`glass-card rounded-xl overflow-hidden ${
        isInlineExpanded ? "border-emerald-500/20" : ""
      }`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-white/3 border-b border-gray-200 dark:border-white/8">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            onClick={handleRun}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-7 gap-1 px-2.5"
          >
            <Play className="w-3 h-3" />
            Ejecutar
          </Button>
          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 text-xs h-7 gap-1 px-2"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            onClick={handleCopy}
            size="sm"
            variant="outline"
            className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 text-xs h-7 px-2"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
          <Button
            onClick={handleFullscreen}
            size="sm"
            variant="outline"
            className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 text-xs h-7 px-2"
          >
            <Maximize2 className="w-3 h-3" />
          </Button>
          {onClose && (
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 text-xs h-7 px-2"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-gray-200 dark:border-white/8 bg-gray-100 dark:bg-white/2">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-transparent rounded-none h-9 w-full justify-start p-0 px-2 gap-0.5">
            {allTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="text-xs data-[active=true]:bg-white dark:data-[active=true]:bg-white/10 data-[active=true]:text-emerald-600 dark:data-[active=true]:text-emerald-400 data-[active=true]:shadow-sm text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-md"
              >
                {tab.id === "preview" && <Eye className="w-3 h-3 mr-1" />}
                {tab.id === "js" && <Terminal className="w-3 h-3 mr-1" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Editor & Preview content */}
          <div className="flex flex-col lg:flex-row min-h-[350px]">
            {/* Editor panels */}
            {availableTabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="flex-1 min-w-0 min-h-[300px] lg:min-h-0"
              >
                <Editor
                  height="300px"
                  language={getMonacoLanguage(files[tab.index].language)}
                  theme={editorTheme}
                  value={files[tab.index].code}
                  onChange={(val) => {
                    setFiles((prev) =>
                      prev.map((f, i) =>
                        i === tab.index ? { ...f, code: val || "" } : f
                      )
                    );
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    tabSize: 2,
                    automaticLayout: true,
                    padding: { top: 8 },
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    scrollbar: {
                      verticalScrollbarSize: 6,
                      horizontalScrollbarSize: 6,
                    },
                  }}
                />
              </TabsContent>
            ))}

            {/* Preview tab content */}
            <TabsContent
              value="preview"
              className="flex-1 min-w-0 min-h-[300px]"
            >
              <div className="relative h-full">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-white/8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 py-0.5 text-xs text-gray-400">
                    localhost:3000
                  </div>
                </div>
                <iframe
                  key={`preview-inline-${previewKey}`}
                  ref={iframeRef}
                  sandbox="allow-scripts"
                  srcDoc={buildPreviewHtml()}
                  className="w-full border-0 bg-white"
                  style={{ height: "284px" }}
                  title="Preview"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Split view: Editor on left, Preview on right (visible when not on a preview/editor tab) */}
      <div className="hidden lg:flex min-h-[400px]">
        {/* This is rendered via the Tabs above on larger screens */}
      </div>

      {/* Console output bar */}
      <AnimatePresence>
        {consoleOutput.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showConsole ? "auto" : "32px", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-200 dark:border-white/8 bg-gray-900 overflow-hidden"
          >
            <button
              onClick={() => setShowConsole(!showConsole)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-gray-400 hover:text-gray-300"
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3" />
                Consola ({consoleOutput.length})
              </span>
              {showConsole ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </button>
            {showConsole && (
              <div className="px-3 pb-2 font-mono text-xs space-y-0.5 max-h-32 overflow-y-auto">
                {consoleOutput.map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.startsWith("❌")
                        ? "text-red-400"
                        : line.startsWith("⚠️")
                          ? "text-amber-400"
                          : "text-gray-300"
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-gray-100 dark:bg-white/3 border-t border-gray-200 dark:border-white/8">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Code2 className="w-3 h-3" />
            {currentFile?.language.toUpperCase() || "HTML"}
          </span>
          <span>{lineCount} líneas</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {currentFile?.filename || "untitled"}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * A compact code block component that shows code with a "Probar código" button.
 * When clicked, it expands into a full CodeSandbox.
 */
export function CodeBlockWithSandbox({
  code,
  language,
  filename,
}: {
  code: string;
  language: "html" | "css" | "javascript";
  filename?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const editorTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  if (isExpanded) {
    return (
      <div className="my-6">
        <CodeSandbox
          files={[{ language, code, filename }]}
          language={language}
          title={filename || `Código ${language.toUpperCase()}`}
          isExpanded={true}
          onClose={() => setIsExpanded(false)}
        />
      </div>
    );
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-white/8">
      {/* Code block header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/8">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {filename}
            </span>
          )}
        </div>
        <Button
          onClick={() => setIsExpanded(true)}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-7 gap-1.5 px-3"
        >
          <Play className="w-3 h-3" />
          Probar código
        </Button>
      </div>

      {/* Code display (read-only Monaco) */}
      <div className="max-h-64 overflow-hidden">
        <Editor
          height="200px"
          language={getMonacoLanguage(language)}
          theme={editorTheme}
          value={code}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
            padding: { top: 8 },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              verticalScrollbarSize: 4,
              horizontalScrollbarSize: 4,
            },
            domReadOnly: true,
            renderLineHighlight: "none",
          }}
        />
      </div>
    </div>
  );
}
