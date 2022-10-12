import React from 'react'
import './Header.module.scss'
import {Link} from 'react-router-dom'

interface IHeaderProps {
    onClickCart: () => void
}

const Header: React.FC<IHeaderProps> = ({onClickCart}) => {
    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Logo"/>
                    <div className="headerInfo">
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин найкращих кросівок</p>
                    </div>
                </div>
            </Link>


            <ul className="d-flex align-center">
                <li onClick={onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt=""/>
                    <span className="opacity-6 fw-bold">1205 грн.</span>
                </li>
                <li className="mr-15 cu-p">
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/favoriteHeader.svg" alt="Favorite"/>
                    </Link>
                </li>
                <li>
                    <Link to="/user">
                        <img width={18} height={18} src="/img/user.svg" alt=""/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
