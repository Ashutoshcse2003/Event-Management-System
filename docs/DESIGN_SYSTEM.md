# 🎨 Event Management System - Design System

## Version 1.0 | Modern UI/UX Specification

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Animation & Transitions](#animation--transitions)
7. [Iconography](#iconography)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [Accessibility Guidelines](#accessibility-guidelines)

---

## 🎯 Design Philosophy

### Core Principles

**1. Clarity Over Complexity**

- Clean, uncluttered interfaces
- Clear visual hierarchy
- Intuitive navigation patterns

**2. Modern & Professional**

- Contemporary design trends
- Subtle animations
- Premium feel without overwhelming users

**3. User-Centric**

- Reduced cognitive load
- Predictable interactions
- Instant feedback

**4. Consistency**

- Unified design language across all modules
- Reusable components
- Standardized patterns

---

## 🎨 Color System

### Primary Palette

```css
/* Royal Blue - Primary Actions, Headers */
--primary-50: #ebf3ff;
--primary-100: #d6e7ff;
--primary-200: #adc2ff;
--primary-300: #85afff;
--primary-400: #5c8dff;
--primary-500: #1f5eff; /* Main Primary */
--primary-600: #1848cc;
--primary-700: #123699;
--primary-800: #0b2366;
--primary-900: #051133;
```

### Secondary Palette

```css
/* Sky Blue - Accents, Info */
--secondary-50: #f0f7ff;
--secondary-100: #e0efff;
--secondary-200: #c2dfff;
--secondary-300: #a3cfff;
--secondary-400: #85bfff;
--secondary-500: #77b1ff; /* Main Secondary */
--secondary-600: #5f8ecc;
--secondary-700: #476a99;
--secondary-800: #2f4766;
--secondary-900: #182333;
```

### Neutral Palette

```css
/* Grays - Backgrounds, Text, Borders */
--neutral-0: #ffffff;
--neutral-50: #f9fafb;
--neutral-100: #f3f4f6;
--neutral-200: #e5e7eb;
--neutral-300: #d1d5db;
--neutral-400: #9ca3af;
--neutral-500: #6b7280;
--neutral-600: #4b5563;
--neutral-700: #374151;
--neutral-800: #1f2937;
--neutral-900: #111827;
```

### Semantic Colors

```css
/* Success - Green */
--success-light: #d1fae5;
--success: #10b981;
--success-dark: #065f46;

/* Warning - Amber */
--warning-light: #fef3c7;
--warning: #f59e0b;
--warning-dark: #92400e;

/* Error - Red */
--error-light: #fee2e2;
--error: #ef4444;
--error-dark: #991b1b;

/* Info - Blue */
--info-light: #dbeafe;
--info: #3b82f6;
--info-dark: #1e40af;
```

### Gradient System

```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #1f5eff 0%, #77b1ff 100%);

/* Secondary Gradient */
--gradient-secondary: linear-gradient(135deg, #77b1ff 0%, #c2dfff 100%);

/* Subtle Background */
--gradient-subtle: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);

/* Glass Morphism */
--gradient-glass: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%
);

/* Dark Overlay */
--gradient-overlay: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0) 0%,
  rgba(0, 0, 0, 0.7) 100%
);
```

### Usage Guidelines

**Primary Blue (#1F5EFF)**

- Call-to-action buttons
- Primary navigation active states
- Important icons and badges
- Links and interactive elements

**Secondary Sky Blue (#77B1FF)**

- Secondary actions
- Hover states
- Info messages
- Decorative accents

**Neutral Grays**

- Text: neutral-900, neutral-700, neutral-500
- Backgrounds: neutral-0, neutral-50, neutral-100
- Borders: neutral-200, neutral-300
- Disabled states: neutral-400

---

## ✍️ Typography

### Font Families

```css
/* Primary Font - Headings */
--font-heading: "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;

/* Secondary Font - Body */
--font-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace - Code */
--font-mono: "JetBrains Mono", "Courier New", monospace;
```

### Type Scale

```css
/* Display - Hero Sections */
--text-display: 4.5rem; /* 72px */
--text-display-weight: 700;
--text-display-line: 1.1;

/* H1 - Page Titles */
--text-h1: 3rem; /* 48px */
--text-h1-weight: 700;
--text-h1-line: 1.2;

/* H2 - Section Headers */
--text-h2: 2.25rem; /* 36px */
--text-h2-weight: 600;
--text-h2-line: 1.3;

/* H3 - Card Headers */
--text-h3: 1.875rem; /* 30px */
--text-h3-weight: 600;
--text-h3-line: 1.4;

/* H4 - Component Titles */
--text-h4: 1.5rem; /* 24px */
--text-h4-weight: 600;
--text-h4-line: 1.4;

/* H5 - Small Headers */
--text-h5: 1.25rem; /* 20px */
--text-h5-weight: 600;
--text-h5-line: 1.5;

/* H6 - Labels */
--text-h6: 1rem; /* 16px */
--text-h6-weight: 600;
--text-h6-line: 1.5;

/* Body Large */
--text-body-lg: 1.125rem; /* 18px */
--text-body-lg-weight: 400;
--text-body-lg-line: 1.6;

/* Body Regular */
--text-body: 1rem; /* 16px */
--text-body-weight: 400;
--text-body-line: 1.6;

/* Body Small */
--text-body-sm: 0.875rem; /* 14px */
--text-body-sm-weight: 400;
--text-body-sm-line: 1.5;

/* Caption */
--text-caption: 0.75rem; /* 12px */
--text-caption-weight: 400;
--text-caption-line: 1.4;

/* Button Text */
--text-button: 0.875rem; /* 14px */
--text-button-weight: 600;
--text-button-line: 1.5;
```

### Typography Usage

**Headings (Poppins)**

- Use for page titles, section headers, card titles
- Bold weights (600-700) for emphasis
- Tracking: -0.02em for large sizes

**Body (Inter)**

- Use for paragraphs, descriptions, UI text
- Regular weight (400) for body, Semibold (600) for emphasis
- Comfortable line-height for readability (1.5-1.6)

---

## 📐 Spacing & Layout

### Spacing Scale

```css
/* 4px base unit system */
--space-0: 0;
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px - small elements */
--radius-md: 0.5rem; /* 8px - cards, inputs */
--radius-lg: 0.75rem; /* 12px - large cards */
--radius-xl: 1rem; /* 16px - modals */
--radius-2xl: 1.5rem; /* 24px - hero sections */
--radius-full: 9999px; /* circular - avatars, badges */
```

### Shadows

```css
/* Elevation System */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Colored Shadows */
--shadow-primary: 0 10px 25px -5px rgba(31, 94, 255, 0.3);
--shadow-secondary: 0 10px 25px -5px rgba(119, 177, 255, 0.3);
```

### Container Sizes

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Grid System

```css
/* 12-column responsive grid */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Common layouts */
.layout-sidebar {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-8);
}

.layout-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}
```

---

## 🧩 Component Library

### 1. Buttons

#### Primary Button

```
Visual:
- Background: Primary gradient
- Text: White, Poppins Semibold 14px
- Height: 44px
- Padding: 12px 24px
- Border radius: 8px
- Shadow: shadow-md

States:
- Hover: Scale 1.02, shadow-lg
- Active: Scale 0.98
- Disabled: Opacity 0.5, cursor not-allowed
- Loading: Spinner icon, text "Processing..."

Animation:
- Hover: transform 0.2s ease, box-shadow 0.2s ease
```

#### Secondary Button

```
Visual:
- Background: White
- Border: 2px solid primary-500
- Text: Primary-600, Poppins Semibold 14px
- Height: 44px
- Padding: 12px 24px
- Border radius: 8px

States:
- Hover: Background primary-50
- Active: Background primary-100
```

#### Ghost Button

```
Visual:
- Background: Transparent
- Text: Primary-600, Poppins Semibold 14px
- Height: 40px
- Padding: 10px 20px

States:
- Hover: Background neutral-100
```

#### Icon Button

```
Visual:
- Size: 40x40px
- Background: Transparent or neutral-100
- Border radius: 8px
- Icon: 20px, primary-600

States:
- Hover: Background neutral-200
- Active: Background neutral-300
```

---

### 2. Input Fields

#### Text Input

```
Visual:
- Height: 44px
- Padding: 12px 16px
- Background: White
- Border: 1px solid neutral-300
- Border radius: 8px
- Font: Inter Regular 14px, neutral-700
- Placeholder: neutral-400

States:
- Focus: Border primary-500, shadow-primary (soft glow)
- Error: Border error, background error-light
- Success: Border success
- Disabled: Background neutral-100, cursor not-allowed

Icon Support:
- Left icon: 16px icon, padding-left 44px
- Right icon: 16px icon, padding-right 44px
```

#### Textarea

```
Visual:
- Min height: 100px
- Padding: 12px 16px
- Border: 1px solid neutral-300
- Border radius: 8px
- Resize: vertical
- Font: Inter Regular 14px

States: Same as text input
```

#### Select Dropdown

```
Visual:
- Height: 44px
- Padding: 12px 16px
- Background: White
- Border: 1px solid neutral-300
- Border radius: 8px
- Chevron icon: Right side
- Font: Inter Regular 14px

Dropdown Menu:
- Background: White
- Border: 1px solid neutral-200
- Border radius: 8px
- Shadow: shadow-lg
- Max height: 300px, scrollable
- Item hover: Background neutral-100

Animation:
- Dropdown: slide-down 0.2s ease
```

#### Checkbox

```
Visual:
- Size: 20x20px
- Border: 2px solid neutral-400
- Border radius: 4px
- Background: White

Checked State:
- Background: Primary gradient
- Checkmark: White, 12px

Animation:
- Check: scale + fade 0.2s ease
```

#### Radio Button

```
Visual:
- Size: 20x20px
- Border: 2px solid neutral-400
- Border radius: full (circular)
- Background: White

Checked State:
- Border: primary-500
- Inner dot: 10px, primary-500

Animation:
- Select: scale 0.2s ease
```

#### Toggle Switch

```
Visual:
- Width: 48px, Height: 24px
- Background: neutral-300 (off), primary-500 (on)
- Border radius: full
- Knob: 20px circle, white, shadow-sm

Animation:
- Toggle: knob slides 0.3s ease, background color 0.3s ease
```

---

### 3. Cards

#### Basic Card

```
Visual:
- Background: White
- Border: 1px solid neutral-200
- Border radius: 12px
- Padding: 24px
- Shadow: shadow-sm

Hover State:
- Shadow: shadow-md
- Transform: translateY(-2px)
- Transition: 0.3s ease

Structure:
- Header: Title (H4) + optional icon/badge
- Body: Content area
- Footer: Actions or metadata
```

#### Product Card

```
Visual:
- Background: White
- Border radius: 12px
- Shadow: shadow-sm
- Overflow: hidden

Structure:
- Image section: 240px height, object-fit cover
- Content padding: 16px
- Title: H5, neutral-900
- Price: H4, primary-600, bold
- Description: Body-sm, neutral-600, 2 lines max
- Action button: Primary button, full width

Hover Effect:
- Image: Scale 1.05
- Shadow: shadow-lg
- Transform: translateY(-4px)
```

#### Dashboard Stat Card

```
Visual:
- Background: Gradient (primary or secondary)
- Border radius: 16px
- Padding: 24px
- Text: White

Structure:
- Icon: 48px, white with opacity 0.9
- Label: Body-sm, white opacity 0.8
- Value: Display (large number), white, bold
- Trend: Small chip with arrow icon (+5.2%)

Animation:
- Count up animation on page load
- Pulse effect on value change
```

---

### 4. Navigation

#### Top Navigation Bar

```
Visual:
- Height: 72px
- Background: White
- Border bottom: 1px solid neutral-200
- Padding: 0 32px
- Shadow: shadow-sm
- Sticky position

Structure:
- Left: Logo (40px height) + Brand name (H5)
- Center: Navigation links (horizontal)
- Right: Search bar + Notifications + Profile dropdown

Link Style:
- Font: Inter Semibold 14px
- Color: neutral-700
- Active: Primary-600, bottom border 3px primary-500

Animation:
- Scroll: shadow increases, slight height reduction (64px)
```

#### Sidebar Navigation

```
Visual:
- Width: 280px
- Background: White
- Border right: 1px solid neutral-200
- Height: 100vh
- Fixed position

Structure:
- Top: Logo section (padding 24px)
- Middle: Navigation items (scrollable)
- Bottom: User profile card

Nav Item:
- Height: 44px
- Padding: 12px 16px
- Border radius: 8px
- Icon: 20px, left aligned
- Text: Inter Medium 14px
- Gap: 12px between icon and text

Active State:
- Background: primary-50
- Text: primary-600
- Left border: 3px primary-500

Hover State:
- Background: neutral-100

Animation:
- Item hover: slide-in left border 0.2s ease
```

#### Breadcrumbs

```
Visual:
- Font: Inter Regular 14px
- Color: neutral-600
- Separator: Chevron right icon, neutral-400
- Active: neutral-900, bold

Hover:
- Non-active items: underline, primary-600
```

---

### 5. Modals & Dialogs

#### Modal Overlay

```
Visual:
- Background: rgba(0, 0, 0, 0.5)
- Backdrop blur: 4px
- Full viewport coverage
- Z-index: 1000

Animation:
- Fade in: opacity 0 to 1, 0.2s ease
```

#### Modal Container

```
Visual:
- Background: White
- Border radius: 16px
- Shadow: shadow-2xl
- Max width: 600px
- Padding: 32px
- Position: centered

Structure:
- Header: Title (H3) + Close button (top right)
- Body: Content area, max-height with scroll
- Footer: Action buttons (right aligned)

Animation:
- Scale: 0.9 to 1, 0.3s ease-out
- Slide: translateY(20px) to 0
```

#### Confirmation Dialog

```
Visual:
- Similar to modal but smaller (400px)
- Icon at top (warning, info, success)
- Centered text
- Two buttons: Cancel (ghost) + Confirm (primary or error)

Animation:
- Shake effect for destructive actions
```

---

### 6. Alerts & Notifications

#### Toast Notification

```
Visual:
- Width: 360px
- Background: White
- Border radius: 12px
- Shadow: shadow-xl
- Border left: 4px (color based on type)
- Padding: 16px
- Position: Top right, fixed

Types:
- Success: Green left border, success icon
- Error: Red left border, error icon
- Warning: Amber left border, warning icon
- Info: Blue left border, info icon

Structure:
- Icon: 24px, left
- Content: Title (bold) + message
- Close button: Top right

Animation:
- Slide in from right: translateX(100%) to 0, 0.3s ease
- Auto dismiss: Progress bar at bottom, 5s duration
- Slide out: fade + translateX(100%), 0.2s ease
```

#### Alert Banner

```
Visual:
- Full width
- Height: 48px
- Background: Colored light variant
- Border: 1px solid colored variant
- Border radius: 8px
- Padding: 12px 16px

Structure:
- Icon: 20px, left
- Message: Inter Regular 14px
- Action button: Ghost button (optional)
- Close icon: Right

Types:
- Info, Success, Warning, Error (color-coded)
```

---

### 7. Tables

#### Data Table

```
Visual:
- Background: White
- Border: 1px solid neutral-200
- Border radius: 12px
- Overflow: hidden

Header:
- Background: neutral-50
- Height: 48px
- Font: Inter Semibold 14px, neutral-700
- Border bottom: 2px solid neutral-300

Row:
- Height: 56px
- Font: Inter Regular 14px, neutral-600
- Border bottom: 1px solid neutral-200
- Padding: 16px

Hover State:
- Background: neutral-50

Features:
- Sortable columns (arrow icons)
- Checkbox for row selection
- Action menu (3-dot icon, right aligned)
- Pagination at bottom
- Search and filters at top

Pagination:
- Font: Inter Regular 14px
- Current page: Primary-600, bold
- Page buttons: 32x32px, border radius 6px
- Prev/Next: Icon buttons
```

---

### 8. Forms

#### Form Layout

```
Visual:
- Max width: 600px
- Background: White
- Border radius: 12px
- Padding: 32px
- Shadow: shadow-md

Structure:
- Form title: H3, margin-bottom 24px
- Field groups: margin-bottom 20px
- Label: Inter Semibold 14px, neutral-700, margin-bottom 8px
- Helper text: Inter Regular 12px, neutral-500, margin-top 4px
- Error message: Inter Regular 12px, error, margin-top 4px

Layout Patterns:
- Single column: Default
- Two column: Grid 2 columns, gap 20px
- Inline fields: Flex, gap 12px

Form Actions:
- Margin-top: 32px
- Align: right
- Gap: 12px between buttons
```

---

### 9. Loading States

#### Spinner

```
Visual:
- Size: 24px (small), 40px (medium), 64px (large)
- Border: 3px solid primary-200
- Border-top: 3px solid primary-600
- Border radius: full

Animation:
- Rotate: 360deg, 0.8s linear infinite
```

#### Skeleton Loader

```
Visual:
- Background: Linear gradient animation
- Colors: neutral-200 to neutral-300
- Border radius: matches component
- Height: matches content

Animation:
- Shimmer effect: gradient moves left to right, 1.5s ease infinite
```

#### Progress Bar

```
Visual:
- Height: 8px
- Background: neutral-200
- Border radius: full
- Overflow: hidden

Progress Fill:
- Background: Primary gradient
- Height: 100%
- Border radius: full

Animation:
- Fill: width transition 0.3s ease
- Indeterminate: sliding gradient animation
```

---

### 10. Badges & Chips

#### Badge

```
Visual:
- Height: 24px
- Padding: 4px 12px
- Border radius: full
- Font: Inter Semibold 12px
- Background: Color-coded

Types:
- Primary: Primary-100 bg, primary-700 text
- Success: Success-light bg, success-dark text
- Warning: Warning-light bg, warning-dark text
- Error: Error-light bg, error-dark text
- Neutral: Neutral-100 bg, neutral-700 text

Dot Variant:
- Small dot (8px) before text
```

#### Chip (Removable)

```
Visual:
- Similar to badge
- Close icon (X) on right, 16px
- Padding: 6px 12px

Interaction:
- Close icon hover: background neutral-300, cursor pointer
- Remove animation: fade + scale out 0.2s ease
```

---

## 🎬 Animation & Transitions

### Animation Principles

**1. Speed & Easing**

```css
/* Duration */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* Easing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**2. Motion Patterns**

Micro-interactions (hover, focus):

- Duration: 200ms
- Easing: ease-out

State changes (show/hide):

- Duration: 300ms
- Easing: ease-in-out

Page transitions:

- Duration: 500ms
- Easing: ease-in-out

Loading & processing:

- Duration: Continuous loop
- Easing: linear or ease-in-out

---

### Animation Library

#### Fade

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

#### Slide

```css
@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

#### Scale

```css
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scaleOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9);
    opacity: 0;
  }
}
```

#### Bounce

```css
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

#### Pulse

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

#### Shimmer (Loading)

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

#### Rotate

```css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

---

### Component-Specific Animations

**Button Hover**

```
- Scale: 1.02
- Shadow: Increase elevation
- Duration: 200ms ease-out
```

**Card Hover**

```
- TranslateY: -4px
- Shadow: Increase from sm to lg
- Duration: 300ms ease-out
```

**Modal Entry**

```
1. Backdrop: Fade in 200ms
2. Modal: Scale from 0.9 + Slide up 20px + Fade in 300ms ease-out
```

**Modal Exit**

```
1. Modal: Scale to 0.9 + Fade out 200ms ease-in
2. Backdrop: Fade out 200ms (after modal)
```

**Toast Notification**

```
Entry: Slide in from right (translateX 100% to 0) + Fade in 300ms
Exit: Slide out to right + Fade out 200ms
Auto-dismiss: Progress bar fills 5s linear
```

**Dropdown Menu**

```
Entry: Slide down 10px + Fade in 200ms ease-out
Exit: Fade out 150ms ease-in
```

**Page Transition**

```
Exit: Fade out 300ms
Enter: Fade in 300ms (after exit)
```

**Skeleton Loading**

```
Shimmer: Background gradient moves left to right 1500ms ease-in-out infinite
```

**Success Checkmark**

```
1. Scale from 0 to 1.1 (200ms ease-bounce)
2. Scale from 1.1 to 1 (100ms ease-out)
```

**Form Field Error**

```
Shake: TranslateX -5px to 5px, repeat 3 times, 400ms
```

---

### Page Load Animations

**Hero Section**

```
Sequence:
1. Background: Fade in 500ms
2. Heading: Slide up + Fade in 600ms (delay 200ms)
3. Subheading: Slide up + Fade in 600ms (delay 400ms)
4. CTA Button: Scale in 400ms (delay 600ms)
```

**Dashboard Cards**

```
Stagger:
- Each card: Slide up + Fade in 400ms
- Delay: 100ms per card (0ms, 100ms, 200ms, 300ms...)
```

**List Items**

```
Stagger:
- Each item: Fade in + Slide left 300ms
- Delay: 50ms per item
```

---

## 🎨 Iconography

### Icon System

**Icon Library:** Heroicons / Lucide / Feather Icons

**Sizes:**

- xs: 16px (inline text)
- sm: 20px (buttons, inputs)
- md: 24px (cards, navigation)
- lg: 32px (feature highlights)
- xl: 48px (empty states, illustrations)

**Stroke Width:**

- Regular: 2px (default)
- Bold: 2.5px (emphasis)

**Colors:**

- Primary actions: primary-600
- Secondary: neutral-600
- Disabled: neutral-400
- Success: success
- Warning: warning
- Error: error

**Usage Guidelines:**

- Always left-align icons with text
- Maintain 8-12px gap between icon and text
- Use consistent size throughout a component
- Prefer outline style for consistency

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-xs: 320px; /* Small phones */
--breakpoint-sm: 640px; /* Large phones */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Small laptops */
--breakpoint-xl: 1280px; /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Responsive Patterns

**Navigation:**

- Mobile (< 768px): Hamburger menu, full-screen sidebar
- Tablet (768px - 1024px): Collapsed sidebar with icons
- Desktop (> 1024px): Full sidebar

**Grid Layouts:**

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

**Typography:**

- Mobile: Reduce heading sizes by 25%
- Tablet: Reduce by 15%
- Desktop: Full scale

**Spacing:**

- Mobile: Reduce padding/margin by 25%
- Tablet: Standard spacing
- Desktop: Increase spacing for large screens

---

## ♿ Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

**Color Contrast:**

- Text: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio

**Keyboard Navigation:**

- All interactive elements: Tab accessible
- Focus indicators: 2px solid primary-500 outline, 2px offset
- Skip links: "Skip to main content" at top
- Logical tab order

**Screen Readers:**

- Semantic HTML (nav, main, article, section)
- ARIA labels for icons and images
- Alt text for all images
- Live regions for dynamic content

**Motion:**

- Respect prefers-reduced-motion
- Disable animations if user prefers reduced motion
- Provide alternative static states

**Forms:**

- Label associated with every input
- Error messages: Clear, specific, actionable
- Required fields: Marked with asterisk + aria-required
- Validation: Real-time or on submit, with clear feedback

---

## 🛠️ Implementation Guidelines

### CSS Architecture

**Methodology:** BEM (Block Element Modifier) or Utility-First (Tailwind)

**Example BEM:**

```css
.button {
}
.button--primary {
}
.button--secondary {
}
.button__icon {
}
.button--loading {
}
```

**CSS Variables:**

- Define all design tokens as CSS custom properties
- Use in root for global access
- Override in component scope when needed

**Utility Classes:**

```css
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-4 {
  gap: var(--space-4);
}
.text-primary {
  color: var(--primary-600);
}
.bg-white {
  background: var(--neutral-0);
}
.shadow-md {
  box-shadow: var(--shadow-md);
}
.rounded-lg {
  border-radius: var(--radius-lg);
}
```

### Component Checklist

For every component, ensure:

- [ ] Responsive on all breakpoints
- [ ] All interactive states defined (hover, active, focus, disabled)
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Animations smooth and purposeful
- [ ] Color contrast meets WCAG AA
- [ ] Consistent with design system
- [ ] Documented with usage examples

---

## 📚 Resources & Tools

**Design Tools:**

- Figma (design & prototyping)
- Adobe XD (alternative)
- Sketch (Mac only)

**Color Tools:**

- Coolors.co (palette generation)
- Contrast Checker (WCAG compliance)

**Typography:**

- Google Fonts (Poppins, Inter)
- Type Scale Calculator

**Icons:**

- Heroicons.com
- Lucide.dev
- Feathericons.com

**Animation:**

- Animate.css (prebuilt animations)
- Framer Motion (React animations)

**CSS Frameworks:**

- Tailwind CSS (utility-first)
- Bootstrap 5 (component library)

---

## 📝 Version History

| Version | Date         | Changes               |
| ------- | ------------ | --------------------- |
| 1.0     | Nov 13, 2025 | Initial design system |

---

**Next Steps:**

1. Review and approve design system
2. Create component library in Figma
3. Implement design tokens in CSS
4. Build reusable React components
5. Create Storybook for component showcase

---

_This design system is a living document and will evolve with the product._
