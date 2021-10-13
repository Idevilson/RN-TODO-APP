import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import cross from '../assets/icons/cross/cross.png'
import pen from '../assets/icons/pen/pen.png'


interface TasksItem {
    item: {
            id: number, 
            title: string, 
            done: boolean
          }
    toggleTaskDone: (id: number, done: boolean) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, tasksNewTitle: string) => void;
    index: number;
}

  
export function TaskItem({item, toggleTaskDone, removeTask, editTask, index}: TasksItem) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
            console.log('botão de editar foi clicado')
        }
    }, [isEditing])
    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(item.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, item.title)
        setIsEditing(false)
    }
    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id, item.done)}
                >
                    <View 
                    testID={`marker-${index}`}
                    style={[(item.done === true) ? styles.taskMarkerDone: styles.taskMarker]}
                    >
                        { item.done && (
                            <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                            />
                        )}
                    </View>
                    <TextInput 
                        ref={textInputRef}
                        style={ item.done ? styles.taskTextDone: styles.taskText }
                        value={taskNewTitleValue}
                        editable={isEditing}
                        onChangeText={setTaskNewTitleValue}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={ styles.iconsContainer }>
                {
                    isEditing === true ? (
                       <TouchableOpacity onPress={handleCancelEditing}>
                            <Icon 
                                name="x"
                                size={28}
                                color="#b2b2b2"
                            />
                        </TouchableOpacity>
                    ) : (
                       <TouchableOpacity onPress={handleStartEditing}>
                           <Image source={pen}/>
                       </TouchableOpacity>
                    )    
                           
                } 
                <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
    },

})