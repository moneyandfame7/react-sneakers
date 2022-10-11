import Card from '../components/Card/Card'
import {IShopItem} from '../App'
import React from 'react'
import {v4 as uuidv4} from 'uuid'
import {faker} from '@faker-js/faker'

interface IPropsHome {
    items: IShopItem[]
    searchValue: string
    setSearchValue: (value: string) => void
    onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    onAddToFavorite: (obj: IShopItem) => void
    onAddToCart: (obj: IShopItem) => void
    cartItems: IShopItem[]
    isLoading: boolean
}

const Home: React.FC<IPropsHome> = (
    {
        items,
        isLoading,
        cartItems,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToFavorite,
        onAddToCart
    }) => {

    const createThisFuckingFakeArrayWithFakeObj = (itemsLength: number = 10) => {
        const ITEMS: IShopItem[] = []
        function createRandomObject() {
            return {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                image: faker.image.imageUrl(),
                price: Number(faker.finance.amount())
            }
        }
        Array.from({length: 10}).forEach(() => {
            ITEMS.push(createRandomObject())
        })
        return ITEMS
    }
    const renderItems = () => {
        console.log(createThisFuckingFakeArrayWithFakeObj())
        const filtredItems = items.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()))
        return ((isLoading ? createThisFuckingFakeArrayWithFakeObj() : filtredItems).map((item) => {
            return (<Card key={item.id}
                          id={item.id}
                          name={item.name}
                          price={item.price}
                          image={item.image}
                          onPlus={onAddToCart}
                          onFavorite={onAddToFavorite}
                          added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
                          loading={isLoading}
            />)
        }))
    }
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
                {renderItems()}
            </div>

        </div>
    )
}

export default Home
