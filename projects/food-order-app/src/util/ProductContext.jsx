import { createContext, useState, useEffect } from "react";

const ProductData = createContext({
  listData: [],
  loading: false,
  error: '',
  cartData: [],
  onAdd: (item) => {},
  onRemove: () => {}
});

export function DataContextProvider({children}) {
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          await fetch('http://localhost:3000/meals').then(reponse => {
          return reponse.json();
        }).then(data => {
          setListData(data);
          setLoading(false);
        }).catch(error => {
          setLoading(false);
          setError(error);
        });
      }
      fetchData();
    }, []);

    function handleAddCartItem(item) {
      setCartData(prevState => {
        return [...prevState, item]
      })
    }

    function handleRemoveCartItem(item) {
      setCartData(item);
    }

    const ctxValue = {
        listData,
        loading,
        error,
        cartData,
        onAdd: handleAddCartItem,
        onRemove: handleRemoveCartItem
    }
    return <ProductData value={ctxValue}>{children}</ProductData>
    
}
export default ProductData;