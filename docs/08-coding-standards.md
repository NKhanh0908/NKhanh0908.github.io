# Coding Standards

## General Rules

- TypeScript Strict Mode
- No `any` — use `unknown` with type narrowing if needed
- Reusable Components
- Single Responsibility
- No hardcoded color values — use CSS tokens only

---

## Naming

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProjectCard.tsx` |
| Hooks | camelCase with `use` prefix | `useScrollReveal.ts` |
| Functions | camelCase | `formatDate()` |
| Constants | UPPER_SNAKE_CASE | `MAX_PROJECTS` |
| Types / Interfaces | PascalCase | `ProjectData` |
| CSS classes | kebab-case (Tailwind only) | `text-primary` |
| Data files | kebab-case | `projects.json` |

---

## Imports Order

1. React / Next.js core
2. External libraries (framer-motion, lucide-react...)
3. Internal components (`@/components/...`)
4. Internal hooks / lib / types (`@/hooks/...`)
5. Relative imports (`./...`)

Separate each group with a blank line.

---

## Next.js Specific Rules

### Server vs Client Components

Default: Server Component.

Add `'use client'` only when the component requires:

- `useState` / `useReducer`
- `useEffect`
- Browser APIs (window, document)
- Event listeners
- Framer Motion animations

Do NOT add `'use client'` to layout components or data-fetching components.

Keep client boundary as low in the tree as possible.

### Image

Always use `next/image` — never `<img>` tag.

Required props:

```tsx
<Image
  src={...}
  alt="Descriptive text"   // never empty
  width={...}
  height={...}
  sizes="..."              // required for responsive images
  priority={...}           // true for above-the-fold images only
/>
```

### Font

Always use `next/font/google` — never load fonts via `<link>` or CSS `@import`.

Define once in `src/styles/fonts.ts`.

Apply via `className` to root layout.

### Link

Always use `next/link` — never `<a>` for internal navigation.

External links require `target="_blank"` and `rel="noopener noreferrer"`.

### Metadata

Every page must export a `generateMetadata` function or static `metadata` object.

Minimum required fields:

```ts
export const metadata: Metadata = {
  title: '...',
  description: '...',
  openGraph: { ... },
  alternates: {
    languages: {
      'en': '/en/...',
      'vi': '/vi/...',
    }
  }
}
```

---

## Styling

Tailwind First.

Avoid inline `style={{ }}` — only allowed for dynamic values that cannot be expressed in Tailwind.

Never hardcode colors — always use semantic token classes (`text-primary`, `bg-surface`).

Class merging: use `clsx` or `cn` utility for conditional classes.

---

## Component Structure

```tsx
// 1. Imports
import ...

// 2. Types
interface Props { ... }

// 3. Component
export function ComponentName({ prop }: Props) {
  // 3a. Hooks
  // 3b. Derived state
  // 3c. Handlers
  // 3d. Render
  return ( ... )
}
```

---

## Comments

Explain **why**, not what.

```ts
// Good: explain the decision
// Using clamp() here because Tailwind fluid-text plugin is not available
const titleSize = 'text-[clamp(40px,6vw,72px)]'

// Bad: explain the obvious
// Set font size
const titleSize = 'text-6xl'
```

---

## Error Handling

All async data fetching must handle error states.

Each section that fetches data must have:

- Loading state (skeleton or spinner)
- Error state (fallback UI, never blank screen)
- Empty state (if applicable)

Use React Error Boundaries for unexpected runtime errors.

Place `error.tsx` and `loading.tsx` files next to `page.tsx` in App Router.

---

## Accessibility

Required on every component:

- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`)
- `alt` text on all images (descriptive, not filename)
- `aria-label` on icon-only buttons and links
- Keyboard navigation support (`tabIndex`, `onKeyDown` where needed)
- Minimum touch target: 44px × 44px
- Focus ring must be visible — never use `outline: none` without replacement
- Color contrast ratio: minimum 4.5:1 for body text, 3:1 for large text

---

## Testing

Scope: utility functions and custom hooks.

Tool: Vitest + React Testing Library.

Location: co-locate test files next to source.

```
hooks/
  useScrollReveal.ts
  useScrollReveal.test.ts
lib/
  formatDate.ts
  formatDate.test.ts
```

Test coverage required for:

- All `src/lib/` utilities
- All custom hooks in `src/hooks/`

Not required for:

- Static UI components with no logic
- Page components

---

## i18n

All user-facing strings must come from translation files.

Never hardcode display text in component files.

See `15-i18n-strategy.md` for full specification.