<script setup lang="ts">
// Import the component we just created
import TodoStats from './components/TodoStats.vue'
import TodoInput from './components/TodoInput.vue'
import TodoItem from './components/TodoItem.vue'
import type { Todo } from './types/todo'
 
// Temporary test data
const todos = ref<Todo[]>([
  {
    id: '1',
    text: 'Learn Vue 3 Composition API',
    completed: true,
    createdAt: Date.now()
  },
  {
    id: '2',
    text: 'Build a todo app',
    completed: false,
    createdAt: Date.now()
  },
  {
    id: '3',
    text: 'Master Pinia state management',
    completed: false,
    createdAt: Date.now()
  }
])

// Later, this will come from Pinia store
const total = ref(todos.value.length)
const completed = ref(todos.value.filter(t =>t.completed).lenght)
const pending = ref(todos.value.filter(t => !t.completed).lenght)

// Function to handle when TodoInput emits the 'addTodo' event
// This receives the text from the child component

const handleAddTodo = (text: string) => {
  console.log('New todo:', text)
  //later save in Pinia
  alert(`You added: "${text}"`)
}

// Hanlde toggle completion

const handleToggle = (id: string) => {
  console.log('Toggle todo:', id)
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    // Recalculate stats
    completed.value = todos.value.filter(t => t.completed).length
    pending.value = todos.value.filter(t => !t.completed).length
  }
}
// Handle delete
const handleDelete = (id: string) => {
  cosole.log('Delete todo:', id)
  const index = todos.value.findIndex(t => t.id === id)
  if (index !== -1) {
    todos.value.splice(index, 1)
    // Recal stats
    total.value = todos.value.length
    completed.value = todos.value.filter(t => t.completed).length
    pending.value = todos.value.filter(t => !t.completed).length
  }
}
  // Handle edit
  const handleEdit = (id: string. newText: string) => {
    console.log('Edit todo:', id, newText)
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.text = newText
    }
  }
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>My Todos</h1>
      <p>Stay organized, stay productive</p>
    </header>

    <!-- Using our TodoStats component -->
    <!-- We pass data using props with : syntax -->
    <TodoStats 
    :total="total" 
    :completed="completed" 
    :pending="pending" />

    <!-- :total(: is v-bind without it total="5" which is a string) is the prop name from the child and "total" is the variable name from the parent -->
    <!-- 
      Listen for the 'addTodo' event from TodoInput
      @add-todo in template = 'addTodo' event name
      Vue converts camelCase to kebab-case in templates
    -->
    <TodoInput @add-todo="handleAddTodo" />

    <!-- List of todos -->
      <div class="todos-list">
      <!-- 
        v-for - render list of items
        :key is REQUIRED for performance and tracking
      -->
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="handleToggle"
        @delete="handleDelete"
        @edit="handleEdit"
      />
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

h1 {
  color: var(--color-text-primary);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}
</style>
//camelCase vs Kebab case addTodo(event name in script) vs @add-todo(event listener in tempate)
