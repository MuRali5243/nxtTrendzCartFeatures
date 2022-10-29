import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    const upList = cartList.map(each => {
      const statu = each.id === product.id
      if (statu) {
        const quant = each.quantity + 1
        const obj = {...each, quantity: quant}
        return obj
      }
      return each
    })
    this.setState({cartList: upList})
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    const upList = cartList.map(each => {
      const statu = each.id === product.id
      const q = each.quantity > 1
      if (statu && q) {
        const quant = each.quantity - 1
        const obj = {...each, quantity: quant}
        return obj
      }
      return each
    })
    this.setState({cartList: upList})
  }

  removeCartItem = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const status = cartList.some(each => each.id === product.id)
    console.log(status)
    if (status) {
      const upList = cartList.map(each => {
        const statu = each.id === product.id
        if (statu) {
          const quant = each.quantity + 1
          const obj = {...each, quantity: quant}
          return obj
        }
        return each
      })
      this.setState({cartList: upList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
