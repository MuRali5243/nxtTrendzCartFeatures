import CartContext from '../../context/CartContext'
import './index.css'

const Summary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const countt = cartList.length
      const callback = (total, each) => {
        const {quantity, price} = each
        const indPrice = quantity * price
        return total + indPrice
      }
      const TotalPrice = cartList.reduce(callback, 0)
      return (
        <div className="cart-summary">
          <h1 className="cart-summary-h">
            <span className="total-order">Order Total:</span>
            {`Rs ${TotalPrice}/-`}
          </h1>
          <p>{`${countt} items in cart`}</p>
          <button type="button">checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Summary
