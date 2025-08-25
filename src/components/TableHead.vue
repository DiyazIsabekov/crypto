<script setup>
const emit = defineEmits(['sort'])

const columns = [
  { key: 'coin', label: 'Coin' },
  { key: 'price', label: 'Price' },
  { key: 'change', label: '24h Change' },
  { key: 'volume', label: '24h Volume' },
]
</script>

<template>
  <thead>
    <tr>
      <th v-for="col in columns" :key="col.key" @click="emit('sort', col.key)" class="sortable">
        {{ col.label }}
        <span class="arrow">▲▼</span>
      </th>
    </tr>
  </thead>
</template>

<style>
th {
  cursor: pointer;
  user-select: none;
  padding: 12px;
  text-align: left;
}

.sortable {
  display: flex;
  align-items: center;
  gap: 6px;
}

.arrow {
  font-size: 12px;
  opacity: 0.6;
}
</style>
