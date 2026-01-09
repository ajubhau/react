import ProductItem from './ProductItem.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './UI/Error.jsx';

const req = {}; // call only ones
export default function Products() {
    const {data, loading, error} = useHttp('http://localhost:3000/meals', req, []);
    if(loading) {
        return <p>Fetching meals.....</p>
    }
    if(error) {
        return <Error label="Failed to load products" message={error} />
    }
    return (
        <div id="meals">
            {data.map((item) => 
                <ProductItem key={item.id} item={item} />
            )}
        </div>
    )
}