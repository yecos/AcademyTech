export interface CodeBlock {
  language: "html" | "css" | "javascript" | "python";
  code: string;
  filename?: string;
  index: number; // position in the content
}

export interface ParsedContent {
  segments: ContentSegment[];
  codeBlocks: CodeBlock[];
}

export type ContentSegment =
  | { type: "text"; content: string }
  | { type: "code"; block: CodeBlock };

/**
 * Parses markdown-style code blocks from topic content.
 * Supports ```html, ```css, ```javascript, ```js, ```python code blocks.
 * Returns an ordered list of segments (text and code) for rendering.
 */
export function parseCodeBlocks(content: string): ParsedContent {
  const segments: ContentSegment[] = [];
  const codeBlocks: CodeBlock[] = [];

  // Regex to match code blocks: ```lang\n...code...\n```
  const codeBlockRegex = /```(html|css|javascript|js|python)\s*\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let codeIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const rawLang = match[1].toLowerCase();
    const code = match[2].trim();

    // Normalize language names
    const language = rawLang === "js" ? "javascript" : (rawLang as CodeBlock["language"]);

    // Add text before this code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        segments.push({ type: "text", content: textContent });
      }
    }

    // Add code block
    const block: CodeBlock = {
      language,
      code,
      index: codeIndex,
    };
    codeBlocks.push(block);
    segments.push({ type: "code", block });
    codeIndex++;

    lastIndex = match.index + fullMatch.length;
  }

  // Add remaining text after last code block
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      segments.push({ type: "text", content: textContent });
    }
  }

  return { segments, codeBlocks };
}

/**
 * Check if content contains any code blocks
 */
export function hasCodeBlocks(content: string): boolean {
  return /```(html|css|javascript|js|python)\s*\n[\s\S]*?```/.test(content);
}

/**
 * Combine HTML, CSS, and JS code blocks into a single HTML document
 * suitable for iframe srcdoc
 */
export function combineCodeToHtml(codeBlocks: CodeBlock[]): string {
  const htmlBlock = codeBlocks.find((b) => b.language === "html");
  const cssBlock = codeBlocks.find((b) => b.language === "css");
  const jsBlock = codeBlocks.find((b) => b.language === "javascript");

  // If there's a full HTML block, use it as the base and inject CSS/JS
  if (htmlBlock) {
    let html = htmlBlock.code;

    // Inject CSS into <head> or before </head>
    if (cssBlock) {
      const styleTag = `<style>${cssBlock.code}</style>`;
      if (html.includes("</head>")) {
        html = html.replace("</head>", `${styleTag}\n</head>`);
      } else if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>\n${styleTag}`);
      } else {
        html = `${styleTag}\n${html}`;
      }
    }

    // Inject JS before </body>
    if (jsBlock) {
      const scriptTag = `<script>${jsBlock.code}<\/script>`;
      if (html.includes("</body>")) {
        html = html.replace("</body>", `${scriptTag}\n</body>`);
      } else {
        html = `${html}\n${scriptTag}`;
      }
    }

    return html;
  }

  // Otherwise, construct a minimal HTML document
  const parts: string[] = [];

  parts.push("<!DOCTYPE html>");
  parts.push("<html><head><meta charset='utf-8'>");
  parts.push(
    "<meta name='viewport' content='width=device-width, initial-scale=1'>"
  );

  if (cssBlock) {
    parts.push(`<style>${cssBlock.code}</style>`);
  }

  parts.push("</head><body>");

  // If no HTML but there's JS with DOM manipulation, add a container
  if (jsBlock && !htmlBlock) {
    parts.push('<div id="output"></div>');
    // Wrap JS to capture console.log and display output
    parts.push(`<script>
(function() {
  const _origLog = console.log;
  const _origError = console.error;
  const _origWarn = console.warn;
  const outputEl = document.getElementById('output');

  function appendOutput(type, args) {
    const line = document.createElement('div');
    line.className = 'console-' + type;
    line.textContent = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    outputEl.appendChild(line);
  }

  console.log = function() { appendOutput('log', Array.from(arguments)); _origLog.apply(console, arguments); };
  console.error = function() { appendOutput('error', Array.from(arguments)); _origError.apply(console, arguments); };
  console.warn = function() { appendOutput('warn', Array.from(arguments)); _origWarn.apply(console, arguments); };

  try {
    ${jsBlock.code}
  } catch(e) {
    appendOutput('error', [e.message]);
  }
})();
<\/script>`);
    parts.push(
      "<style>#output{font-family:monospace;font-size:14px;padding:8px;white-space:pre-wrap;} .console-log{color:#e0e0e0;} .console-error{color:#ff5555;} .console-warn{color:#f0ad4e;}</style>"
    );
  }

  parts.push("</body></html>");

  return parts.join("\n");
}
