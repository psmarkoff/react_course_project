import { signOut } from "firebase/auth";
import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);


    const signOutHandler = async () => {
      await signOutUser();
      setCurrentUser(null);
    }

    return(
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to='/'> 
            <div><CrwnLogo className="logo" /></div>
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
              SHOP
            </Link>
            <Link>
              {
                currentUser ? (
                  <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                ) : (
                  <Link className='nav-link' to='/auth'>
                    SIGN IN
                  </Link>
                )
              }
            </Link>
            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;