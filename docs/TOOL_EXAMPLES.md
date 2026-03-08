# 🛠️ DevTools Hub: Detailed Tool Examples & Testing Suite

This document is a comprehensive guide for testing every feature of the DevTools Hub. It includes sample inputs, expected outputs, and a deep dive into all available options for each tool.

---

## 🏗️ Formatting Tools

### 1. JSON Formatter
*   **Sample Input (Minified):** `{"id":101,"active":true,"meta":{"tags":["dev","test"]}}`
*   **Expected Output:** Beautifully indented JSON with 2-space nesting.
*   **Key Features to Test:**
    *   **Auto-Format on Paste**: Copy minified JSON and paste it into the input area. It should format instantly.
    *   **Validation**: Paste invalid JSON (e.g., `{name: 'John'}`) and verify the detailed error message appears in the output card.

### 10. Code Formatter
**Objective:** Clean up minified JavaScript.
- **Input:** `function test(){console.log("hello");}`
- **Output:**
  ```javascript
  function test() {
      console.log("hello");
  }
  ```

---

## Part 3: New Utility Expansion (10 New Tools)

### 11. Number Base Converter
**Objective:** Convert a decimal number to multiple bases.
- **Input (Decimal):** `255`
- **Output:** 
  - Hex: `FF`
  - Binary: `11111111`
  - Octal: `377`

### 12. Aspect Ratio Calculator
**Objective:** Calculate dimensions for a 16:9 ratio.
- **Width:** `1920`
- **Ratio:** `16:9`
- **Resulting Height:** `1080`

### 13. CSS Unit Converter
**Objective:** Convert 24px to REM (base 16px).
- **Base Size:** `16px`
- **Input:** `24px`
- **Output:** `1.5rem`

### 14. JWT Decoder
**Objective:** Inspect a JSON Web Token payload securely.
- **Input:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Output:** Decoded JSON Payload (e.g., `{"sub": "12345", "name": "John Doe"}`)

### 15. Hashing Tool
**Objective:** Generate a SHA-256 hash for a string.
- **Input:** `hello world`
- **Algorithm:** `SHA-256`
- **Output:** `b94d27b9934d3e08...`

### 16. YAML ↔ JSON Converter
**Objective:** Convert YAML configuration to JSON.
- **Input (YAML):**
  ```yaml
  database:
    host: localhost
  ```
- **Output (JSON):** `{"database": {"host": "localhost"}}`

### 17. Image ↔ Base64 Converter
**Objective:** Convert a PNG to a Data URI.
- **Input:** `image.png` (Upload)
- **Output:** `data:image/png;base64,iVBORw...`

### 18. HTTP Header Parser
**Objective:** Analyze raw HTTP headers.
- **Input:** `Content-Type: application/json`
- **Output:** Structured table with "Indicates the media type of the resource" description.

### 19. Cron Expression Generator
**Objective:** Translate cron syntax to English.
- **Input:** `0 0 * * 1`
- **Output:** "At 00:00 AM, only on Monday"

### 20. SVG Optimizer / Compressor
**Objective:** Reduce SVG file size by removing metadata.
- **Input:** SVG from Sketch/Figma.
- **Output:** Minified SVG (often 40%+ smaller).

---

## Part 4: Feature Verification Guide
### 2. Code Formatter
*   **Input (JS):** `function add(a,b){return a+b;}`
*   **Input (CSS):s** `card{padding:10px;margin-bottom:20px;}`
*   **Options to Test:**
    *   **Language Selection**: Toggle between JavaScript, CSS, and HTML.
    *   **Indentation Size**: Toggle between **2 spaces** and **4 spaces**.
    *   **Live Update**: The output should refresh immediately when options are changed.

---

## 🔐 Security Tools

### 1. Password Generator
*   **Testing Scenarios:**
    *   **6-Digit PIN**: Length=6, Numbers=ON, Others=OFF.
    *   **Alpha-Only**: Length=12, Upper/Lower=ON, Others=OFF.
    *   **Super Secret**: Length=50, All Categories=ON.
*   **Options to Test:**
    *   **Individual Toggles**: Verify switching off "Symbols" removes all special characters.
    *   **Regenerate**: Click the "Regenerate" button to get a new string without changing settings.

---

## 💻 Developer Tools

### 1. Regex Tester
*   **Scenario: Email Extractor**
    *   **Pattern:** `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b`
    *   **Flags:** `g` (Required for multiple results), `i` (Case insensitive).
    *   **Test Text:** "Hello support@company.com and admin@site.net."
*   **Options to Test:**
    *   **Flags Bar (g, i, m, s, u, y)**: Toggle flags and watch the "Match Preview" update live.
    *   **Captures List**: Check the bottom of the tool to see individual group results ($1, $2).

### 2. UUID Generator
*   **Options to Test:**
    *   **Quantity**: Generate **1**, **10**, or **100** at a time.
    *   **Casing**: Toggle between **Lower Case** (default) and **Upper Case**.
    *   **Hyphens**: Toggle hyphens ON/OFF (e.g., `550e8400...` vs `550e8400-e29b-...`).

### 3. Timestamp Converter
*   **Input:** `1735689600` (Jan 1, 2025)
*   **Options to Test:**
    *   **Current Time**: Click "Current Time" to populate with the live Unix epoch.
    *   **Unit Detection**: Paste milliseconds vs seconds.
    *   **Format List**: Verify output shows ISO, Local String, and Relative Time (e.g., "in 10 months").

### 4. Markdown Preview
*   **Input Body:**
    ```markdown
    ### Checkbox Test
    - [x] Done
    - [ ] Pending
    
    | Table | View |
    |---|---|
    | Tech | Next.js |
    ```
*   **Key Features to Test:**
    *   **Split Pane View**: Text area on left, rendered HTML on right.
    *   **Scrolling**: Verify smooth scrolling in the preview pane.

### 5. HTML Preview
*   **Input Body:**
    ```html
    <style> .box { background: linear-gradient(to right, #6366f1, #a855f7); width: 100px; height: 100px; } </style>
    <div class="box"></div>
    <script> console.log("Sandbox works!"); </script>
    ```
*   **Key Features to Test:**
    *   **Sandbox Safety**: JS should run within the iframe but not affect the main site.
    *   **CSS Style Injection**: Verify internal styles are rendered correctly.

---

## 🔄 Encoding Tools

### 1. Base64 Encoder / Decoder
*   **Encoding Test**: `DevTools Hub` -> `RGV2VG9vbHMgSHVi`
*   **Decoding Test**: `SGVsbG8gV29ybGQ=` -> `Hello World`
*   **Options to Test:**
    *   **Swap Button**: Use the refresh icon between cards to instantly turn output into input.

### 2. URL Encoder / Decoder
*   **Encoding Test**: `name=Jack & Jill @ Home` -> `name%3DJack%20%26%20Jill%20%40%20Home`
*   **Options to Test:**
    *   **Live Mode**: As you type in either card, the other updates instantly.
    *   **Clear All**: Verify both input/output wipe clean.

---

## 📄 Text Tools

### 1. Text Diff Checker
*   **Input 1:** "DevTools Hub is great."
*   **Input 2:** "DevTools Hub is fantastic!"
*   **Expected Behavior:**
    *   **Word Diff**: Highlighted green for additions, red for deletions.
    *   **Side-by-Side Scrolling**: Panels should move together.

### 2. Lorem Ipsum Generator
*   **Options to Test:**
    *   **Paragraphs**: Generate 3 long paragraphs.
    *   **Sentences**: Generate exactly 10 sentences.
    *   **Words**: Generate a list of 50 keywords.
    *   **Lorem Default**: Toggle "Start with Lorem Ipsum" ON/OFF.

---

## 🎨 Design Tools

### 1. Color Palette Generator
*   **Pattern Test:**
    *   Click **Generate** 5 times. Verify each palette is harmonically balanced (no clash).
    *   Click a hex code (e.g., `#FFFFFF`). Verify toast/notification says "Copied!".

---

## 🚀 Advanced Feature Testing

### 1. Recently Used (Home Page)
*   **Steps:**
    1. Visit **JSON Formatter**.
    2. Go back to **Home**.
    3. Verify a chip/button for "JSON Formatter" appears under the search bar.

### 2. Favorites System
*   **Steps:**
    1. Click the **Heart icon** on any Tool Card.
    2. Click the **"Favorites" category tab**.
    3. Verify only the hearted tools are visible.

### 3. Usage Analytics (`/stats`)
*   **Steps:**
    1. Refresh a tool page 5 times.
    2. Visit the `/stats` page.
    3. Verify the "View Count" for that tool has increased.
