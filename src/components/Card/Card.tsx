import styles from './Card.module.scss'
import BtnAdd from '../buttons/Add'
import React, {useState} from 'react'
import BtnAdded from '../buttons/Added'
import {IShopItem} from '../../App'
import ContentLoader from 'react-content-loader'

export interface ICardProps {
    name: string
    price: number
    image: string
    onFavorite?: (obj: IShopItem) => void
    onPlus?: (obj: IShopItem) => void
    id: string
    favorited?: boolean
    added?: boolean
    loading?: boolean
}

const Card: React.FC<ICardProps> = ({
                                        id,
                                        name,
                                        price,
                                        image,
                                        loading = false,
                                        onFavorite,
                                        onPlus,
                                        favorited = false,
                                        added = false
                                    }) => {
    const [isAdded, setAdded] = useState(added)
    const [isFavorite, setFavorite] = useState(favorited)
    const onClickPlus = (): void => {
        onPlus && onPlus({name, price, image, id})
        isAdded ? setAdded(false) : setAdded(true)
    }
    const onClickFavorite = (): void => {
        onFavorite && onFavorite({name, price, image, id})
        setFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                        speed={2}
                        width={155}
                        height={265}
                        viewBox="0 0 150 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="1" y="0" rx="10" ry="10" width="155 " height="155"/>
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader>
                    :
                    <>
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
                            {!isAdded && <BtnAdd handlerButton={onClickPlus}/> ||
                                <BtnAdded handlerButton={onClickPlus}/>}
                        </div>
                    </>

            }
        </div>
    )
}

export default Card

