import projectsJson from './projects.json';

export interface FullStackProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface FandomProject {
  id: string;
  title: string;
  link: string;
  accentColor: string;
  subTag: string;
  category: string;
}

export interface GameProject {
  id: string;
  title: string;
  link: string;
  tagline: string;
  techStack: string[];
  gameType: 'ludo' | 'tictactoe' | 'candycrush';
}

export const FULL_STACK_PROJECTS: FullStackProject[] = projectsJson.fullStackProjects as FullStackProject[];
export const FANDOM_PROJECTS: FandomProject[] = projectsJson.fandomProjects as FandomProject[];
export const MINI_GAME_PROJECTS: GameProject[] = projectsJson.miniGameProjects as GameProject[];

