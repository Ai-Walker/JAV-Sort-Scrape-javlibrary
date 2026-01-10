## 2024-05-23 - [Invalid HTML Nesting in Cards]
**Learning:** Nesting `<button>` interactive elements inside `<Link>` (anchor) tags is invalid HTML and causes hydration errors/accessibility issues.
**Action:** When designing clickable cards with internal "buttons", use `div` or `span` for the visual button element, as the parent link already handles the interaction.

## 2024-05-23 - [Tailwind Version Conflict]
**Learning:** Mixing Tailwind CSS v3 (standard config) with `@tailwindcss/postcss` v4 (package) causes silent build failures where styles are not applied.
**Action:** Ensure `package.json` dependencies match the configuration format. For v3 config (`tailwind.config.js`), use `postcss` + `autoprefixer` + `tailwindcss` (v3).
