# GitHub Copilot Code Review Instructions

## Overview
Analyze changed files in pull requests to identify potential issues across five key areas: bugs, edge cases, warnings, security vulnerabilities, and sanity checks.

## Analysis Categories

### 1. Bug Detection
- **Logic Errors**: Check for incorrect conditional logic, loop boundaries, and state management
- **Type Mismatches**: Identify potential runtime type errors and incorrect type assertions
- **Null/Undefined Access**: Flag potential null pointer exceptions and undefined property access
- **Resource Leaks**: Look for unclosed connections, file handles, or memory leaks
- **Race Conditions**: Detect potential concurrency issues and async/await problems
- **API Misuse**: Check for incorrect library/framework usage patterns

### 2. Edge Case Analysis
- **Input Validation**: Missing validation for user inputs, empty arrays, null values
- **Boundary Conditions**: Off-by-one errors, array bounds, numeric limits
- **Error Handling**: Missing try-catch blocks, unhandled promise rejections
- **State Transitions**: Invalid state changes or missing state validations
- **Network Failures**: Missing timeout handling, retry logic, or fallback mechanisms
- **Data Format Issues**: Unexpected data shapes, missing properties, type coercion

### 3. Warning Identification
- **Deprecated APIs**: Usage of deprecated functions, methods, or libraries
- **Performance Issues**: Inefficient algorithms, unnecessary re-renders, memory usage
- **Code Smells**: Large functions, deep nesting, duplicated code
- **Unused Code**: Dead code, unused imports, unreachable statements
- **Console Statements**: Debug logs left in production code
- **TODO Comments**: Unresolved technical debt markers

### 4. Security Scans
- **Injection Vulnerabilities**: SQL injection, XSS, command injection risks
- **Authentication Issues**: Missing auth checks, weak session management
- **Data Exposure**: Sensitive data in logs, client-side exposure, weak encryption
- **Input Sanitization**: Unescaped user input, missing CSRF protection
- **Dependency Vulnerabilities**: Known CVEs in package dependencies
- **Secrets Management**: Hardcoded secrets, API keys, or credentials

### 5. Sanity Checks
- **Code Style Consistency**: Naming conventions, formatting, project patterns
- **Documentation**: Missing function documentation, unclear variable names
- **Test Coverage**: New code without corresponding tests
- **Configuration**: Environment variables, build settings, deployment configs
- **Dependencies**: Unnecessary dependencies, version conflicts
- **Accessibility**: Missing ARIA labels, keyboard navigation, screen reader support

## Review Format

For each issue found, provide:
```
**[CATEGORY] - [SEVERITY]**: Brief description
File: `path/to/file.js:line_number`
Issue: Detailed explanation of the problem
Suggestion: Recommended fix or improvement
```

Severity levels: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`

## Focus Areas by File Type

### JavaScript/TypeScript
- Async/await patterns and Promise handling
- Type safety and strict null checks
- React hooks dependencies and lifecycle
- State management patterns

### Database/SQL
- Query injection prevention
- Index usage and performance
- Transaction handling
- Data migration safety

### Configuration Files
- Environment variable validation
- Security settings verification
- Build optimization checks
- Dependency version compatibility

### API Routes
- Input validation and sanitization
- Authentication and authorization
- Rate limiting implementation
- Error response handling

## Exclusions
- Do not flag legitimate TODO comments with tracking tickets
- Skip style-only changes unless they impact functionality
- Ignore test files for unused import warnings
- Skip configuration files for environment-specific settings

## Action Items
Prioritize findings by:
1. Security vulnerabilities (immediate fix required)
2. Critical bugs (blocks functionality)
3. Edge cases (potential runtime failures)
4. Performance warnings (impacts user experience)
5. Code quality improvements (technical debt)