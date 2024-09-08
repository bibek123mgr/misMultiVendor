import Products from '../components/user/product/Products'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
const Product = () => {
    const { data } = useSelector((store: RootState) => store.product)
    const products = data.products
    return (
        <div>
            <Products title='All products' filter={true} products={products} />
        </div>
    )
}

export default Product
