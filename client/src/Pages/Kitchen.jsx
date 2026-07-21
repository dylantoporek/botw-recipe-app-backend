import React, {useState, useEffect} from "react";
import { Box, Grid, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import Pot from "../Components/Pot";
import KitchenNav from "../Components/KitchenNav";
import PinnedRecipe from "../Components/PinnedRecipe";
import { PageHeader } from "../Components/UI";
import { playSuccessSound, playFailureSound } from "../sounds";


function Kitchen({
     pantries,
     recipeList,
     setPantries,
     user,
     setUser,
     changePage,
     pinnedRecipe,
     changePinnedRecipe,
     ingredientList,
     pot,
     setPot}){
    const [dishes, setDishes] = useState([])
    const [togDisplay, setTogDisplay] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [dishSuccess, setDishSuccess] = useState(false)
    const [dishFailure, setDishFailure] = useState(false)
    const [dishMade, setDishMade] = useState(null)

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
    }, [refetch])


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
                      // Replace the row immutably so React re-renders with
                      // the server-confirmed quantity.
                      setPantries((current) =>
                        current.map((row) => (row.id === data.id ? data : row))
                      )
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
                        setPantries((current) =>
                          current.map((row) => (row.id === data.id ? data : row))
                        )
                  })
                } else {
                  r.json().catch((data) => console.log(data))
                }
              });
        let newPot = [...pot]
        setPot(newPot)
    }

    // Delete used-up pantry rows on the server, then refetch only after the
    // deletes finish (refetching sooner would resurrect the rows), while
    // hiding them locally right away.
    function cleanUpEmptyPantryRows(){
        const emptyRows = pantries.filter((pantryItem) => pantryItem.quantity === 0)
        setPantries((current) => current.filter((pantryItem) => pantryItem.quantity > 0))
        Promise.all(
            emptyRows.map((pantryItem) =>
                fetch(`/api/v1/pantries/${pantryItem.id}`, { method: 'DELETE' })
            )
        ).then(() => setRefetch((current) => !current))
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

        recipeIngredientList.map((recipe)=> {
            if (recipe.ingredients.includes(formula[0]) && formula.includes(recipe.ingredients[0])){
                if(recipe.ingredients.includes(formula[1]) && formula.includes(recipe.ingredients[1])){
                    if(recipe.ingredients.includes(formula[2]) && formula.includes(recipe.ingredients[2])){
                        if(recipe.ingredients.includes(formula[3]) && formula.includes(recipe.ingredients[3])){
                            if(recipe.ingredients.includes(formula[4]) && formula.includes(recipe.ingredients[4])){
                                foundRecipe = recipe
                            }
                        }
                    }
                }
            }
        })
        if (foundRecipe !== undefined){
            let targetedRecipe = recipeList.find((recipe)=> recipe.id === foundRecipe.id)
            playSuccessSound()
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
            cleanUpEmptyPantryRows()
            setPot([])
            setTimeout(() => {
              setDishSuccess(false)
              setDishMade(null)
            }, 2500)

        } else {
            playFailureSound()
            setDishFailure(true)
            cleanUpEmptyPantryRows()
            setPot([])
            setTimeout(() => {
              setDishFailure(false)
            }, 2500)
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

    return (
        <Box pt={{ base: "56px", md: "68px" }} minH="100vh">
            {dishSuccess && dishMade ?
            <Alert status='success' position={'fixed'} top={0} zIndex={30}>
                <AlertIcon/>
                <AlertTitle>{`You made ${dishMade.name}!`}</AlertTitle>
            </Alert>
            : null}
            {dishFailure ?
            <Alert status='error' position={'fixed'} top={0} zIndex={30}>
                <AlertIcon/>
                <AlertTitle>{'That recipe does not exist! Please refer to the Recipes page for a list of viable recipes.'}</AlertTitle>
            </Alert>
            : null}

            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
                    <PageHeader
                     title="Kitchen"
                     subtitle="Add up to five pantry ingredients to the pot, cook them into a dish, then sell it for rupees."/>

                    <Grid
                     templateColumns={{ base: "1fr", lg: "340px 1fr 280px" }}
                     gap={6}
                     alignItems="start"
                     mt={2}>
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

                        <Box
                         bg="white"
                         border="1px solid"
                         borderColor="paper.300"
                         borderRadius="xl"
                         p={{ base: 4, md: 6 }}
                         textAlign="center">
                            <Pot pot={pot}/>
                            <Button
                             variant="accent"
                             size="lg"
                             mt={6}
                             mb={2}
                             minW="180px"
                             isDisabled={pot.length < 1}
                             onClick={() => startCookingProcess()}>
                                Cook
                            </Button>
                        </Box>

                        <PinnedRecipe
                         pinnedRecipe={pinnedRecipe}
                         ingredientList={ingredientList}
                         changePinnedRecipe={changePinnedRecipe}/>
                    </Grid>
                </Box>
            </motion.div>
        </Box>
    )
}

export default Kitchen
