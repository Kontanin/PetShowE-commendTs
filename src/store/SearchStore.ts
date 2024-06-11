import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchState {
  searchHistory: string[];
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
}

export const SearchStore = create(
  persist<SearchState>(
    (set) => ({
      searchHistory: [],
      addSearchTerm: (term: string) => {
        set((state) => {
          const updatedHistory = [term, ...state.searchHistory];
          if (typeof window !== 'undefined') {
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
          }
          return { searchHistory: updatedHistory };
        });
      },
      clearSearchHistory: () => {
        set(() => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('searchHistory', '[]');
          }
          return { searchHistory: [] };
        });
      },
    }),
    {
      name: 'searchStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Initialize search history from localStorage on the client side
if (typeof window !== 'undefined') {
  const initialSearchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  SearchStore.setState({ searchHistory: initialSearchHistory });
}




  // addSearchTerm: (term) =>
  //   set((state) => {
  //     const updatedHistory = [term, ...state.searchHistory];
  //     localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  //     return { searchHistory: updatedHistory };
  //   }),


// favarite product will add it fueture