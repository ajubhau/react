import { createContext, useState } from "react";

const ModalContext = createContext({
    value: '',
    onShowCart: () => {},
    onHideCart: () => {},
    onShowCheckout: () => {},
    onHideCheckout: () => {}    
})

export function ModalContextProvider({children}) {
    const [modalValue, setModalValue] = useState('');

    function onShowCart() {
        setModalValue('cart');
    }
    function onHideCart() {
        setModalValue('');
    }
    function onShowCheckout() {
        setModalValue('checkout');
    }
    function onHideCheckout() {
        console.log('ddd')
        setModalValue('');
    }

    const ctxModalValue = {
        value: modalValue,
        onShowCart,
        onHideCart,
        onShowCheckout,
        onHideCheckout    
    }
    return <ModalContext.Provider value={{
        value: modalValue,
        onShowCart,
        onHideCart,
        onShowCheckout,
        onHideCheckout    
    }}>{children}</ModalContext.Provider>
}

export default ModalContext;