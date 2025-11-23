export interface Experience {
  readonly cityKey: string;
  readonly roleKey: string;
  readonly periodKey: string;
  readonly descriptionKey: string;
}

export interface Skill {
  readonly name: string;
  readonly level: number;
  readonly icon: string;
  readonly color?: string;
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
}
