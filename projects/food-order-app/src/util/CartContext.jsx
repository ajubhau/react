import { createContext, useReducer, useState, useEffect } from "react";

const CartContext = createContext({
    listData: [],
    items: [],
    addItemToCart: (item) => {},
    removeItemFromCart: (item) => {},
    clearCart: (item) => {}
})

function cartReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
       const indexForExistingCartItem = state.items.findIndex(item => item.id === action.item.id);
       const updateItem = [...state.items];

       if (indexForExistingCartItem > -1) {
            const existingItem = state.items[indexForExistingCartItem];
            const updateExistingCartItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updateItem[indexForExistingCartItem] = updateExistingCartItem;
       } else {
            updateItem.push({...action.item, quantity: 1})
       }
       return {...state, items: updateItem}
    }

    if(action.type === 'REMOVE_ITEM') {
        const indexForExistingCartItem = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[indexForExistingCartItem];
        const updatedItem = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItem.splice(indexForExistingCartItem, 1);
        } else {
            const updated = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItem[indexForExistingCartItem] = updated;
        }
        return {...state, items: updatedItem}
        
    }
    if(action.type === 'CLEAR_ITEM') {
        return {...state, items: []}
    }
    return state;
}
export function CartContextProvider({children}) {
    const [listData, setListData] = useState([]);
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items:[]});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetch('http://localhost:3000/meals').then(reponse => {
    //         return reponse.json();
    //         }).then(data => {
    //             setListData(data);
    //         })
    //     }
    //     fetchData();
    // }, []);

    function handleAddItemToCart(item) {
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    }

    function handleRemoveItemFromCart(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})
    }

    function handleClearCart() {
        clearCart({type: 'CLEAR_ITEM'})
    }

    const ctxValue = {
        listData: listData,
        items: cart.items,
        addItemToCart: handleAddItemToCart,
        removeItemFromCart: handleRemoveItemFromCart,
        clearCart: handleClearCart
    }
    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    // Provider basically use for before React 19
}

export default CartContext;