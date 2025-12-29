import { Injectable } from '@angular/core';
import { Experience } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class ExperienceDataService {

  /**
   * Central experience data - single source of truth
   */
  private readonly experiences: readonly Experience[] = [
    {
      cityKey: 'EXPERIENCE.UNIVERSITY.CITY',
      roleKey: 'EXPERIENCE.UNIVERSITY.ROLE',
      periodKey: 'EXPERIENCE.UNIVERSITY.PERIOD',
      descriptionKey: 'EXPERIENCE.UNIVERSITY.DESCRIPTION',
      countryKey: 'EXPERIENCE.UNIVERSITY.COUNTRY',
      periodFromKey: 'EXPERIENCE.UNIVERSITY.FROM',
      periodToKey: 'EXPERIENCE.UNIVERSITY.TO',
      countryCode: 'DE',
      mapPosition: { x: 52, y: 38 },
      skills: [
        { name: 'HTML', level: 3 },
        { name: 'CSS', level: 2 },
        { name: 'JavaScript', level: 1 },
      ],
    },
    {
      cityKey: 'EXPERIENCE.CLAUSTHAL.CITY',
      roleKey: 'EXPERIENCE.CLAUSTHAL.ROLE',
      periodKey: 'EXPERIENCE.CLAUSTHAL.PERIOD',
      descriptionKey: 'EXPERIENCE.CLAUSTHAL.DESCRIPTION',
      countryKey: 'EXPERIENCE.CLAUSTHAL.COUNTRY',
      periodFromKey: 'EXPERIENCE.CLAUSTHAL.FROM',
      periodToKey: 'EXPERIENCE.CLAUSTHAL.TO',
      countryCode: 'DE',
      mapPosition: { x: 52, y: 38 },
      skills: [
        { name: 'Angular', level: 3 },
        { name: 'OpenStreetMap', level: 2 },
        { name: 'PHP', level: 2 },
      ],
    },
    {
      cityKey: 'EXPERIENCE.BIELEFELD.CITY',
      roleKey: 'EXPERIENCE.BIELEFELD.ROLE',
      periodKey: 'EXPERIENCE.BIELEFELD.PERIOD',
      descriptionKey: 'EXPERIENCE.BIELEFELD.DESCRIPTION',
      countryKey: 'EXPERIENCE.BIELEFELD.COUNTRY',
      periodFromKey: 'EXPERIENCE.BIELEFELD.FROM',
      periodToKey: 'EXPERIENCE.BIELEFELD.TO',
      countryCode: 'DE',
      mapPosition: { x: 43, y: 35 },
      skills: [
        { name: 'Java', level: 1.5 },
        { name: 'Vue.js', level: 3 },
        { name: 'SQL', level: 1 },
        { name: 'MongoDB', level: 2 },
        { name: 'JUnit', level: 1 },
        { name: 'Git', level: 3 },
        { name: 'Maven', level: 2 },
        { name: 'Gradle', level: 1 },
        { name: 'JavaScript', level: 3 },
        { name: 'CSS', level: 3 },
      ],
    },
    {
      cityKey: 'EXPERIENCE.MUNICH.CITY',
      roleKey: 'EXPERIENCE.MUNICH.ROLE',
      periodKey: 'EXPERIENCE.MUNICH.PERIOD',
      descriptionKey: 'EXPERIENCE.MUNICH.DESCRIPTION',
      countryKey: 'EXPERIENCE.MUNICH.COUNTRY',
      periodFromKey: 'EXPERIENCE.MUNICH.FROM',
      periodToKey: 'EXPERIENCE.MUNICH.TO',
      countryCode: 'DE',
      mapPosition: { x: 58, y: 78 },
      skills: [
        { name: 'Ember.js', level: 2 },
        { name: 'Spring Boot', level: 2 },
        { name: 'Spring', level: 1 },
        { name: 'Jenkins', level: 1 },
        { name: 'AWS', level: 1 },
        { name: 'Java', level: 3 },
        { name: 'Maven', level: 3 },
        { name: 'Shell', level: 2 },
        { name: 'Ansible', level: 1 },
        { name: 'Swagger', level: 1.5 },
        { name: 'FOSSology', level: 1.5 },
      ],
    },
    {
      cityKey: 'EXPERIENCE.BERN.CITY',
      roleKey: 'EXPERIENCE.BERN.ROLE',
      periodKey: 'EXPERIENCE.BERN.PERIOD',
      descriptionKey: 'EXPERIENCE.BERN.DESCRIPTION',
      countryKey: 'EXPERIENCE.BERN.COUNTRY',
      periodFromKey: 'EXPERIENCE.BERN.FROM',
      periodToKey: 'EXPERIENCE.BERN.TO',
      countryCode: 'CH',
      mapPosition: { x: 30, y: 55 },
      isCurrent: true,
      skills: [
        { name: 'Angular', level: 2.5 },
        { name: 'Java', level: 3 },
        { name: 'GitLab', level: 3 },
        { name: 'GitLab CI/CD', level: 2 },
        { name: 'Argo CD', level: 1 },
        { name: 'OpenShift', level: 1 },
        { name: 'Quarkus', level: 2.5 },
        { name: 'SQL', level: 2.5 },
        { name: 'Swagger', level: 2 },
        { name: 'OpenAPI Generator', level: 2 },
      ],
    },
  ];

  /**
   * Get all experiences
   */
  getExperiences(): readonly Experience[] {
    return this.experiences;
  }
}

