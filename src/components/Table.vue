<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCryptoStore } from '../stores/crypto'
import TableHead from './TableHead.vue'
import TableRow from './TableRow.vue'

const cryptoStore = useCryptoStore()
const sortKey = ref(null)
const sortOrder = ref(1)

onMounted(async () => {
  await cryptoStore.fetchCurrency()
})

const sortedData = computed(() => {
  const data = [...cryptoStore.crypto]

  if (!sortKey.value) return data

  return data.sort((a, b) => {
    let valA, valB

    switch (sortKey.value) {
      case 'coin':
        valA = a.pair.primary.toLowerCase()
        valB = b.pair.primary.toLowerCase()
        return valA.localeCompare(valB) * sortOrder.value

      case 'price':
        valA = parseFloat(a.price.last)
        valB = parseFloat(b.price.last)
        return (valA - valB) * sortOrder.value

      case 'volume':
        valA = parseFloat(a.volume.secondary)
        valB = parseFloat(b.volume.secondary)
        return (valA - valB) * sortOrder.value

      case 'change':
        valA = parseFloat(a.price.change.percent)
        valB = parseFloat(b.price.change.percent)
        return (valA - valB) * sortOrder.value
    }
  })
})

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}
</script>

<template>
  <table class="crypto_table">
    <TableHead @sort="handleSort" />
    <tbody>
      <TableRow v-for="item in sortedData" :key="item.pair.primary" :data="item" />
    </tbody>
  </table>
</template>

<style>
.crypto_table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 18px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
