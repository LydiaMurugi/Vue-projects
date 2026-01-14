import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Todo } from '../types/todo'

export const useTodoStore = defineStore('todos', () => {
  
  // LOCALSTORAGE KEY
  // The key we'll use to store/retrieve data
  const STORAGE_KEY = 'vue-todos'
  
  // HELPER FUNCTIONS FOR LOCALSTORAGE

  // Load todos from localStorage
  // Returns array of todos or empty array if nothing saved
  function loadTodosFromStorage(): Todo[] {
    try {
      // Get the JSON string from localStorage
      const stored = localStorage.getItem(STORAGE_KEY)
      
      // If nothing stored, return empty array
      if (!stored) {
        return []
      }
      
      // Parse JSON string back into JavaScript array
      // JSON.parse converts string → object/array
      const parsed = JSON.parse(stored)
      
      // Validate it's actually an array
      return Array.isArray(parsed) ? parsed : []
      
    } catch (error) {
      // If anything goes wrong (corrupted data, etc.), log it
      console.error('Failed to load todos from localStorage:', error)
      return []
    }
  }
  
  // Save todos to localStorage
  function saveTodosToStorage(todosToSave: Todo[]) {
    try {
      // Convert array to JSON string
      // JSON.stringify converts object/array → string
      const json = JSON.stringify(todosToSave)
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, json)
      
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error)
    }
  }
  
  // STATE
  // Try to load from localStorage first, fallback to default todos
  const todos = ref<Todo[]>(loadTodosFromStorage().length > 0 
    ? loadTodosFromStorage()
    : [
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
        },
          {
          id: '3',
          text: 'Deploy with netlify',
          completed: false,
          createdAt: Date.now()
        }
      ]
  )
  
  
  // WATCHER - Auto-save when todos change
  // From Vue 3 docs: watch() lets you perform side effects when reactive data changes
  
  watch(
    todos,                           // What to watch
    (newTodos) => {                  // Callback when it changes
      saveTodosToStorage(newTodos)   // Save to localStorage
    },
    { deep: true }                   // Watch nested properties (important for arrays!)
  )
  
  // What does { deep: true } do?
  // Without it: Only detects if entire array is replaced
  // With it: Detects changes inside the array (todo.completed, todo.text, etc.)
  
  
  // GETTERS
  
  const totalTodos = computed(() => {
    return todos.value.length
  })
  
  const completedTodos = computed(() => {
    return todos.value.filter(todo => todo.completed).length
  })
  
  const pendingTodos = computed(() => {
    return todos.value.filter(todo => !todo.completed).length
  })
  
  
  // ACTIONS
  
  function addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      createdAt: Date.now()
    }
    
    todos.value.unshift(newTodo)
    // No need to manually save - watch() does it automatically!
  }
  
  function toggleTodo(id: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      // watch() auto-saves!
    }
  }
  
  function deleteTodo(id: string) {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
      // watch() auto-saves!
    }
  }
  
  function editTodo(id: string, newText: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.text = newText
      // watch() auto-saves!
    }
  }
  
  // New action: Clear all todos
  function clearAllTodos() {
    todos.value = []
  }
  
  
  // RETURN
  
  return {
    // State
    todos,
    
    // Getters
    totalTodos,
    completedTodos,
    pendingTodos,
    
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearAllTodos
  }
})