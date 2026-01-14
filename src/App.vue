<script setup lang="ts">
import { useTodoStore } from './stores/useTodoStore'
import TodoStats from './components/TodoStats.vue'
import TodoInput from './components/TodoInput.vue'
import TodoItem from './components/TodoItem.vue'

const todoStore = useTodoStore()

// Function to clear with confirmation
function handleClearAll() {
  if (confirm('Are you sure you want to delete all todos?')) {
    todoStore.clearAllTodos()
  }
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <div>
          <h1>My Todos</h1>
          <p>Stay organized, stay productive</p>
        </div>
        
        <!-- Clear all button -->
        <button 
          v-if="todoStore.totalTodos > 0"
          @click="handleClearAll" 
          class="clear-button"
        >
          Clear All
        </button>
      </div>
    </header>

    <TodoStats 
      :total="todoStore.totalTodos"
      :completed="todoStore.completedTodos"
      :pending="todoStore.pendingTodos"
    />

    <TodoInput @add-todo="todoStore.addTodo" />

    <div class="todos-list">
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @toggle="todoStore.toggleTodo"
        @delete="todoStore.deleteTodo"
        @edit="todoStore.editTodo"
      />
    </div>
    
    <!-- Empty state message -->
    <div v-if="todoStore.totalTodos === 0" class="empty-state">
      <p>🎉 No todos yet! Add one above to get started.</p>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.app-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

h1 {
  color: var(--color-text-primary);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.clear-button {
  background-color: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-button:hover {
  color: #ef4444;
  border-color: #ef4444;
}

.todos-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-text-secondary);
}

.empty-state p {
  font-size: 1.125rem;
}
</style>