import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  order: number;
}

export interface AppSettings {
  soundEnabled: boolean;
  whatsappEnabled: boolean;
  whatsappPhone1: string;
  whatsappApiKey1: string;
  whatsappPhone2: string;
  whatsappApiKey2: string;
}

interface TaskStore {
  tasks: Task[];
  categories: Category[];
  settings: AppSettings;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const defaultCategories: Category[] = [
  { id: 'all', name: 'Todas', color: '#00F5FF', icon: '📋' },
  { id: 'edelweiss_care', name: 'Edelweiss', color: '#FF00E4', icon: '👶' },
  { id: 'work', name: 'Trabajo', color: '#FFB800', icon: '💼' },
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      categories: defaultCategories,
      settings: {
        soundEnabled: true,
        whatsappEnabled: false,
        whatsappPhone1: '',
        whatsappApiKey1: '',
        whatsappPhone2: '',
        whatsappApiKey2: '',
      },
      
      addTask: (taskData) => set((state) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: state.tasks.length,
        };
        return { tasks: [newTask, ...state.tasks] };
      }),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() } 
            : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),

      setTasks: (tasks) => set({ tasks }),

      updateSettings: (updates: Partial<AppSettings>) => set((state: TaskStore) => ({
        settings: { ...state.settings, ...updates }
      })),
    }),
    {
      name: 'taskflowpro-v2-storage', // En localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
