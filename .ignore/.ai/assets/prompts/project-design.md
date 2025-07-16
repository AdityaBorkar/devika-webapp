# Project Design Analysis Task

Analyze the design architecture of this codebase by examining code snippets retrieved from the repository. Focus on extracting concrete implementation details rather than theoretical patterns.

## Analysis Categories

1. **UI Component System**:
   - Identify specific UI libraries (e.g., Radix UI, MUI, Chakra)
   - Document component structure patterns (atomic, composite, etc.)
   - Extract design token implementation method

2. **Styling Implementation**:
   - Determine primary styling approach (CSS-in-JS, utility classes, CSS modules)
   - Identify class naming conventions and methodology (BEM, SMACSS, etc.)
   - Note responsive design techniques

3. **Layout Architecture**:
   - Document grid system implementation
   - Identify spacing and alignment patterns
   - Extract page composition methodology

4. **Design System Elements**:
   - List theme configuration methods
   - Document color palette implementation
   - Identify typography system

5. **State Management & Interactions**:
   - Determine primary state management approach
   - Document UI interaction patterns
   - Identify form validation methodology

## Output Format Requirements

Return a structured JSON object with the following format:

```json
{
  "ui_component_system": {
    "primary_library": "string",
    "component_pattern": "string",
    "design_tokens": "string",
    "evidence": ["string", "string"]
  },
  "styling_implementation": {
    "approach": "string",
    "naming_convention": "string",
    "responsive_technique": "string",
    "evidence": ["string", "string"]
  },
  "layout_architecture": {
    "grid_system": "string",
    "spacing_pattern": "string",
    "page_composition": "string",
    "evidence": ["string", "string"]
  },
  "design_system": {
    "theme_configuration": "string",
    "color_implementation": "string",
    "typography_system": "string",
    "evidence": ["string", "string"]
  },
  "state_management": {
    "primary_approach": "string",
    "interaction_patterns": "string",
    "form_handling": "string",
    "evidence": ["string", "string"]
  }
}
```

For each category, include 2-3 specific code references or file paths as evidence. Prioritize concrete implementations found in the codebase rather than making assumptions. If information is unavailable for a section, use "not_identified" rather than making speculative claims.

Store the output in ".ai/notes"