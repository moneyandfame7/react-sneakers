import styles from './Card.module.scss'
import BtnAdd from '../buttons/Add'
import React, {useState} from 'react'
import BtnAdded from '../buttons/Added'
import {IShopItem} from '../../App'

export interface ICardProps {
    name: string
    price: number
    image: string
    onFavorite?: (obj: IShopItem) => void
    onPlus?: (obj: IShopItem) => void
    id: string
    favorited?: boolean
}

const Card: React.FC<ICardProps> = ({id, name, price, image, onFavorite, onPlus, favorited = false}) => {
    const onClickPlus = (): void => {
        onPlus && onPlus({name, price, image, id})
        isAdded ? setAdded(false) : setAdded(true)
    }
    const onClickFavorite = (): void => {
        onFavorite && onFavorite({name, price, image, id})
        setFavorite(!isFavorite)
    }
    const [isAdded, setAdded] = useState(false)
    const [isFavorite, setFavorite] = useState(favorited)
    return (
        <div className={styles.card}>
            <img className={styles.favourite}
                 src={isFavorite ? '/img/favourite.svg' : '/img/unfavourite.svg'}
                 alt="Favourite"
                 onClick={onClickFavorite}
            />
            <img width={133} height={112} src={image} alt="Sneakers"/>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Ціна:</span>
                    <b>{price.toLocaleString('ua')} грн.</b>
                </div>

                {!isAdded && <BtnAdd handlerButton={onClickPlus}/> || <BtnAdded handlerButton={onClickPlus}/>}
            </div>
        </div>
    )
}

export default Card

