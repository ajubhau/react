import Button from './UI/Button.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartContext from '../util/CartContext.jsx';
import { useContext } from 'react';

export default function ProductItem({item}) {
    const cartCtx = useContext(CartContext);
    return (
        <div className="meal-item" key={item.id}>
            <article>
                <div>
                    <img src={`http://localhost:3000/${item.image}`} />
                    <h3>{item.name}</h3>
                    <p className="meal-item-price price-text">{currencyFormatter.format(item.price)}</p>
                    <p className="meal-item-description">{item.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={() => cartCtx.addItemToCart(item)}>Add to Cart</Button>
                </p>
            </article>
        </div>
    )
}