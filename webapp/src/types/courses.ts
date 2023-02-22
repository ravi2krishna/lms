export type Tabs =
  | "Course Info"
  | "Resources"
  | "Assignments"
  | "Projects"
  | "Enrolled"
  | "Modules";

export interface CourseListItem {
  id: number;
  title: string;
  description: string;
  pictrue: string;
  liveLink?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  pictrue: string;
  liveLink: string;
  modules: Module[];
  modulesOrder: number[];
  projectFiles: string[];
  archived: boolean;
}

export interface CourseNavListItem {
  id: number;
  title: string;
}
export interface ModuleNavListItem {
  id: number;
  title: string;
}

export interface Module {
  id: number;
  title: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  title: string;
  videoLink: string;
  resourceFiles: string[];
  assignmentFiles: string[];
}

export interface TopicInput {
  title: string;
  videoLink: string;
  id: number | string;
}

export interface ModuleInput {
  title: string;
  topics: TopicInput[];
}
