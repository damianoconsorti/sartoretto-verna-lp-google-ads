# Claude Code – UI/UX Instructions

## Design Philosophy
Build interfaces that look handcrafted, not AI-generated. Every component must have a clear aesthetic direction. Choose one and execute it precisely.

## Stack
- React + TypeScript
- Tailwind CSS for styling
- Framer Motion for ALL animations
- No inline styles unless strictly necessary

## Animation Rules
- Every section entrance uses Framer Motion (fadeIn, slideUp, or scaleIn)
- Hover states must have subtle motion feedback
- Page transitions are smooth, never abrupt
- Use `viewport={{ once: true }}` on scroll animations

## Layout Rules
- Use CSS Grid and Flexbox, never tables
- Spacing must be consistent: use Tailwind scale only
- Mobile-first always
- Max content width: 1280px, centered

## Visual Style
- Avoid generic shadows (no `shadow-md` as default)
- Typography must have clear hierarchy: one display font, one body font
- Colors: define a palette at the start, never use random Tailwind colors
- Whitespace is a design element, use it deliberately

## Component Rules
- Each component in its own file
- Props must be typed
- No hardcoded strings inside components, use props

## What to avoid
- Generic hero sections with centered text and a CTA button
- Stock-photo placeholders
- Cookie-cutter card grids
- Any layout that looks like a template