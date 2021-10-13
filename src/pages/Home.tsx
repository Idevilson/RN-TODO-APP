import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
      console.log(tasks)
  }, [tasks]);

  function createAlertFindTaskWithTitle() {
    Alert.alert(
      "Atenção!",
      "This is content of alert",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    )
  };

  function createAlertAreYouSure(id: number) {
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja a tarefa selecionada?",
      [
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter(tasks => tasks.id !== id)),
          style: 'default'
        },
        {
          text: "Não",
          onPress: () => console.log("Não Pressed"),
          style: "cancel"
        }
      ]
    )
  };

  function handleAddTask(newTaskTitle: string) {
    const test = tasks.find(tasks => tasks.title === newTaskTitle);

    if(test === undefined){
      const id = new Date().getTime()
      const title = newTaskTitle;
      let done = false;
      setTasks([...tasks, {id, done, title}])
    } else {
      createAlertFindTaskWithTitle()
    }
  }

  

  function handleToggleTaskDone(id: number, done: boolean) {
    setTasks(tasks.map(tasks => tasks.id === id ? {...tasks, done: !done}: tasks))
  }
  function handleRemoveTask(id: number) {
    createAlertAreYouSure(id);
  }
  function handleEditTask(taskId: number, tasksNewTitle: string){
    setTasks(tasks.map(tasks => tasks.id === taskId ? {...tasks, title: tasksNewTitle}: tasks))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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