// stores/searchStore.ts
import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchState {
  searchHistory: string[];
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
}

export  const SearchStore = create(
  persist<SearchState>(
  (set) => ({
    searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
      addSearchTerm:(term:string) =>{
        set((state)=>{
          const updatedHistory = [term, ...state.searchHistory];
          localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
          return { searchHistory: updatedHistory };
        }
        )
      }
      ,  clearSearchHistory: () =>{
        set({searchHistory:[]})
      }
}) 
  ,{
    name: 'cartStore',
    storage: createJSONStorage(() => localStorage),
  }
)
)




  // addSearchTerm: (term) =>
  //   set((state) => {
  //     const updatedHistory = [term, ...state.searchHistory];
  //     localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  //     return { searchHistory: updatedHistory };
  //   }),


// favarite product will add it fueture