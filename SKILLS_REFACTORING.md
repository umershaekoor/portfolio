# Skills System Refactoring - Centralized Data Management

## Overview
Refactored the skills and experience data management to use a centralized, single-source-of-truth architecture. Now when you update skills in experience cards, the skills section automatically reflects those changes. Skills are displayed in **chronological order** based on when they first appeared in your career.

## Recent Updates (December 29, 2025)

### ✅ Added API Documentation Tools
- **Swagger**: Added to Munich (1.5/3) and Bern (2/3) - Shows 67% in Skills
- **OpenAPI Generator**: Added to Bern (2/3) - Shows 67% in Skills

### ✅ Chronological Skill Ordering
Skills now appear in the order they were first learned/used in your career:
1. University (2017-2018): HTML, CSS, JavaScript
2. Clausthal (2018-2020): Angular, OpenStreetMap, PHP
3. Bielefeld (2020-2022): Java, Vue.js, SQL, MongoDB, JUnit, Git, Maven, Gradle
4. Munich (2022-2025): Ember.js, Spring Boot, Spring, Jenkins, AWS, Shell, Ansible, Swagger
5. Bern (2025-Present): Quarkus, OpenAPI Generator

This creates a natural progression showing your learning journey over time.

## Changes Applied

### 1. ✅ Added SQL 2.5 to Bern Experience
**File**: `apps/portfolio/src/app/core/services/experience-data.service.ts`

Added SQL with proficiency level 2.5 to the Bern (current) position:
```typescript
{
  cityKey: 'EXPERIENCE.BERN.CITY',
  // ...other fields
  skills: [
    { name: 'Angular', level: 2.5 },
    { name: 'Java', level: 3 },
    { name: 'GitLab', level: 3 },
    { name: 'Argo CD', level: 1 },
    { name: 'OpenShift', level: 1 },
    { name: 'Quarkus', level: 2.5 },
    { name: 'SQL', level: 2.5 },
    { name: 'Swagger', level: 2 }, // ← UPDATED
    { name: 'OpenAPI Generator', level: 2 }, // ← NEW
  ],
}
```

**Result**: SQL now shows as 83% (2.5/3 * 100) in the Skills section, automatically calculated from the latest skill level.

---

### 2. ✅ Created Centralized Services

#### A. ExperienceDataService
**File**: `apps/portfolio/src/app/core/services/experience-data.service.ts`

**Purpose**: Single source of truth for all experience data.

**Key Methods**:
- `getExperiences()`: Returns all experience data with skills

**Benefits**:
- All experience data in one place
- Easy to update and maintain
- Ensures consistency across components

#### B. SkillsDataService
**File**: `apps/portfolio/src/app/core/services/skills-data.service.ts`

**Purpose**: Manages skill metadata and calculations.

**Key Features**:

1. **Skills Registry**: Central metadata for all skills
```typescript
private readonly skillsRegistry: Record<string, Omit<SkillProgression, 'maxLevel'>> = {
  'HTML': { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26', category: 'frontend' },
  'CSS': { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6', category: 'frontend' },
  // ... all skills with icons, colors, and categories
}
```

2. **Level Calculation**: `calculateSkillLevels(experienceSkills)`
   - Takes all experience skills across career
   - Finds the maximum level achieved for each skill
   - Returns consolidated skill list with highest proficiency

3. **Percentage Conversion**: `levelToPercentage(level)`
   - Converts 0-3 scale to 0-100 percentage
   - Formula: `(level / 3) * 100`

**Key Methods**:
- `calculateSkillLevels(experienceSkills)`: Aggregates skills from all experiences
- `levelToPercentage(level)`: Converts 0-3 to percentage
- `getSkillMetadata(skillName)`: Gets icon, color, category for a skill

---

### 3. ✅ Refactored ExperienceComponent

**File**: `apps/portfolio/src/app/experience/experience.component.ts`

**Before**:
```typescript
readonly experiences: readonly Experience[] = [
  // Hardcoded data inline...
];
```

**After**:
```typescript
constructor(
  private experienceDataService: ExperienceDataService
) {}

get experiences(): readonly Experience[] {
  return this.experienceDataService.getExperiences();
}
```

**Benefits**:
- No duplicate data
- Component stays focused on UI logic
- Data changes automatically reflected

---

### 4. ✅ Refactored SkillsComponent

**File**: `apps/portfolio/src/app/skills/skills.component.ts`

**Before**:
```typescript
readonly skills: readonly Skill[] = [
  { name: 'JavaScript', level: 100, icon: 'fab fa-js', color: '#F7DF1E' },
  { name: 'Java', level: 85, icon: 'fab fa-java', color: '#f89820' },
  // Manually maintained levels...
];
```

**After**:
```typescript
constructor(
  private skillsDataService: SkillsDataService,
  private experienceDataService: ExperienceDataService
) {}

ngOnInit(): void {
  const experiences = this.experienceDataService.getExperiences();
  const experienceSkills = experiences
    .map(exp => exp.skills ? [...exp.skills] : [])
    .filter(skills => skills.length > 0);
  
  const skillProgressions = this.skillsDataService.calculateSkillLevels(experienceSkills);
  
  this.skills = skillProgressions.map(sp => ({
    name: sp.name,
    level: this.skillsDataService.levelToPercentage(sp.maxLevel),
    icon: sp.icon,
    color: sp.color,
  }));
}
```

**Benefits**:
- Skills automatically calculated from experiences
- Always shows the latest/highest skill level
- No manual synchronization needed

---

## Architecture

### Data Flow

```
┌─────────────────────────────────┐
│  ExperienceDataService          │
│  (Single Source of Truth)       │
│                                 │
│  - University (HTML 3, CSS 2)   │
│  - Clausthal (Angular 3)        │
│  - Bielefeld (SQL 1, Java 1.5)  │
│  - Munich (SQL maintained, Java 3)│
│  - Bern (SQL 2.5, Java 3) ✨    │
└────────────┬────────────────────┘
             │
             ├─────────────────────────────┐
             │                             │
             ▼                             ▼
┌─────────────────────┐      ┌─────────────────────┐
│ ExperienceComponent │      │ SkillsDataService   │
│                     │      │                     │
│ - Displays cards    │      │ - Calculates max    │
│ - Shows skills on   │      │   level per skill   │
│   hover             │      │ - Provides metadata │
└─────────────────────┘      └──────────┬──────────┘
                                        │
                                        ▼
                             ┌─────────────────────┐
                             │ SkillsComponent     │
                             │                     │
                             │ - Shows all skills  │
                             │ - Uses max levels   │
                             │ - Auto-updated      │
                             └─────────────────────┘
```

---

## Skill Level Progression Examples

### SQL Journey:
- **Bielefeld (2020-2022)**: Level 1/3 (33%)
- **Munich (2022-2025)**: Not explicitly mentioned (maintained)
- **Bern (2025-Present)**: Level 2.5/3 (83%) ✨
- **Skills Section**: Shows **83%** (latest level)

### Java Journey:
- **Bielefeld**: Level 1.5/3 (50%)
- **Munich**: Level 3/3 (100%)
- **Bern**: Level 3/3 (100%)
- **Skills Section**: Shows **100%** (max achieved)

### Angular Journey:
- **Clausthal**: Level 3/3 (100%)
- **Bern**: Level 2.5/3 (83%) (maintained but slightly less focus)
- **Skills Section**: Shows **100%** (highest ever achieved)

---

## How to Update Skills

### Option 1: Add New Skill to Experience

**Step 1**: Add skill metadata to SkillsDataService (if new):
```typescript
// apps/portfolio/src/app/core/services/skills-data.service.ts
'TypeScript': { 
  name: 'TypeScript', 
  icon: 'fab fa-js', 
  color: '#3178C6', 
  category: 'frontend' 
},
```

**Step 2**: Add skill to experience in ExperienceDataService:
```typescript
// apps/portfolio/src/app/core/services/experience-data.service.ts
{
  cityKey: 'EXPERIENCE.BERN.CITY',
  skills: [
    // ...existing skills
    { name: 'TypeScript', level: 2.5 }, // NEW
  ],
}
```

**Result**: Skills section automatically updates! ✨

### Option 2: Update Existing Skill Level

Just update the level in ExperienceDataService:
```typescript
{ name: 'SQL', level: 2.5 }, // Changed from 2.0
```

The Skills section will automatically show 83% (2.5/3 * 100).

---

## Benefits of Refactoring

### 1. **Single Source of Truth**
- Experience data exists in exactly one place
- No risk of data getting out of sync
- Easy to maintain and update

### 2. **Automatic Synchronization**
- Update skill level in experience → Skills section updates automatically
- Add new skill → Appears in Skills section with correct level
- Remove skill → Disappears from Skills section

### 3. **Data Integrity**
- Skills always show the highest level achieved
- Consistent metadata (icons, colors) across all uses
- Type-safe with TypeScript interfaces

### 4. **Easy to Extend**
- Want to show skill progression over time? Data is already structured
- Want to filter by category? Categories are defined
- Want to highlight current skills? Already tracked

### 5. **Maintainability**
- One place to update for new experiences
- Skills metadata centralized in registry
- Clear separation of concerns

---

## File Structure

```
apps/portfolio/src/app/
├── core/
│   ├── models/
│   │   └── portfolio.models.ts (Experience, ExperienceSkill interfaces)
│   └── services/
│       ├── experience-data.service.ts ✨ NEW (Experience data)
│       ├── skills-data.service.ts ✨ NEW (Skills metadata & calculations)
│       └── map.service.ts (Existing)
├── experience/
│   ├── experience.component.ts ✨ REFACTORED (Uses ExperienceDataService)
│   ├── experience.component.html
│   └── experience.component.scss
└── skills/
    ├── skills.component.ts ✨ REFACTORED (Uses both services)
    ├── skills.component.html
    └── skills.component.scss
```

---

## Testing the Changes

### Verify SQL Update:
1. Check Bern experience card (hover) → Should show SQL with 2.5 dashes
2. Check Skills section → SQL should show 83% progress bar

### Verify Automatic Sync:
1. Update any skill level in `experience-data.service.ts`
2. Rebuild
3. Skills section automatically reflects the change

### Test Adding New Skill:
1. Add skill metadata to `skills-data.service.ts`
2. Add skill to any experience in `experience-data.service.ts`
3. Skill automatically appears in Skills section

---

## Build Status

✅ **TypeScript**: No compilation errors
✅ **Build**: Successful
✅ **Services**: Properly injected and used
✅ **Data Flow**: Working as designed
✅ **SQL Level**: Updated to 2.5 (83%)

---

## Summary

Successfully refactored the skills system to use centralized data services:

1. ✅ **Added SQL 2.5 to Bern** - Now shows 83% in Skills section
2. ✅ **Created ExperienceDataService** - Single source for experience data
3. ✅ **Created SkillsDataService** - Skills metadata and calculations
4. ✅ **Refactored ExperienceComponent** - Now uses service instead of inline data
5. ✅ **Refactored SkillsComponent** - Automatically calculates from experiences
6. ✅ **Automatic Synchronization** - Update experiences → Skills update automatically

**Key Benefit**: You now have a single place to maintain all experience and skill data. Any updates to skill levels in experience cards automatically flow through to the Skills section!

