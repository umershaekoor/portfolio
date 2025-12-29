export interface Experience {
  readonly cityKey: string;
  readonly roleKey: string;
  readonly periodKey: string;
  readonly descriptionKey: string;
  readonly isCurrent?: boolean;
  readonly countryKey: string;
  readonly periodFromKey: string;
  readonly periodToKey: string;
  readonly countryCode: string;
  readonly mapPosition: {
    readonly x: number;
    readonly y: number;
  };
  readonly skills?: readonly ExperienceSkill[];
}

export interface ExperienceSkill {
  readonly name: string;
  readonly level: number; // 0-3, can be decimal (e.g., 1.5, 2.5)
}

export interface Skill {
  readonly name: string;
  readonly level: number;
  readonly icon: string;
  readonly color?: string;
  readonly url?: string; // Documentation or homepage URL
}

export interface Language {
  readonly code: string;
  readonly label: string;
  readonly flag: string;
}

export interface TranslationKey {
  readonly APP: {
    readonly LOGO: string;
    readonly FOOTER: string;
  };
  readonly WELCOME_MESSAGE: string;
  readonly INTRO: {
    readonly ROLE: string;
    readonly DESCRIPTION: string;
    readonly CTA_PRIMARY: string;
    readonly CTA_SECONDARY: string;
    readonly CTA_JOURNEY: string;
  };
  readonly NAV: {
    readonly HOME: string;
    readonly EXPERIENCE: string;
    readonly SKILLS: string;
    readonly CONTACT: string;
  };
  readonly EXPERIENCE: {
    readonly TITLE: string;
    readonly BERN: ExperienceData;
    readonly MUNICH: ExperienceData;
    readonly BIELEFELD: ExperienceData;
    readonly CLAUSTHAL: ExperienceData;
    readonly UNIVERSITY: ExperienceData;
  };
  readonly SKILLS: {
    readonly TITLE: string;
  };
  readonly CONTACT: {
    readonly TITLE: string;
    readonly SUBTITLE: string;
    readonly DESCRIPTION: string;
    readonly EMAIL_BUTTON: string;
    readonly LINKEDIN_BUTTON: string;
    readonly OR: string;
  };
}

interface ExperienceData {
  readonly CITY: string;
  readonly ROLE: string;
  readonly PERIOD: string;
  readonly DESCRIPTION: string;
  readonly COUNTRY: string;
  readonly FROM: string;
  readonly TO: string;
}
