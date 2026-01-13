<script setup lang="ts">
import { ref } from 'vue'
//ref() is a reactive variable, when it changes, Vue updates UI, takes inner value and returns a ref object
const todoText = ref('')

//defineEmits tells vue, this component can send these events to parent
const emit = defineEmits<{
  addTodo: [text: string] //Event name(addTodo), sends:a string
}>()

const handleAdd = () => {
  //checks if input is not empty after removing spaces
  if (todoText.value.trim()) {
    //send todo text to the parent
    emit('addTodo', todoText.value.trim())
    //clear the input field
    todoText.value = ''
  }
}
const handleKeyPress = (event: keyboardEvent) => {
  if (event.key === 'Enter') {
    handleAdd()
  }
}
</script>

<template>
  <!-- 
      v-model creates two-way binding:
      - When todoText changes → input updates
      - When user types → todoText updates
      
      @keypress is shorthand for v-on:keypress
      It listens for keyboard events
    -->

  <div class="input-container">
    <input
      v-model="todoText"
      @keypress="handleKeyPress"
      placeholde="Add a new todo..."
      class="todo-input"
    />
    <button @click="handleAdd" class="add-button">Add</button>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.todo-input {
  flex: 1; /* Take up all available space */
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.todo-input::placeholder {
  color: var(--color-text-secondary);
}

.todo-input:focus {
  border-color: var(--color-text-primary);
}

.add-button {
  background-color: var(--color-text-primary);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-button:hover {
  opacity: 0.9;
}

.add-button:active {
  transform: scale(0.98);
}
</style>
