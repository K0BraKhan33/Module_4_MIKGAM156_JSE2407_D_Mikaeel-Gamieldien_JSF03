import { ref, onMounted, watch, computed } from 'vue';

/**
 * Composable function to handle product list logic in a Vue component.
 * @returns {Object} An object containing reactive properties and methods for managing the product list.
 */
export default function useProductList() {
  const items = ref([]);
  const filteredItems = ref([]);
  const isLoading = ref(true);
  const sortPrice = ref('');
  const sortType = ref('');
  const categories = ref([]);

  /**
   * Initializes filters from the URL hash parameters.
   */
  function initializeFiltersFromUrl() {
    const urlParams = new URLSearchParams(window.location.hash.slice(1).split('?')[1]);
    sortPrice.value = urlParams.get('sortPrice') || '';
    sortType.value = urlParams.get('sortType') || '';
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      items.value = products;
      filteredItems.value = products;

      const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories');
      const categoryList = await categoriesResponse.json();
      categories.value = categoryList;

      initializeFiltersFromUrl();
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      isLoading.value = false;
    }
  });

  watch([sortPrice, sortType, items], () => {
    let currentItems = [...items.value];

    if (sortType.value) {
      currentItems = currentItems.filter(item => item.category === sortType.value);
    }

    if (sortPrice.value) {
      currentItems.sort((a, b) => {
        switch (sortPrice.value) {
          case 'priceAsc':
            return a.price - b.price;
          case 'priceDesc':
            return b.price - a.price;
          case 'titleAsc':
            return a.title.localeCompare(b.title);
          case 'titleDesc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    filteredItems.value = currentItems;
  }, { immediate: true });

  /**
   * Updates the URL hash to include current sorting and filtering parameters.
   */
  function handleSortChange() {
    const url = new URL(window.location);
    url.hash = `#/?${new URLSearchParams({ sortPrice: sortPrice.value, sortType: sortType.value }).toString()}`;
    window.history.pushState({}, '', url);
  }

  /**
   * Resets the sorting and filtering parameters and updates the URL.
   */
  function resetFilters() {
    sortPrice.value = '';
    sortType.value = '';
    handleSortChange();
  }

  /**
   * Computes whether the current sorting is the default (no sorting or filtering applied).
   * @returns {boolean} `true` if no sorting or filtering is applied, `false` otherwise.
   */
  const isDefaultSort = computed(() => !sortPrice.value && !sortType.value);

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
