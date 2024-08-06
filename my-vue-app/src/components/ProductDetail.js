import { ref, onMounted } from 'vue';

/**
 * Composable function to handle product detail logic in a Vue component.
 * @returns {Object} An object containing reactive properties and methods for product details.
 */
export function useProductDetail() {
  const product = ref({});
  const isFavorited = ref(false);
  const loading = ref(true);
  const sortPrice = ref('');
  const sortType = ref('');

  /**
   * Initializes the component by retrieving query parameters from the URL and fetching product data.
   */
  const init = () => {
    // Retrieve query parameters from the URL hash
    const urlHash = window.location.hash;
    const urlParams = new URLSearchParams(urlHash.replace('#', '').split('?')[1] || '');
    const id = urlParams.get('id');

    sortPrice.value = urlParams.get('sortPrice') || ''; // Get sorting criteria for price
    sortType.value = urlParams.get('sortType') || ''; // Get sorting criteria for type

    console.log('URL parameters:', { id, sortPrice: sortPrice.value, sortType: sortType.value });

    fetchProductData(id);
  };

  /**
   * Fetches product data from the API based on the provided product ID.
   * @param {string} id - The product ID to fetch data for.
   */
  const fetchProductData = async (id) => {
    if (id) {
      console.log('Fetching product with ID:', id);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        console.log('Product data:', data);
        product.value = data;
        isFavorited.value = checkWishlist(data.id);
      } catch (err) {
        console.error('Error fetching product data:', err);
        product.value = {
          title: 'Product not found.',
          image: '',
          price: 'N/A',
          description: '',
          category: 'N/A',
          rating: null
        };
      } finally {
        loading.value = false;
        updateBackLink();
      }
    } else {
      product.value = {
        title: 'Product not found.',
        image: '',
        price: 'N/A',
        description: '',
        category: 'N/A',
        rating: null
      };
      loading.value = false;
      updateBackLink();
    }
  };

  /**
   * Updates the back link with the current sorting and filtering parameters.
   */
  const updateBackLink = () => {
    const backLink = document.getElementById('backLink');
    if (backLink) {
      // Update the back link with sorting and filtering parameters
      const url = new URL(window.location.href);
      url.hash = `?sortPrice=${sortPrice.value}&sortType=${sortType.value}`;
      backLink.href = url.toString();
    }
  };

  /**
   * Checks if a product is in the wishlist.
   * @param {string} productId - The ID of the product to check.
   * @returns {boolean} `true` if the product is in the wishlist, `false` otherwise.
   */
  const checkWishlist = (productId) => {
    // Implement your wishlist check logic here
    return false;
  };

  onMounted(() => {
    init();

    window.addEventListener('popstate', () => {
      // Re-run the init function when the back or forward button is pressed
      init();
    });
  });

  return {
    product,
    isFavorited,
    loading,
    sortPrice,
    sortType
  };
}
