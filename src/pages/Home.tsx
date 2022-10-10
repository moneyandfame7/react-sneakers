import Card from '../components/Card/Card'
import {IShopItem} from '../App'
import React from 'react'

interface IPropsHome {
    items: IShopItem[]
    searchValue: string
    setSearchValue: (value: string) => void
    onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    onAddToFavorite: (obj: IShopItem) => void
    onAddToCart: (obj: IShopItem) => void
}

const Home: React.FC<IPropsHome> = (
    {
        items,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToFavorite,
        onAddToCart
    }) => {

    return (
        <div className="content p-40">

            <div className="d-flex justify-between align-center mb-40">
                {searchValue && <h1>Пошук по запиту: "{searchValue}"</h1> || <h1>Всі кросівки</h1>}
                <div className="search-block">
                    <img src="/img/search.svg" alt="Search"/>

                    {searchValue && (
                        <img className="clear removeBtn"
                             onClick={() => setSearchValue('')}
                             src="/img/delete.svg"
                             alt="Clear"/>)
                    }

                    <input onChange={onChangeSearchInput}
                           value={searchValue}
                           placeholder="Пошук..."/>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {items
                    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item) => {
                        return (<Card key={item.id}
                                      id={item.id}
                                      name={item.name}
                                      price={item.price}
                                      image={item.image}
                                      onPlus={onAddToCart}
                                      onFavorite={onAddToFavorite}
                        />)
                    })}
            </div>

        </div>
    )
}

export default Home
