# Folder Structure

src/

├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   └── loading.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── GrowthSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Tag.tsx
│   │   ├── Card.tsx
│   │   ├── Heading.tsx
│   │   ├── Paragraph.tsx
│   │   └── Divider.tsx
│   ├── animations/
│   │   ├── Reveal.tsx
│   │   ├── FadeIn.tsx
│   │   ├── Parallax.tsx
│   │   └── StaggerContainer.tsx
│   └── theme/
│       └── ThemeToggle.tsx
│
├── features/
│   ├── hero/
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectPreview.tsx
│   │   ├── ProjectStack.tsx
│   │   └── ProjectLinks.tsx
│   └── contact/
│
├── providers/
│   ├── ThemeProvider.tsx       ← wraps next-themes
│   └── index.tsx               ← composes all providers
│
├── data/
│   ├── profile.json
│   ├── projects.json
│   ├── skills.json
│   └── experience.json
│
├── i18n/
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── hero.json
│   │   │   ├── about.json
│   │   │   ├── experience.json
│   │   │   ├── skills.json
│   │   │   ├── projects.json
│   │   │   ├── growth.json
│   │   │   └── contact.json
│   │   └── vi/
│   │       ├── common.json
│   │       ├── hero.json
│   │       ├── about.json
│   │       ├── experience.json
│   │       ├── skills.json
│   │       ├── projects.json
│   │       ├── growth.json
│   │       └── contact.json
│   ├── config.ts               ← locales, defaultLocale
│   └── request.ts              ← next-intl request config
│
├── hooks/
│   ├── useScrollReveal.ts
│   ├── useScrollReveal.test.ts
│   └── useActiveSection.ts
│
├── lib/
│   ├── utils.ts                ← cn() and shared helpers
│   ├── formatDate.ts
│   └── formatDate.test.ts
│
├── styles/
│   ├── fonts.ts                ← next/font definitions
│   └── tokens.css              ← CSS custom properties (light + dark)
│
├── types/
│   ├── project.ts
│   ├── skill.ts
│   └── experience.ts
│
└── constants/
    ├── navigation.ts
    └── site.ts

public/

├── images/
├── icons/
└── illustrations/

docs/