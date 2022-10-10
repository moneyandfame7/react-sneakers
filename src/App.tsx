import React, {useEffect, useState} from 'react'
import './index.scss'
import Header from './components/Header/Header'
import CartDrawer from './components/CartDrawer'
import axios, {AxiosError} from 'axios'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

// TODO: переделать айдишники у всех объектов

export interface IShopItem {
    name: string
    price: number
    image: string
    id: string
}

const App: React.FC = () => {
    const [favorites, setFavorites] = useState<IShopItem[]>([])
    const [cartItems, setCartItems] = useState<IShopItem[]>([])
    const [cartOpened, setCartOpened] = useState<boolean>(false)
    const [items, setItems] = useState<IShopItem[]>([])
    const [searchValue, setSearchValue] = useState<string>('')

    //    todo: сделать на свиче использование хука
    useEffect(() => {
        axios.get('https://6338224f937ea77bfdbaf818.mockapi.io/items').then(res => {
            setItems(res.data)
        })
        axios.get('https://6338224f937ea77bfdbaf818.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        })
        axios.get('https://6338224f937ea77bfdbaf818.mockapi.io/favorites').then(res => {
            setFavorites(res.data)
        })

    }, [])

    const onAddToCart = (obj: IShopItem) => {
        console.log(obj)
        axios.post('https://6338224f937ea77bfdbaf818.mockapi.io/cart', obj)
        setCartItems(prevState => [...prevState, obj])

    }
    const onAddToFavorite = async (obj: IShopItem) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                await axios.delete(`https://6338224f937ea77bfdbaf818.mockapi.io/favorites/${obj.id}`)

                setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
            } else {
                const resp = await axios.post('https://6338224f937ea77bfdbaf818.mockapi.io/favorites', obj)
                setFavorites((prev) => [...prev, obj])
            }
        } catch (error) {
            alert('При додаванні в закладки виникла помилка.')
            console.log(error)
        }

    }
    const onRemoveItem = (obj: IShopItem) => {
        axios.delete(`https://6338224f937ea77bfdbaf818.mockapi.io/cart/${obj.id}`).then(() => {
            setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
        })
    }
    const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        console.log(searchValue)
    }
    return (
        <div className="wrapper clear">
            {cartOpened &&
                <CartDrawer
                    items={cartItems}
                    onCloseCart={() => setCartOpened(false)}
                    onRemove={onRemoveItem}/>
            }
            <Header onClickCart={() => setCartOpened(true)}/>

            <Routes>
                <Route path="/" element={
                    <Home items={items}
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                          onChangeSearchInput={onChangeSearchInput}
                          onAddToCart={onAddToCart}

                          onAddToFavorite={onAddToFavorite}/>
                }/>
                <Route path="/favorites" element={<Favorites items={favorites}
                                                             onAddToFavorite={onAddToFavorite}/>}/>
            </Routes>
        </div>
    )
}
export default App
