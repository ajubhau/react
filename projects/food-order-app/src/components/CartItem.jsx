import CartContext from '../util/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Multiple from '../assets/math.png';
import { useContext } from 'react';

export default function CartItem({item}) {
    const cartCtx = useContext(CartContext);

    return(
        <li className="cart-item">
            <p>{item.name} - {item.quantity} <img src={Multiple} className='icon-scc' /> {currencyFormatter.format(item.price)}</p>
            <p className="cart-item-actions">
                <button onClick={() => cartCtx.removeItemFromCart(item.id)}>-</button>{item.quantity}<button onClick={() => cartCtx.addItemToCart(item)}>+</button>
            </p>
        </li>
    )
}