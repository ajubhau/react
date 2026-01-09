import { useContext } from 'react';
import HeaderImg from '../assets/logo.jpg'
import Button from './UI/Button.jsx';
import CartContext from '../util/CartContext.jsx';
import ModalContext from '../util/ModalContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);

    const totalItem = cartCtx.items.reduce((total, item) => total + item.quantity , 0);

    return (
        <div id="main-header">
            <div id="title">
                <img src={HeaderImg} />
                <h1>REACTFOOD</h1>
            </div>
            <Button isText onClick={modalCtx.onShowCart}>Cart({totalItem})</Button>
        </div>
        
    )
}