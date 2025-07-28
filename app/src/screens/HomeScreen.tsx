import React, { useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task, TaskItemProps } from '../types';
import { useTasks } from '../utilities/hooks/useTasks';

const TaskItem: React.FC<TaskItemProps> = ({ item, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newDescription, setNewDescription] = useState<string>(item.description);

  const handleSave = () => {
    onEdit(item.id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <View style={styles.taskItem}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.editInput}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.editInput}
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.editButton}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.taskContent}>
          <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.checkbox}>
            <Text style={{ color: item.completed ? 'green' : 'red' }}>{item.completed ? '✓' : '✗'}</Text>
          </TouchableOpacity>
          <View style={styles.taskTextContainer}>
            <Text style={[styles.taskTitle, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            <Text style={[styles.taskDescription, item.completed && styles.completedText]}>
              {item.description}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.actionButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Text style={styles.actionButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function HomeScreen () {
  const { tasks, isSyncing, addTask, toggleComplete, deleteTask, editTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const pendingTasks: Task[] = tasks.filter(task => !task.completed);
  const completedTasks: Task[] = tasks.filter(task => task.completed);

  console.log(':::TSK', tasks);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, newTaskDescription);
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do App</Text>

      {isSyncing && (
        <View style={styles.syncIndicator}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={styles.syncText}>Syncing...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task Title"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="New Task Description"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Pending Tasks</Text>
        <FlatList
          data={pendingTasks}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggle={toggleComplete}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Completed Tasks</Text>
        <FlatList
          data={completedTasks}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggle={toggleComplete}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  syncIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  syncText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0000ff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 5,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actionButton: {
    marginLeft: 10,
    color: '#007bff',
  },
  editInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  editButton: {
    color: 'green',
    marginTop: 5,
    textAlign: 'center',
  }
});