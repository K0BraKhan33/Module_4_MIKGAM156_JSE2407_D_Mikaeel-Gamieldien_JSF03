<template>
  <div class="bg-green-800 min-h-screen p-4">
    <!-- Header Section -->
    <header class="bg-green-800 p-4 flex justify-between items-center">
      <div class="flex items-center">
        <h1 class="text-white text-[4vw] font-bold">GoodMarting</h1>
      </div>
    </header>

    <!-- Sorting and Filtering -->
    <div class="bg-green-300 flex p-max space-x-4">
      <div>
        <label for="sortPrice" class="block text-sm font-medium text-gray-700">Sort by Title or Price</label>
        <select id="sortPrice" v-model="sortPrice" @change="handleSortChange"
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
        <select id="sortType" v-model="sortType" @change="handleSortChange"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="">Select</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <button v-if="!isDefaultSort" @click="resetFilters" class="mt-6 py-2 px-4 bg-red-500 text-white rounded-md">Reset Filters</button>
    </div>

    <!-- Product List -->
    <div>
      <div v-if="isLoading" class="flex justify-center items-center h-full">
        <p class="border-gray-300 text-[5vw]">Loading...</p>
      </div>
      <ul v-else class="flex flex-wrap -mx-4">
        <li v-for="item in filteredItems" :key="item.id" class="flex flex-col w-full md:w-1/2 lg:w-1/4 p-4 min-h-[60vw] sm:min-h-[25vw] md:min-h-[20vw] lg:min-h-[15vw] cursor-pointer">
          <a :href="`/#/about?id=${item.id}&sortPrice=${sortPrice}&sortType=${sortType}`" class="block h-full">
            <div class="border-2 border-green-800 bg-green-300 p-4 rounded-lg h-full flex flex-col">
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

export default {
  name: 'ProductList',
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

    return {
      items,
      filteredItems,
      isLoading,
      sortPrice,
      sortType,
      categories,
      handleSortChange,
      resetFilters,
      isDefaultSort
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
