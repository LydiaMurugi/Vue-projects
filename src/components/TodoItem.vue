<script setup lang="ts">
import type {Todo} from '../types/todo'

const props = defineProps<{
    todo: Todo // Means todo must watch Todo interface
}>()

// Emits: The component can send 3 diff events to the parent

const emits = defineEmits<{
    toggle: [id: string]
    delete: [id: string]
    edit: [id: string, text: string]
}>()

const handleDelete = () => {
    emit('delete', props.todo.id)
}
const handleEdit = () => {
    const newText = prompt('Edit todo', props.todo.text)

    if (newText !== null && newText.trim()){
        emit('edit', props.todo.id, newText.trim())
    }
}
</script>


<template>
  <!-- 
    :class binding - conditionally apply CSS classes
    From Vue 3 docs: Class and Style Bindings
    If todo.completed is true, add 'completed' class
  -->
  <div class="todo-item" :class="{ completed: todo.completed }">
  // <div :class="todo.completed ? 'completed' : ''">
    
    <div class="checkbox" @click="handleToggle">
      <!-- 
        v-if / v-else - conditional rendering
        From Vue 3 docs: Conditional Rendering
        Show checkmark if completed, empty circle if not
      -->
      <div v-if="todo.completed" class="checkbox-checked">
        ✓
      </div>
      <div v-else class="checkbox-unchecked"></div>
    </div>
    <span class="todo-text">
      {{ todo.text }}
    </span>

    <div class="todo-actions">
      <button 
        @click="handleEdit" 
        class="action-button edit-button"
        title="Edit todo"
      >
        ✏️
      </button>
      
      <button 
        @click="handleDelete" 
        class="action-button delete-button"
        title="Delete todo"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--color-surface);
  border-radius: 8px;
  transition: background-color 0.2s;
  /* This makes buttons appear on hover */
  position: relative;
}

.todo-item:hover {
  background-color: var(--color-surface-hover);
}

/* When todo is completed, change text style */
.todo-item.completed .todo-text {
  color: var(--color-text-secondary);
  text-decoration: line-through;
}

/* Checkbox styles */
.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0; /* Don't let checkbox shrink */
}

.checkbox-unchecked {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-text-secondary);
  border-radius: 4px;
  transition: border-color 0.2s;
}

.checkbox-unchecked:hover {
  border-color: var(--color-text-primary);
}

.checkbox-checked {
  width: 20px;
  height: 20px;
  background-color: var(--color-text-primary);
  color: var(--color-background);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

/* Todo text */
.todo-text {
  flex: 1; /* Take up remaining space */
  color: var(--color-text-primary);
  font-size: 1rem;
}

/* Action buttons container */
.todo-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0; /* Hidden by default */
  transition: opacity 0.2s;
}

/* Show buttons when hovering over todo item */
.todo-item:hover .todo-actions {
  opacity: 1;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s, transform 0.1s;
}

.action-button:hover {
  opacity: 1;
  transform: scale(1.1);
}

.delete-button:hover {
  filter: brightness(1.2);
}
</style>