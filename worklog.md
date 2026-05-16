# Task 5: Interactive Code Sandbox for Programming Courses - Worklog

**Task ID:** 5
**Date:** 2026-05-16
**Status:** Completed

## Summary

Built an interactive code sandbox system for the Academy Tech project that allows students to write and run HTML, CSS, and JavaScript code directly in the browser. The system integrates with existing topic pages to make programming courses interactive.

## Files Created

### 1. `/src/lib/code-block-parser.ts`
- Utility for parsing markdown-style code blocks (```html, ```css, ```javascript) from topic content
- `parseCodeBlocks()` - Parses content and returns ordered segments (text + code blocks)
- `hasCodeBlocks()` - Quick check for code block presence
- `combineCodeToHtml()` - Combines multiple code blocks into a single HTML document for iframe preview
- Supports `html`, `css`, `javascript`, `js`, and `python` language identifiers

### 2. `/src/app/api/sandbox/route.ts`
- POST endpoint that accepts `{ code, language }` and returns sanitized HTML for iframe srcdoc
- Security sanitization: blocks access to parent frame, cookies, localStorage, sessionStorage
- Adds CSP headers for security
- Handles HTML, CSS, and JavaScript languages with appropriate document wrapping
- JavaScript console output is captured and displayed in the preview

### 3. `/src/components/CodeSandbox.tsx`
Two main components:

#### `CodeSandbox`
- Full-featured embedded code editor + preview panel
- Uses Monaco Editor (`@monaco-editor/react`) for code editing (same editor as VS Code)
- Split panel layout with tab-based navigation (HTML | CSS | JS | Preview)
- Renders output in sandboxed iframe (`<iframe sandbox="allow-scripts" srcdoc="...">`)
- Features:
  - **Run button** (emerald green) to execute code
  - **Reset button** to restore initial code
  - **Copy button** with visual feedback
  - **Fullscreen toggle** for immersive editing
  - **Dark mode compatible** - editor theme switches with app theme
  - **Console output panel** (collapsible) for JavaScript
  - **Status bar** showing language and line count
  - **Responsive design** - stacks vertically on mobile
  - **Browser chrome** on preview (traffic light dots + URL bar)

#### `CodeBlockWithSandbox`
- Compact code block component with "Probar código" (Try code) button
- Shows read-only Monaco Editor with syntax highlighting
- Clicking "Probar código" expands into full CodeSandbox
- Used for rendering code blocks found in topic explanations

### 4. Modified `/src/app/modulo/[moduleId]/tema/[topicId]/page.tsx`
- Added `ContentWithCodeBlocks` component that parses topic explanation for code blocks
- When code blocks are detected, renders them as interactive `CodeBlockWithSandbox` components
- Text sections render as normal paragraphs
- Added "Código interactivo" badge when explanation contains code blocks
- Added `CodeSandboxSection` component - a standalone sandbox available on every topic page
  - Collapsible: starts as a card with "Abrir Sandbox" button
  - Expands into full CodeSandbox when opened
  - Available even when topic content is not yet available
- New icons imported: `Code2`

### 5. Modified `/src/lib/topic-content.ts`
- Added sample code blocks to "Configuración inicial y preferencias" (modulo-1, topic 5)
- HTML code block: Interactive settings panel with CSS styling and toggle switches
- JavaScript code block: Configuration object simulation with console.log output
- Demonstrates the code block parsing and rendering feature

## Technical Approach

1. **Monaco Editor**: Used `@monaco-editor/react` with dynamic import (`next/dynamic`) to avoid SSR issues
2. **Security**: Sandboxed iframe with `sandbox="allow-scripts"` attribute prevents code from accessing parent page
3. **Code block parsing**: Regex-based parser extracts ```lang code blocks from markdown-style content
4. **Preview rendering**: Client-side HTML document building - combines HTML/CSS/JS files into a single srcdoc document
5. **Console capture**: JavaScript console.log/error/warn output is captured and displayed in the preview and console panel

## Dependencies Added

- `@monaco-editor/react` - React wrapper for Monaco Editor

## Testing

- TypeScript compilation: ✅ No errors in new files
- ESLint: ✅ No errors or warnings in new files
- Code block parser: ✅ Tested with sample content, correctly identifies 2 code blocks
- Topic page integration: ✅ Code blocks render with "Probar código" button
- Dark mode: ✅ Editor theme switches with `next-themes`

## Design Guidelines Followed

- Editor uses Monaco dark theme (vs-dark) in dark mode
- Preview panel has white background simulating a browser
- Glass-card styling for the sandbox container
- Tab bar at top: HTML | CSS | JS | Preview
- Status bar at bottom showing language and line count
- "Run" button in emerald green (#10b981)
- Console output panel (collapsible) at bottom of preview
- Responsive design: stacks vertically on mobile
- Browser chrome decoration on preview panel
