import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router-dom"
import Navbar from './Navbar';
import Store from '../Pages/Store';
import Cookbook from '../Pages/Cookbook';
import Kitchen from '../Pages/Kitchen';
import '../App.css';
import Login from './Login';
import Cart from '../Pages/Cart';
import Home from '../Pages/Home';
import { ChakraProvider, Flex, useMediaQuery } from '@chakra-ui/react'
import theme from '../theme'

function App() {
  const [user, setUser] = useState(null);
  const [recipeList, setRecipeList] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [cart, setCart] = useState([])
  const [pot, setPot] = useState([])
  const [pantries, setPantries] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)
  const [pinnedRecipe, setPinnedRecipe] = useState(null)
  const [pinnedIngredients, setPinnedIngredients] = useState(null)
  const [dishSold, setDishSold] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("/api/v1/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else{
        r.json().then((data) => console.log(data))
      }
    });

    // ALL Ingredients
    fetch('/api/v1/ingredients').then((r) => {
      if (r.ok) {
        r.json().then((data) => setIngredientList(data))
      } else{
        r.json().then((data) => console.log(data))
      }
    })

    // All Recipes
    fetch('/api/v1/recipes').then((r) => {
      if (r.ok) {
        r.json().then((data) => setRecipeList(data))
      } else{
        r.json().then((data) => console.log(data))
      }
    })
    
  }, []);


  function changePage(str){
    setSelectedPage(str)
  }

  function changePinnedRecipe(obj){
    setPinnedRecipe(obj)
  }

  
  


  function checkPantryItems(item){
    // console.log('pantry check ', item)
    let pantryCheck = pantries.filter((pantryItem)=> pantryItem.ingredient.id === item.id)
    // console.log('pantry check' , pantryCheck)
    if (pantryCheck.length === 0){

      let pantry = {
        ingredient_id: item.id,
        quantity: item.quantity
      }


      fetch('/api/v1/pantries', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({pantry}),
        }).then((r) => {
        if (r.ok) {
          r.json().then((data)=> console.log(data))
        } else {
          r.json().catch((data) => console.log(data))
        }
      });

    } if (pantryCheck.length === 1){

     let quantityUpdate = parseInt(pantryCheck[0].quantity) + parseInt(item.quantity)
     
     fetch(`/api/v1/pantries/${pantryCheck[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantityUpdate
      }),
      }).then((r) => {
      if (r.ok) {
        r.json().then((data)=> {
          let index
          let filteredPantry = pantries.filter((pantryItem, i) => {
            if (pantryItem.id === data.id){
              index = i
            }
           return pantryItem.id !== data.id
          })
          let updatedPantry = [...filteredPantry]
          updatedPantry.splice(index, 0, data)
          setPantries(updatedPantry)
        })
      } else {
        r.json().catch((data) => console.log(data))
      }
      });
    }
  }

  function addItemToCart(item){
    let cartCheck = cart.filter((cartItem)=> cartItem.id === item.id)
    if (cartCheck.length === 0){
      let newItem = {
        ...item,
      }
    let newCart = [...cart, newItem]
    setCart(newCart)
    } if (cartCheck.length === 1){
      let index = cart.findIndex((cartItem) => cartItem.id === item.id)
      let filteredCart = cart.filter((cartItem) => cartItem.id !== item.id)
      let updatedItem = {
        ...item,
        quantity: parseInt(item.quantity) + parseInt(cartCheck[0].quantity)
      }
      let updatedCart = [...filteredCart]
      updatedCart.splice(index, 0, updatedItem)
      setCart(updatedCart)
    }
  }

  function deleteItemFromCart(item){
    let newCart = cart.filter((inv) => inv.id !== item.id)
    setCart(newCart)
  }



  if (!user){

    return(
      <ChakraProvider theme={theme}>
        <Login onLogin={setUser} user={user} />
      </ChakraProvider>
    )
  } else {
    return (
      <ChakraProvider theme={theme}>
          <Navbar cart={cart} user={user} setUser={setUser} selectedPage={selectedPage}/>
          <Routes>
            <Route path='/shop' 
             element={
             <Store 
              ingredientList={ingredientList} 
              addItemToCart={addItemToCart} 
              changePage={changePage}/>
              }/>
            <Route path='/recipes' 
            element={
            <Cookbook 
             ingredientList={ingredientList} 
             recipeList={recipeList} 
             changePage={changePage} 
             changePinnedRecipe={changePinnedRecipe}/>
             }/>
            <Route path='/cart' 
            element={
            <Cart 
            user={user} 
            cart={cart} 
            setUser={setUser} 
            setCart={setCart} 
            deleteItemFromCart={deleteItemFromCart} 
            checkPantryItems={checkPantryItems} 
            changePage={changePage}/>}/>
            <Route path='/kitchen' 
            element={
            <Kitchen
            pot={pot}
            setPot={setPot}
            ingredientList={ingredientList}
            user={user} 
            setUser={setUser} 
            pantries={pantries} 
            setPantries={setPantries} 
            recipeList={recipeList} 
            changePage={changePage} 
            pinnedRecipe={pinnedRecipe}/>}/>
            <Route path='/'element={<Home recipeList={recipeList} ingredientList={ingredientList} changePage={changePage}/>}/>
          </Routes>
      </ChakraProvider>
    );
  }
}

export default App;
