// types/index.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  isLocal?: boolean; // To indicate a task created offline
}

export interface TaskContextType {
  tasks: Task[];
  isSyncing: boolean;
  addTask: (title: string, description: string) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string, newDescription: string) => void;
}

export interface TaskItemProps {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
}