import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
      console.log(tasks)
  }, [tasks]);

  function handleAddTask(newTaskTitle: string) {
    const id = new Date().getTime();
    const title = newTaskTitle;
    let done = false;

    setTasks([...tasks, {id, done, title}])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(tasks => tasks.id === id ? {...tasks, done:true}: tasks))
  }
  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(tasks => tasks.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})