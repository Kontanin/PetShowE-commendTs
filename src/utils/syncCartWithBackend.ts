


export const syncCartWithBackend = async (cart:any) => {
  try {
    console.log(cart,"not error")
    // await axios.post('/api/syncCart', { cart });
  } catch (error) {
    console.error('Error syncing cart with backend:', error);
  }
};
