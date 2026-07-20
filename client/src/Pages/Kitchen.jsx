import React, {useState, useEffect} from "react";
import {Stack, Flex, Text, Button, Image, useMediaQuery, Link, Grid, GridItem, AlertIcon, AlertTitle, Alert } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import Pantry from "../Components/Pantry";
import Dish from "../Components/Dish";
import Pot from "../Components/Pot";
import KitchenNav from "../Components/KitchenNav";
import PinnedRecipe from "../Components/PinnedRecipe";



function Kitchen({
     pantries, 
     recipeList, 
     setPantries, 
     user, 
     setUser, 
     changePage, 
     pinnedRecipe, 
     ingredientList, 
     pot, 
     setPot}){
    const [dishes, setDishes] = useState([])
    const [togDisplay, setTogDisplay] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [dishSuccess, setDishSuccess] = useState(false)
    const [dishFailure, setDishFailure] = useState(false)
    const [dishMade, setDishMade] = useState(null)
  

    const [isMobile] = useMediaQuery("(max-width: 768px)", {
        ssr: true,
        fallback: false,
    })

    useEffect(()=>{
        // Pantries from DB
        fetch('/api/v1/pantries').then((r) => {
            if (r.ok) {
            r.json().then((data) => setPantries(data))
            } else{
            r.json().then((data) => console.log(data))
            }
        })

        fetch('/api/v1/dishes').then((r) => {
            if (r.ok) {
            r.json().then((data) => setDishes(data))
            } else{
            r.json().then((data) => console.log(data))
            }
        })

        // changePage(window.location.href)
    }, [refetch])


    // const pantryDisplay = pantries.length > 0 ? pantries.map((item)=>{
    //    return <Pantry 
    //         key={item.ingredient.id}
    //         pot={pot} 
    //         item={item}
    //         removeFromPot={removeFromPot} 
    //         addItemToPot={addItemToPot}/>
    // }) : <p>Pantry empty.</p>

    // const potDisplay = pot.length > 0 ? pot.map((item) =>{
    //    return <Pot 
    //         item={item} 
    //         pot={pot} 
    //         startCookingProcess={startCookingProcess}/>
    // }) : null

    // const dishDisplay = dishes.length > 0 ? dishes.map((item)=> {
    //    return <Dish 
    //         item={item} 
    //         sellRecipe={sellRecipe} 
    //         user={user} 
    //         setUser={setUser}/>
    // }) : <p>Dishes empty.</p>


    // const pinnedRecipeDisplay = pinnedRecipe ? 
    // <div id='pinned-recipe-cont'>
    //     <p id='pinned-title'>{pinnedRecipe.name}</p>
    //    {pinnedRecipe.ingredient1 !== null ? <li>{pinnedRecipe.ingredient1}</li> : null}
    //    {pinnedRecipe.ingredient2 !== null ? <li>{pinnedRecipe.ingredient2}</li> : null}
    //    {pinnedRecipe.ingredient3 !== null ? <li>{pinnedRecipe.ingredient3}</li> : null}
    //    {pinnedRecipe.ingredient4 !== null ? <li>{pinnedRecipe.ingredient4}</li> : null}
    //    {pinnedRecipe.ingredient5 !== null ? <li>{pinnedRecipe.ingredient5}</li> : null}
    // </div> 
    // : 
    // <div id='pinned-recipe-cont'>
    //     <p id='pinned-title'>Pinned Recipe</p>
    //     <li>no recipe pinned</li>
    // </div>

    function addItemToPot(item, num){
        if (pot.length < 5){
            let quantityUpdate = num - 1
            fetch(`/api/v1/pantries/${item.id}`, {
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
                      let found = pantries.find((ing)=> ing.ingredient.id === data.ingredient.id)
                      let foundIndex = pantries.indexOf(found)
                      let newPantry = pantries
                      newPantry.splice(foundIndex, 1, data)
                      setPantries(newPantry)
                  })
                } else {
                  r.json().catch((data) => console.log(data))
                }
              });
            let newPot = [...pot, item]
            setPot(newPot)
            
        } 
    }

    function removeFromPot(item, num){
       
        let found = pot.find((ing)=> ing.ingredient.id === item.ingredient.id)
        let foundIndex = pot.indexOf(found)
        
        pot.splice(foundIndex, 1)
        let quantityUpdate = num + 1
            fetch(`/api/v1/pantries/${item.id}`, {
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
                        let found = pantries.find((ing)=> ing.ingredient.id === data.ingredient.id)
                        let foundIndex = pantries.indexOf(found)
                        let newPantry = pantries
                        newPantry.splice(foundIndex, 1, data)
                        setPantries(newPantry)
                  })
                } else {
                  r.json().catch((data) => console.log(data))
                }
              });
        let newPot = [...pot]
        setPot(newPot)
    }

    
    function startCookingProcess(){
        if (pot.length === 0){
            alert('You must add ingredients to the pot before cooking.')
        }
        else{

        
        let foundRecipe
        let recipeIngredientList = recipeList.map((recipe)=>{
            return {
                id: recipe.id,
                ingredients: [recipe.ingredient1, recipe.ingredient2, recipe.ingredient3, recipe.ingredient4, recipe.ingredient5],
            }
        })
        let formula = []
        let potIngredients = pot.map((item)=> item.ingredient.name)
        potIngredients.forEach((str)=>{
            // console.log(str)
            let checkX2 = str + ' x2'
            let checkX3 = str + ' x3'
            let checkX4 = str + ' x4'
            if (!formula.includes(str) && !formula.includes(checkX2) && !formula.includes(checkX3) && !formula.includes(checkX4)){
                return formula.push(str)
                
            }
            if (formula.includes(str)){
                let newStr = str + ' x2'
                return formula.splice(formula.indexOf(str), 1, newStr)
             
            }
            
            if (formula.includes(checkX2)){
                let newStr = str + ' x3'
                return formula.splice(formula.indexOf(checkX2), 1, newStr)
            }

            if (formula.includes(checkX3)){
                let newStr = str + ' x4'
                return formula.splice(formula.indexOf(checkX3), 1, newStr)
            }
            
            if (formula.includes(checkX4)){
                let newStr = str + ' x5'
                return formula.splice(formula.indexOf(checkX4), 1, newStr)
            }
        })

        if (formula.length < 5){
            let formulaFiller = 5 - formula.length
            for (let i=0; i< formulaFiller; i++){
                formula.push(null)
            }
        }

        // console.log(formula)

        recipeIngredientList.map((recipe)=> {
            if (recipe.ingredients.includes(formula[0]) && formula.includes(recipe.ingredients[0])){ 
                console.log("first layer", recipe)
                if(recipe.ingredients.includes(formula[1]) && formula.includes(recipe.ingredients[1])){
                    console.log("second layer", recipe)
                    if(recipe.ingredients.includes(formula[2]) && formula.includes(recipe.ingredients[2])){
                        console.log("third layer", recipe)
                        if(recipe.ingredients.includes(formula[3]) && formula.includes(recipe.ingredients[3])){
                            console.log("last layer", recipe)
                            if(recipe.ingredients.includes(formula[4]) && formula.includes(recipe.ingredients[4])){
                                console.log("end result", recipe)
                                foundRecipe = recipe
                                console.log(foundRecipe)
                            }
                        }
                    }
                }
            } 
        })
        if (foundRecipe !== undefined){
            let targetedRecipe = recipeList.find((recipe)=> recipe.id === foundRecipe.id)
            setDishSuccess(true)
            setDishMade(targetedRecipe)
            let dish = {
                recipe_id: foundRecipe.id,
                quantity: 1
            }
            fetch('/api/v1/dishes', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({dish}),
                }).then((r) => {
                if (r.ok) {
                  r.json().then((data)=> {
                    let newDishArr = [...dishes, data]
                    setDishes(newDishArr)
                  })
                } else {
                  r.json().catch((data) => console.log(data))
                }
              });
              let newPantry = [...pantries]
              newPantry.map((pantryItem)=>{
                  if(pantryItem.quantity === 0){
                    fetch(`/api/v1/pantries/${pantryItem.id}`, {
                        method: 'DELETE',
                      })
                      .then((res) => {
                        if (res.ok) {
                          console.log("file deleted")
                        } else {
                          res.json().then((data)=> console.log(data))
                        }
                      })
                  }
                newPantry.filter((pantryItem) => pantryItem.quantity > 0)
                setPantries(newPantry)
              })
            setRefetch(!refetch)
            setPot([])
            setTimeout(() => {
              setDishSuccess(false)
              setDishMade(null)
            },1500)
            
        } else {
            setDishFailure(true)
            // alert('That recipe does not exist! Please refer to the Cookbook for a list of viable recipes.')
            let newPantry = [...pantries]
              newPantry.map((pantryItem)=>{
                  if(pantryItem.quantity === 0){
                    fetch(`/api/v1/pantries/${pantryItem.id}`, {
                        method: 'DELETE',
                      })
                      .then((res) => {
                        if (res.ok) {
                          console.log("file deleted")
                        } else {
                          res.json().then((data)=> console.log(data))
                        }
                      })
                  }
                newPantry.filter((pantryItem) => pantryItem.quantity > 0)
                setPantries(newPantry)
            })
            setRefetch(!refetch)
            setPot([])
            setTimeout(() => {
              setDishFailure(false)
            }, 1500)
        }
    }
            
    }

    function sellRecipe(item){
        let found = dishes.find((dish)=> dish.id === item.id)
        let foundIndex = dishes.indexOf(found)
        dishes.splice(foundIndex, 1)
        let newDishArr = [...dishes]
        setDishes(newDishArr)
        fetch(`/api/v1/dishes/${item.id}`, {
            method: 'DELETE',
          })
          .then((res) => {
            if (res.ok) {
              console.log("file deleted")
            } else {
              res.json().then((data)=> console.log(data))
            }
          })
    }

    function handlePantryOrDish(){
        setTogDisplay(!togDisplay)
    }

    // let pantryButtonDisplay = pantryIsShown ? 
    //     <button id='tog-pantry' onClick={handlePantryDisplay}
    //     style={{backgroundColor: 'gainsboro'}}
    //     onMouseEnter={()=> setPantryIsShown(true)}
    //     onMouseLeave={()=> setPantryIsShown(false)}>
    //         Pantry
    //     </button> : 
    //     <button id='tog-pantry' onClick={handlePantryDisplay}
    //     onMouseEnter={()=> setPantryIsShown(true)}
    //     onMouseLeave={()=> setPantryIsShown(false)}>
    //         Pantry
    //     </button>

        // let dishButtonDisplay = dishIsShown ? 
        //     <button id='tog-dishes' onClick={handleDishDisplay}
        //     style={{backgroundColor: 'gainsboro'}}
        //     onMouseEnter={()=> setDishIsShown(true)}
        //     onMouseLeave={()=> setDishIsShown(false)}>
        //         Dish
        //     </button> : 
        //     <button id='tog-dishes' onClick={handleDishDisplay}
        //     onMouseEnter={()=> setDishIsShown(true)}
        //     onMouseLeave={()=> setDishIsShown(false)}>
        //         Dish
        //     </button>


    // return <div id='page-background'>
    //     <div className="comp-cont-1">
    //         <div id='tog-cont'>
    //             {pantryButtonDisplay}
    //             {dishButtonDisplay}
                
    //         </div>
            
    //         {togDisplay ? 
    //         <div id='home-dish-block'>
    //             <div id='dish-items-cont'>
    //                 {dishDisplay}
    //             </div>
    //         </div> : 
    //         <div id='home-ing-block'>
    //                 <div id='pantry-items-cont'>
    //                     {pantryDisplay}
    //                 </div>
    //         </div>}
                
    //         <div id='pinned-recipe-kitchen'>
    //             {pinnedRecipeDisplay}
    //         </div>

    //         <img id='pinned-recipe-background' src={parchV}/>

    //         <div id='home-pot-block'>
    //             <div id='pot-items-cont'>
    //                 {potDisplay}
    //                 {cookIsShown ? 
    //                 <button id='start-cooking' onClick={startCookingProcess}
    //                 style={{backgroundColor: 'gainsboro'}}
    //                 onMouseEnter={()=> setCookIsShown(true)}
    //                 onMouseLeave={()=> setCookIsShown(false)}>
    //                     Cook!
    //                 </button> : 
    //                 <button id='start-cooking' onClick={startCookingProcess}
    //                 onMouseEnter={()=> setCookIsShown(true)}
    //                 onMouseLeave={()=> setCookIsShown(false)}>
    //                     Cook!
    //                 </button>}
    //                 <img id='pot-img' src={potBackground}/>
    //             </div>
    //         </div>
    //     </div>
    //     <img id='login-signup-background' src={greyBackground} />
    // </div>  

    return (
        <Stack 
         flexDir={'row'}
         backgroundColor={'#20606F'} 
         color={'white'} 
         mt={isMobile ? '55px':'70px'} 
         maxW={'100vw'}
         minH={'92vh'}>
            <KitchenNav 
             togDisplay={togDisplay} 
             handlePantryOrDish={handlePantryOrDish} 
             pantries={pantries}
             dishes={dishes}
             pot={pot}
             addItemToPot={addItemToPot}
             removeFromPot={removeFromPot}
             sellRecipe={sellRecipe}
             user={user}
             setUser={setUser}/>
            <Flex
             p={2}
             mt={isMobile ? '170px': '0px'}
             maxH={'80vh'}
             justifyContent={isMobile ? 'center':'space-around'}
             w={isMobile ? '100vw' : '75vw'}
             ml={isMobile ? '-8px':'35vw'}>
            {dishSuccess && dishMade? 
            <Alert 
             maxW={isMobile ? '100vw':'60vw'} 
             status='success' 
             color={'black'} 
             position={'fixed'} 
             top={isMobile ? '37vh': '12vh'}>
            <AlertIcon/>
            <AlertTitle>
              {`You made ${dishMade.name}!`}
              </AlertTitle>
          </Alert>
          :null}
          {dishFailure ? 
            <Alert 
             maxW={isMobile ? '100vw':'60vw'} 
             status='error' color={'black'} 
             position={'fixed'} 
             top={isMobile ? '37vh': '12vh'}>
            <AlertIcon/>
            <AlertTitle>
              {'That recipe does not exist! Please refer to the Cookbook for a list of viable recipes.'}
              </AlertTitle>
          </Alert>
          :null}
                <Flex mt={'20px'} flexDir={'column'} gap={10} alignItems={'center'}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                    <PinnedRecipe pinnedRecipe={pinnedRecipe} ingredientList={ingredientList}/>
                  </motion.div>
                   <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                   <Button
                    position={'fixed'}
                    bottom={isMobile ? '10vh':'30vh'}
                    isDisabled={pot.length < 1}
                    onClick={() => startCookingProcess()}>
                        Cook
                    </Button>
                   </motion.div>
                   
                </Flex>
                <Flex mt={'50px'}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                    <Pot pot={pot}/>
                  </motion.div>
                    
                </Flex>
            </Flex>
        </Stack>
    )
}

export default Kitchen