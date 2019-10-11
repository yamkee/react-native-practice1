import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goalList, setGoalList] = useState([]);
  const [isAddGoal, setIsAddGoal] = useState(false);

  const addGoalHandler = goalTitle => {
    setGoalList(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddGoal(false);
  };
  const removeGoalHandler = goalId => {
    setGoalList(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };
  const onCancel = () => {
    setIsAddGoal(false);
  };
  return (
    <View style={styles.container}>
      <Button title="Add New Goal" onPress={() => setIsAddGoal(true)} />
      <GoalInput
        onCancel={onCancel}
        visible={isAddGoal}
        onAddGoal={addGoalHandler}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={goalList}
        renderItem={itemData => (
          <GoalItem
            title={itemData.item.value}
            id={itemData.item.id}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    width: "100%"
  }
});
