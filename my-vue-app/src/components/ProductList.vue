<template>
  <div class="bg-purple-800 min-h-screen p-4">
    <!-- Header Section -->
    <header class="bg-purple-800 p-4 flex justify-between items-center">
      <div class="flex items-center">
        <h1 class="text-white text-[4vw] font-bold">GoodMarting</h1>
      </div>
    </header>

    <!-- Sorting and Filtering -->
    <SortControls
      :sortPrice="sortPrice"
      :sortType="sortType"
      :categories="categories"
      :isDefaultSort="isDefaultSort"
      @update:sortPrice="updateSortPrice"
      @update:sortType="updateSortType"
      @sort-change="handleSortChange"
    />

    <!-- Product List -->
    <div>
      <div v-if="isLoading" class="flex justify-center items-center h-full">
        <p class="border-gray-300 text-[5vw]">Loading...</p>
      </div>
      <ul v-else class="flex flex-wrap -mx-4">
        <li v-for="item in filteredItems" :key="item.id" class="flex flex-col w-full md:w-1/2 lg:w-1/4 p-4 min-h-[60vw] sm:min-h-[25vw] md:min-h-[20vw] lg:min-h-[15vw] cursor-pointer">
          <a :href="`/#/about?id=${item.id}&sortPrice=${sortPrice}&sortType=${sortType}`" class="block h-full">
            <div class="border-2 border-purple-800 bg-purple-300 p-4 rounded-lg h-full flex flex-col">
              <img :src="item.image" :alt="item.title" class="w-full max-h-[35vw] sm:max-h-[20vw] md:max-h-[30vw] lg:max-h-[25vw] object-contain mb-4">
              <div class="flex flex-col flex-grow">
                <div class="mb-4">
                  <h2 class="font-bold text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[1.5vw]">{{ item.title }}</h2>
                </div>
                <div class="flex flex-col mb-4">
                  <p class="text-gray-700 text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw]">{{ '$' + item.price }}</p>
                  <p class="text-[4vw] lg:text-[1.5vw] md:text-[2vw] sm:text-[3vw] text-black mb-0">Category: {{ item.category }}</p>
                  <div class="flex items-center">
                    <span class="text-[4vw] lg:text-[1.5vw] md:text-[2vw] sm:text-[3vw] text-gray-800 mr-2">Rating:</span>
                    <div class="flex items-center">
                      <svg v-for="n in Math.floor(item.rating.rate)" :key="`filled-${n}`" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27l6.18 3.85-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.35-1.64 7.03L12 17.27z"/>
                      </svg>
                      <svg v-for="n in Math.ceil(item.rating.rate - Math.floor(item.rating.rate))" :key="`half-${n}`" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27l6.18 3.85-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.35-1.64 7.03L12 17.27z"/>
                      </svg>
                      <svg v-for="n in 5 - Math.ceil(item.rating.rate)" :key="`empty-${n}`" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27l6.18 3.85-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.35-1.64 7.03L12 17.27z"/>
                      </svg>
                    </div>
                  </div>
                  <span class="text-[4vw] lg:text-[1.5vw] md:text-[2vw] sm:text-[3vw] text-gray-800">{{ item.rating ? `(${item.rating.count} reviews)` : 'No reviews' }}</span>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import useProductList from './ProductList.js';
import SortControls from './SortControls.vue';

export default {
  name: 'ProductList',
  components: {
    SortControls
  },
  setup() {
    const {
      items,
      filteredItems,
      isLoading,
      sortPrice,
      sortType,
      categories,
      handleSortChange,
      resetFilters,
      isDefaultSort
    } = useProductList();

    function updateSortPrice(newSortPrice) {
      sortPrice.value = newSortPrice;
      handleSortChange();
    }

    function updateSortType(newSortType) {
      sortType.value = newSortType;
      handleSortChange();
    }

    return {
      items,
      filteredItems,
      isLoading,
      sortPrice,
      sortType,
      categories,
      handleSortChange,
      resetFilters,
      isDefaultSort,
      updateSortPrice,
      updateSortType
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
