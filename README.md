# 📌 Big O Complexity VS Code Extension

## 📖 Overview
This VS Code extension provides **Big O time complexity analysis** for functions in **JavaScript, TypeScript, and Python**. It works by analyzing built-in and user-defined functions, displaying time complexity when hovering over function names.

## 🚀 Features
- **Hover Tooltips**: Shows **Big O complexity** for common built-in functions like `map`, `sort`, and `filter`.
- **Supports JavaScript, TypeScript, and Python**.
- **Future Expansion**: Plans to support **user-defined function analysis** using AST parsing.

## 🛠️ Project Structure
```
📂 BIGO
 ├── 📂 node_modules        # Installed dependencies
 ├── 📂 out                # Compiled output files
 ├── 📂 src                # Source code
 │   ├── 📂 test           # Extension test files
 │   │   ├── suite        # Test suite folder
 │   │   ├── extension.test.ts  # Main test file
 │   │   ├── runTest.ts   # Test runner
 │   ├── analyzer.ts      # Big O complexity analysis logic
 │   ├── extension.ts     # Main extension entry point
 │   ├── types.ts         # Type definitions
 ├── .gitignore           # Ignore files for Git
 ├── .vscode-test.mjs     # VS Code extension test config
 ├── .vscodeignore        # Files to exclude in the VSIX package
 ├── CHANGELOG.md         # Release history
 ├── esbuild.js           # Esbuild bundler configuration
 ├── eslint.config.mjs    # ESLint configuration
 ├── package.json         # Project metadata & dependencies
 ├── package-lock.json    # Dependency lock file
 ├── README.md            # Documentation
 ├── tsconfig.json        # TypeScript configuration
 ├── vsc-extension-quickstart.md  # VS Code extension quickstart guide
```

## 📌 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/enn-dee/big-o.git
   cd big-o
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile the extension:
   ```sh
   npm run compile
   ```
4. Open the project in VS Code:
   ```sh
   code .
   ```
5. Press `F5` to run the extension in a new VS Code window.

## 🎯 Usage
1. Open a **JavaScript, TypeScript, Cpp, or Python file**.
2. Hover over a function like `map()`, `sort()`, or `filter()`.
3. A tooltip will appear displaying **Big O complexity**.

## 🛠️ Development
### Running Tests
```sh
npm test
```
- Test files are inside `src/test/`
- Uses `runTest.ts` to execute test cases.

## 🔮 Future Enhancements
✅ **Analyze user-defined functions using AST parsing**.
✅ **Support more languages (Java, C++, Go, etc.)**.
✅ **Inline complexity display like Import Cost**.

## 📜 License
This project is licensed under the **MIT License**.

## 💡 Contributors
Feel free to contribute by submitting issues or pull requests!

---
🚀 **Let’s make Big O complexity analysis effortless for developers!**

