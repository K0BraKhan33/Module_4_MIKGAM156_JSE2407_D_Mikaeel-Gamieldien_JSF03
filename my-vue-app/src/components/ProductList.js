import { ref, onMounted, watch, computed } from 'vue';

export default function useProductList() {
  const items = ref([]);
  const filteredItems = ref([]);
  const isLoading = ref(true);
  const sortPrice = ref('');
  const sortType = ref('');
  const categories = ref([]);

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

  function handleSortChange() {
    const url = new URL(window.location);
    url.hash = `#/?${new URLSearchParams({ sortPrice: sortPrice.value, sortType: sortType.value }).toString()}`;
    window.history.pushState({}, '', url);
  }

  function resetFilters() {
    sortPrice.value = '';
    sortType.value = '';
    handleSortChange();
  }

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
