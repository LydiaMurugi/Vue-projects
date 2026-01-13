<script setup lang="ts">
//props data passed from parent to this child
const props = defineProps<{
  total: number
  completed: number
  pending: number
}>()

//defineProps<{ creates properties this component can receive}>()
//props are READ-ONLY we can use them bt not change them
</script>

<template>
  <div class="stats-container">
    <!-- Card 1:Total -->
    <div class="stat-card">
      <p class="stat-label">Total</p>
      <p class="stat-value">{{ total }}</p>
    </div>

    <!-- Card 2:Completed -->
    <div class="stat-card">
      <p class="stat-label">Completed</p>
      <p class="stat-value">{{ completed }}</p>
    </div>

    <!-- Card 3:Pending -->
    <div class="stat-card">
      <p class="stat-label">Pending</p>
      <p class="stat-value">{{ pending }}</p>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 1rem; /* Space between cards */
  margin-bottom: 2rem;
}

.stat-card {
  background-color: var(--color-surface); /* Using our global variable! */
  padding: 1.5rem;
  border-radius: 8px;
  transition: background-color 0.2s; /* Smooth color change */
}

.stat-card:hover {
  background-color: var(--color-surface-hover);
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: var(--color-text-primary);
  font-size: 2rem;
  font-weight: bold;
}
</style>
