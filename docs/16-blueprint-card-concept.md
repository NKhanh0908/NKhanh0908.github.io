# docs/15-blueprint-card-concept.md

# Blueprint Card Concept

## Overview

The Blueprint Card is a symbolic visual element representing the developer's identity as a system builder.

Instead of using a traditional employee badge or portfolio avatar card, the website introduces a hanging blueprint card inspired by engineering drawings, architectural plans, and technical documentation.

The card serves as a metaphor:

> Every system starts with a blueprint before it becomes reality.

The Blueprint Card represents the developer's approach to software engineering:

* Understand the problem
* Design the structure
* Build the system
* Improve continuously

---

# Purpose

The Blueprint Card has three objectives:

## Visual Identity

Create a memorable visual element unique to the portfolio.

---

## Storytelling Device

Introduce the visitor to the developer before the journey begins.

---

## Engineering Symbolism

Reinforce the idea that software engineering is about designing systems rather than simply writing code.

---

# Placement

## Hero Section Only

The Blueprint Card should only appear within the Hero section.

It must never remain visible across the entire page.

As the user scrolls beyond the Hero section, the card gradually fades away.

---

## Layout Position

Desktop:

Top Right Area

```text
┌──────────────────────────────┐
│ Hero Content                 │
│                              │
│ Heading                      │
│ Description                  │
│ CTA                          │
│                    Card      │
└──────────────────────────────┘
```

---

Tablet:

Positioned below Hero content.

---

Mobile:

Placed between Hero Title and CTA.

Reduced size.

---

# Visual Design

## Design Language

Inspired by:

* Engineering blueprints
* Technical specification sheets
* Architectural documentation
* System diagrams

Avoid:

* Corporate employee cards
* Event badges
* Conference passes

---

## Card Structure

### Header

```text
SYSTEM PROFILE
```

Small uppercase label.

---

### Avatar

Minimal vector portrait.

Circular frame.

Blueprint-style outline.

---

### Identity

```text
Khanh Nguyen

Backend Developer
```

---

### Focus Areas

```text
Scalable Systems

Backend Architecture

Security

Performance
```

---

### Core Stack

```text
Java

Spring Boot

Redis

PostgreSQL
```

---

### Footer

Blueprint ID

```text
SYS-2026-KN
```

Version Number

```text
v1.0
```

---

# Visual Style

Background:

```css
#FFFFFF
```

Border:

```css
#E5E7EB
```

Accent:

```css
#2563EB
```

Text:

```css
#111827
```

Shadow:

Very subtle.

---

# Hanging Structure

The card hangs from a minimal strap.

The strap is attached to the top edge of the viewport.

The strap represents:

Connection between ideas and execution.

---

# Animation Philosophy

The Blueprint Card should feel physical.

Not decorative.

Not playful.

Motion should communicate weight.

---

# Scroll Interaction

The card reacts to scroll velocity.

Fast scroll:

* Slight vertical lag
* Slight rotation

Slow scroll:

* Minimal movement

Stop scrolling:

* Smooth spring stabilization

---

# Motion Constraints

Maximum Vertical Offset

```text
±15px
```

Maximum Rotation

```text
±2°
```

Anything beyond this feels distracting.

---

# Spring Configuration

Recommended values:

```typescript
{
  damping: 20,
  stiffness: 120,
  mass: 0.8
}
```

Goal:

Premium motion.

Subtle inertia.

---

# Hero Entrance Animation

On page load:

1. Strap fades in.
2. Card slides down.
3. Small settling bounce.
4. Motion stops.

Duration:

```text
800ms
```

---

# Scroll Exit Animation

As Hero section leaves viewport:

Card opacity

```text
1 → 0
```

Card scale

```text
1 → 0.95
```

Card blur

```text
0px → 4px
```

The card disappears naturally.

---

# Accessibility

The card must not contain critical information.

Everything displayed on the card must also exist elsewhere in the Hero section.

Users should never be required to interact with the card.

---

# Performance Requirements

Use:

* Framer Motion
* GPU accelerated transforms
* Motion values

Avoid:

* Physics engines
* Canvas rendering
* Three.js

---

# Storytelling Role

The Blueprint Card is the first artifact visitors encounter.

It introduces the developer not as a person looking for a job.

But as an engineer designing systems.

The card symbolizes:

Curiosity

↓

Design

↓

Architecture

↓

Systems

↓

Growth

Once the journey begins, the card fades away because the focus shifts from identity to the work itself.

The visitor no longer needs to know who the engineer is.

The projects and systems tell that story.
