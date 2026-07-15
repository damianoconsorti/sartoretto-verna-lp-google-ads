export interface Project {
  id: number;
  city: string;
  name: string;
  category: string;
  imageSeed: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum SectionId {
  HERO = 'hero',
  WHY_US = 'perche-noi',
  METHOD = 'metodo',
  OUTCOMES = 'risultati',
  SERVICES = 'servizi',
  PROJECTS = 'realizzazioni',
  CONTACT = 'contatti'
}