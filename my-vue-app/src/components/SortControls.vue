<template>
  <div class="bg-purple-300 flex p-max space-x-4">
    <div>
      <label for="sortPrice" class="block text-sm font-medium text-gray-700">Sort by Title or Price</label>
      <select id="sortPrice" v-model="localSortPrice" @change="emitSortChange"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Select</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="titleAsc">Title: A to Z</option>
        <option value="titleDesc">Title: Z to A</option>
      </select>
    </div>
    <div>
      <label for="sortType" class="block text-sm font-medium text-gray-700">Sort by Type</label>
      <select id="sortType" v-model="localSortType" @change="emitSortChange"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Select</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <button v-if="!isDefaultSort" @click="resetFilters" class="mt-6 py-2 px-4 bg-red-500 text-white rounded-md">Reset Filters</button>
  </div>
</template>

<script>
export default {
  name: 'SortControls',
  props: {
    sortPrice: String,
    sortType: String,
    categories: Array,
    isDefaultSort: Boolean
  },
  data() {
    return {
      localSortPrice: this.sortPrice,
      localSortType: this.sortType
    };
  },
  methods: {
    emitSortChange() {
      this.$emit('update:sortPrice', this.localSortPrice);
      this.$emit('update:sortType', this.localSortType);
      this.$emit('sort-change');
    },
    resetFilters() {
      this.localSortPrice = '';
      this.localSortType = '';
      this.emitSortChange();
    }
  },
  watch: {
    sortPrice(newVal) {
      this.localSortPrice = newVal;
    },
    sortType(newVal) {
      this.localSortType = newVal;
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
