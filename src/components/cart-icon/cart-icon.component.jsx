import { useDispatch, useSelector } from 'react-redux';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.reducer'

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);    

    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }



    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;