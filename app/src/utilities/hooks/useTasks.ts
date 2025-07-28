// hooks/useTasks.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { createTodo, fetchTodos } from '../../services/api';
import { Task, TaskContextType } from '../../types';

const TODO_STORAGE_KEY = '@todo_app:tasks';

export const useTasks = (): TaskContextType => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error('Failed to load tasks from AsyncStorage', e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.error('Failed to save tasks to AsyncStorage', e);
      }
    };
    saveTasks();
  }, [tasks]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(!!state.isConnected);
      if (state.isConnected) {
        syncTasks();
      }
    });
    return () => unsubscribe();
  }, []);

  const syncTasks = async () => {
    setIsSyncing(true);
    try {
      // In a real app, you would send local tasks to the server.
      // For this example, we just fetch from the API and update the local state.
      const apiTodos = await fetchTodos();
      setTasks(apiTodos);
    } catch (e) {
      console.error('Syncing failed', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const addTask = async (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      isLocal: true,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    if (isOnline) {
      setIsSyncing(true);
      try {
        await createTodo(title);
      } catch (e) {
        console.error('Failed to add task to API', e);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, newTitle: string, newDescription: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title: newTitle, description: newDescription } : task
      )
    );
  };

  return { tasks, isSyncing, addTask, toggleComplete, deleteTask, editTask };
};