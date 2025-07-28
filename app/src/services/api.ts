// api/todos.ts

import { Task } from '../types';

// Mock API's representation of a todo
interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async (): Promise<Task[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const apiTodos: ApiTodo[] = await response.json();
  
  // Transform API response to our Task type
  return apiTodos.map(todo => ({
    id: todo.id.toString(),
    title: todo.title,
    description: 'Mock Description',
    completed: todo.completed,
  }));
};

export const createTodo = async (todoTitle: string): Promise<ApiTodo> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ title: todoTitle, completed: false, userId: 1 }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};