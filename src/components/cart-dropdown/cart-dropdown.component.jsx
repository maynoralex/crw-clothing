import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'
import { useNavigate } from 'react-router';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';




const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckOutHandler = () =>{
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? 
                    (cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>))
                : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button  onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );

}

export default CartDropdown;


