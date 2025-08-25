<script setup>
const { data } = defineProps({
  data: Object,
})
console.log(data)
</script>

<template>
  <tr>
    <td class="coin">
      <img
        v-if="data.icon"
        :src="`data:image/svg+xml;base64,${data.icon}`"
        :alt="data.code"
        width="40"
        height="40"
      />
      <span>{{ data.pair.primary }}</span>
    </td>
    <td>${{ data.price.last }}</td>
    <td
      :class="{
        positive: data.price.change.direction === 'Up',
        negative: data.price.change.direction === 'Down',
      }"
    >
      <div class="percent_change">
        {{ data.price.change.direction === 'Up' ? '+' : '-' }}{{ data.price.change.percent }}%
      </div>
      <div>
        {{ data.price.change.direction === 'Up' ? '+' : '-' }}{{ data.price.change.amount }}
      </div>
    </td>
    <td class="volume_price">$ {{ Number(data.volume.secondary).toFixed(2) }}</td>
  </tr>
</template>

<style>
td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  height: 60px;
  display: flex;
  align-items: center;
}

tr {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
}

.coin {
  display: flex;
  align-items: center;
  gap: 15px;
}

.coin span {
  font-weight: 500;
  text-transform: uppercase;
}

.positive {
  color: green;
  font-weight: 400;
}
.negative {
  color: red;
  font-weight: 400;
}
.negative,
.positive {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
}

.percent_change {
  margin-right: 20px;
}

.volume_price {
  justify-content: right;
}
</style>
