<template>
  <div>
    <button @click="sortByPrice('asc')">Sort by Price Ascending</button>
    <button @click="sortByPrice('desc')">Sort by Price Descending</button>
    <button @click="sortByType('jewelery')">Sort by Jewelry</button>
    <button @click="sortByType('electronics')">Sort by Electronics</button>
  </div>
</template>

<script>
export default {
  methods: {
    sortByPrice(order) {
      this.$emit('sortPrice', order);
    },
    sortByType(type) {
      this.$emit('sortType', type);
    }
  }
}
</script>

<style scoped>
/* Your CSS styles for Filters.vue */
</style>
