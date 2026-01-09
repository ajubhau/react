import Button from '../components/UI/Button.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartContext from '../util/CartContext.jsx';
import { useContext } from 'react';
import Modal from './UI/Modal.jsx';
import ModalContext from '../util/ModalContext.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
   
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);
    let totalValue = cartCtx.items.reduce((acc, current) => {return acc + (+current.price) * current.quantity}, 0).toFixed(2)
    
    return(
        <Modal open={modalCtx.value === 'cart'} onClose={modalCtx.value === 'cart' ? modalCtx.onHideCart : null}>
            <div className="cart">
                <h2>Your cart</h2>
                <ul>
                    {cartCtx.items.map((item) => <CartItem key={item.id} item={item} />)}
                </ul>
                <div className="cart-total">{currencyFormatter.format(totalValue)}</div>
                <div className="modal-actions">
                    <Button isText onClick={modalCtx.onHideCart}>Close</Button>
                    <Button onClick={modalCtx.onShowCheckout}>Go to Checkout</Button>
                </div>
            </div>
        </Modal>
    )
}