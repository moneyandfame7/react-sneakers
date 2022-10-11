import React from 'react'
import {IShopItem} from '../App'
import {v4 as uuidv4} from 'uuid'

interface ICartProps {
    onCloseCart: () => void
    items: Array<IShopItem>
    onRemove: (obj: IShopItem) => void
}

const CartDrawer: React.FC<ICartProps> = ({onCloseCart, items, onRemove}) => {
    const totalSum = () => {
        let sum = 0
        items.map(item => {
            sum += item.price
        })
        return sum
    }
    return (
        <div className="overlay"
             onClick={(event: any) => event.target.className !== 'overlay' ? null : onCloseCart()}>
            <div className="drawer">
                <div className="d-flex align-start justify-between">
                    <h2 className="mb-30">Кошик</h2>
                    <img className="removeBtn" src="/img/delete.svg" alt="Close" onClick={onCloseCart}/>
                </div>
                {
                    items.length > 0 ?
                        <>
                            <div className="items ">
                                {items.map((obj) => (
                                    <div className="cartItem d-flex align-center" key={uuidv4()}>
                                        <img className="cartItemImg" src={obj.image} alt="Sneakers"/>
                                        <div className="mr-20 pt-15 pb-15">
                                            <p className="mb-5">{obj.name}</p>
                                            <b>{obj.price} грн.</b>
                                        </div>
                                        <img
                                            onClick={() => onRemove(obj)}
                                            className="removeBtn"
                                            src="/img/delete.svg"
                                            alt="Remove"/>
                                    </div>
                                ))}</div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Всього: </span>
                                        <div></div>
                                        <b>{(totalSum() + (totalSum() * 0.05)).toLocaleString('ua')} грн.</b>
                                    </li>
                                    <li>
                                        <span>Податок 5%: </span>
                                        <div></div>
                                        <b>{(totalSum() * 0.05).toLocaleString('ua')} грн.</b>
                                    </li>
                                </ul>
                                <button className="greenButton">
                                    <div>
                                        <span>Оформити замовлення</span>
                                        <img width={14} height={14} src="/img/arrow.svg" alt=""/>
                                    </div>
                                </button>
                            </div>
                        </>
                        :
                        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img width={120} height={120} className="mb-20" src="/img/empty-cart.png" alt="Empty cart"/>
                            <h2>Кошик пустий</h2>
                            <p className="opacity-6">Додайте хоч одну пару кросівок, щоб зробити заказ</p>
                            <button className="greenButton" onClick={onCloseCart}>
                                <img src="/img/arrow.svg" alt="Arrow"/>
                                <span>Повернутись назад</span>
                            </button>
                        </div>

                }


            </div>
        </div>
    )
}

export default CartDrawer
