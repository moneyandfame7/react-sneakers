import React from 'react'
import Card from '../components/Card/Card'
import {IShopItem} from '../App'
import {v4 as uuidv4} from 'uuid'

interface IPropsFavorites {
    items: IShopItem[]
    onAddToFavorite: (obj: IShopItem) => void
}

const Favorites: React.FC<IPropsFavorites> = ({items, onAddToFavorite}) => {
    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мої закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {items.map((item) => {
                    return (<Card name={item.name} price={item.price} image={item.image} id={item.id} key={item.id}
                                  favorited={true}
                                  onFavorite={onAddToFavorite}/>)
                })}
            </div>
        </div>
    )
}

export default Favorites
