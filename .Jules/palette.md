## 2026-01-11 - [Accessibility] Missing ARIA Labels on Icon Buttons
**Learning:** Next.js applications with modern UI frameworks (Tailwind/Lucide) often rely on icon-only buttons for cleaner aesthetics (e.g., chat inputs, headers). However, these are completely invisible to screen readers without `aria-label`. This is a critical pattern failure in `ai-girlfriend-web`.
**Action:** Establish a strict rule: Any button containing *only* an icon must have an `aria-label` describing its action.
