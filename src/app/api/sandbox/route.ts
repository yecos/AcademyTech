import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/sandbox
 * Accepts { code: string, language: string } and returns the code
 * wrapped in a proper HTML document for iframe srcdoc, with security sanitization.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language } = body as { code: string; language: string };

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code is required and must be a string" },
        { status: 400 }
      );
    }

    if (!language || typeof language !== "string") {
      return NextResponse.json(
        { error: "Language is required and must be a string" },
        { status: 400 }
      );
    }

    const sanitizedCode = sanitizeCode(code, language);
    const htmlDocument = wrapInHtmlDocument(sanitizedCode, language);

    return new NextResponse(htmlDocument, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy":
          "default-src 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; frame-src 'none';",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * Sanitize code to prevent access to parent frame, cookies, localStorage, etc.
 */
function sanitizeCode(code: string, _language: string): string {
  let sanitized = code;

  // Block access to parent/top frames
  sanitized = sanitized.replace(
    /\b(parent|top|window\.parent|window\.top)\b/g,
    "/* blocked */ self"
  );

  // Block access to cookies
  sanitized = sanitized.replace(
    /\bdocument\.cookie\b/g,
    '/* blocked */ ""'
  );

  // Block access to localStorage and sessionStorage
  sanitized = sanitized.replace(
    /\b(window\.localStorage|window\.sessionStorage|localStorage|sessionStorage)\b/g,
    '/* blocked */ undefined'
  );

  // Block access to opener
  sanitized = sanitized.replace(
    /\bwindow\.opener\b/g,
    '/* blocked */ null'
  );

  // Block postMessage to parent/top
  sanitized = sanitized.replace(
    /\b(parent|top|window\.parent|window\.top)\.postMessage\b/g,
    "/* blocked */ void 0"
  );

  // Block eval of iframe removal
  sanitized = sanitized.replace(
    /\bdocument\.body\.remove\b/g,
    "/* blocked */ void 0"
  );
  sanitized = sanitized.replace(
    /\bdocument\.documentElement\.remove\b/g,
    "/* blocked */ void 0"
  );

  return sanitized;
}

/**
 * Wrap code in a proper HTML document for iframe srcdoc
 */
function wrapInHtmlDocument(code: string, language: string): string {
  if (language === "html") {
    // If the code is already HTML, inject security script and return
    const securityScript = `<script>
(function() {
  // Block access to parent
  Object.defineProperty(window, 'parent', { get: () => self });
  Object.defineProperty(window, 'top', { get: () => self });
  Object.defineProperty(window, 'opener', { get: () => null });
  
  // Block cookie access
  try {
    Object.defineProperty(document, 'cookie', { get: () => '', set: () => {} });
  } catch(e) {}
  
  // Block localStorage/sessionStorage
  try {
    Object.defineProperty(window, 'localStorage', { get: () => undefined });
    Object.defineProperty(window, 'sessionStorage', { get: () => undefined });
  } catch(e) {}
})();
<\/script>`;

    // Inject the security script as the first thing in <head>
    if (code.includes("<head>")) {
      return code.replace("<head>", `<head>\n${securityScript}`);
    } else if (code.includes("<html>")) {
      return code.replace("<html>", `<html>\n<head>${securityScript}</head>`);
    } else {
      return `<!DOCTYPE html><html><head><meta charset="utf-8">${securityScript}</head><body>${code}</body></html>`;
    }
  }

  if (language === "css") {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
${code}
</style>
</head>
<body>
<div class="preview-container">
  <p>CSS loaded. Add HTML elements to see the styles applied.</p>
</div>
</body>
</html>`;
  }

  if (language === "javascript" || language === "js") {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
(function() {
  Object.defineProperty(window, 'parent', { get: () => self });
  Object.defineProperty(window, 'top', { get: () => self });
  Object.defineProperty(window, 'opener', { get: () => null });
  try { Object.defineProperty(document, 'cookie', { get: () => '', set: () => {} }); } catch(e) {}
  try { Object.defineProperty(window, 'localStorage', { get: () => undefined }); } catch(e) {}
  try { Object.defineProperty(window, 'sessionStorage', { get: () => undefined }); } catch(e) {}
})();
<\/script>
<style>
  body { font-family: 'Courier New', monospace; background: #1e1e1e; color: #e0e0e0; padding: 12px; margin: 0; }
  #console-output { white-space: pre-wrap; font-size: 13px; line-height: 1.5; }
  .log { color: #e0e0e0; }
  .error { color: #ff5555; }
  .warn { color: #f0ad4e; }
  .info { color: #5bc0de; }
</style>
</head>
<body>
<div id="console-output"></div>
<script>
(function() {
  const output = document.getElementById('console-output');
  function appendLine(type, args) {
    const div = document.createElement('div');
    div.className = type;
    div.textContent = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    output.appendChild(div);
  }
  const origLog = console.log;
  const origError = console.error;
  const origWarn = console.warn;
  const origInfo = console.info;
  console.log = function() { appendLine('log', Array.from(arguments)); origLog.apply(console, arguments); };
  console.error = function() { appendLine('error', Array.from(arguments)); origError.apply(console, arguments); };
  console.warn = function() { appendLine('warn', Array.from(arguments)); origWarn.apply(console, arguments); };
  console.info = function() { appendLine('info', Array.from(arguments)); origInfo.apply(console, arguments); };
  try {
    ${code}
  } catch(e) {
    appendLine('error', ['Runtime Error: ' + e.message]);
  }
})();
<\/script>
</body>
</html>`;
  }

  // Default: return code as-is in a basic HTML wrapper
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body><pre>${escapeHtml(code)}</pre></body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
