import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';
import { fetchProducts, fetchCategories } from '@/lib/api/products';

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to fetch categories');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setInitialProducts: (state, action: PayloadAction<Product[]>) => {
    state.products = action.payload;
    state.filteredProducts = action.payload;
    state.loading = false;
    state.error = null;
  },
  setCategories: (state, action: PayloadAction<string[]>) => {
    state.categories = action.payload;
  },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      applyFilters(state);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
      applyFilters(state);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        applyFilters(state);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const applyFilters = (state: ProductsState) => {
  let filtered = [...state.products];

  if (state.selectedCategory) {
    filtered = filtered.filter(
      product => product.category === state.selectedCategory
    );
  }
  if (state.searchQuery) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  state.filteredProducts = filtered;
};

export const {
  setSearchQuery,
  setSelectedCategory,
  setCurrentPage,
  deleteProduct,
  addProduct,
  updateProduct,
   setInitialProducts, 
  setCategories,
} = productsSlice.actions;

export default productsSlice.reducer;