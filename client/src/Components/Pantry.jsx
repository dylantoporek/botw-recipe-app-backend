import React, {useState} from "react";
import darkPantry from '../Images/darkPantry.png'
import {Stack, Flex, Text, Button, Image, useMediaQuery, Link, Grid, GridItem, AlertIcon, AlertTitle, Alert } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import {AddIcon, MinusIcon} from '@chakra-ui/icons'


function Pantry({item, pot, addItemToPot, removeFromPot}){
    const [quantity, setQuantity] = useState(item.quantity)
    const [addShow, setAddShow] = useState(false)
    const [minusShow, setMinusShow] = useState(false)
    const [isMobile] = useMediaQuery("(max-width: 768px)", {
        ssr: true,
        fallback: false,
    })
    

    function addToPot(){
        if (quantity > 0 && pot.length < 5){
            addItemToPot(item, quantity)
            let newQuantity = quantity - 1
            setQuantity(newQuantity)
        } if(quantity === 0){
            alert(`You are out of ${item.ingredient.name}. You can purchase more from the store.`)
        } if (pot.length === 5){
            alert('The pot can only hold 5 ingredients.')
        }
        
    }

    function handleRemoveFromPot(){
       let potCheck 
        potCheck = pot.find((ing)=> ing.id === item.id)
        
        if(potCheck !== undefined){
            removeFromPot(item, quantity)
            let newQuantity = quantity + 1
            setQuantity(newQuantity)
        } else {
            console.log(item)
            alert(`There is no ${item.ingredient.name} in the pot.`)
        }
        
    }
    
    // let itemDisplay
    // if(item.ingredient.name !== null){
    //     itemDisplay = <div id='pantry-item'>
    //             <p className="pantry-name">{item.ingredient.name}</p>
    //             <p className='pantry-quantity'>x{quantity}</p>

    //             {addShow ? 
    //             <button id='adder' onClick={addToPot}
    //                 style={{backgroundColor: 'gainsboro'}}
    //                 onMouseEnter={()=> setAddShow(true)}
    //                 onMouseLeave={()=> setAddShow(false)}>
    //                 +
    //             </button>
    //             :
    //             <button id='adder' onClick={addToPot}
    //                 onMouseEnter={()=> setAddShow(true)}
    //                 onMouseLeave={()=> setAddShow(false)}>
    //                 +
    //             </button>}
                
    //             {minusShow ? 
    //             <button id='minuser' onClick={handleRemoveFromPot}
    //                 style={{backgroundColor: 'gainsboro'}}
    //                 onMouseEnter={()=> setMinusShow(true)}
    //                 onMouseLeave={()=> setMinusShow(false)}>
    //                 -
    //             </button>
    //             :
    //             <button id='minuser' onClick={handleRemoveFromPot}
    //                 onMouseEnter={()=> setMinusShow(true)}
    //                 onMouseLeave={()=> setMinusShow(false)}>
    //                 -
    //             </button>}
                
    //             <img className="pantry-img" src={item.ingredient.image}/>
    //             <img className='pantry-background' src={darkPantry}/>
    //     </div>
    // }

    function disableRemoveFromPotButton (){
        let potCheck = pot.find((ing)=> ing.id === item.id)
        
        if(potCheck !== undefined){
            return false
        } else return true
    }

    return (
        <motion.div 
         initial={{opacity: 0}}
         animate={{opacity: 1}}>
            <Flex
            w={isMobile ? '150px': '200px'}
            h={isMobile ? '70px': '80px'}
            p={1}
            alignItems={'center'} 
            justifyContent={isMobile ? 'space-around' : 'space-between'}>
                <Flex>
                    <Button 
                     onClick={() => handleRemoveFromPot()}
                     size={isMobile ? 'xs' : 'sm'} 
                     isDisabled={disableRemoveFromPotButton()}
                     >
                        <MinusIcon boxSize={2}/>
                    </Button>
                </Flex>
                <Flex 
                 flexDir={'column'} 
                 alignItems={'center'} 
                 ml={isMobile ? 0:1} 
                 mr={isMobile ? 0:1}>
                    <Flex gap={isMobile ? 1:2}>
                        <Image 
                         w={isMobile ? '25px':'35px'} 
                         h={isMobile ? '25px':'35px'} 
                         src={item.ingredient.image}/>
                        <Flex
                         alignItems={'center'}
                         justifyContent={'center'}
                         w={isMobile? '20px':'30px'}
                         h={isMobile ? '20px':'30px'}
                         borderRadius={'50%'}
                         backgroundColor={'lightgrey'}
                         p={1}>
                            <Text fontWeight={'bold'} fontSize={isMobile ? 10:14}>
                                x{quantity}
                            </Text>
                        </Flex>
                    </Flex>

                    <Text fontSize={isMobile ? 12:14} mx={1} textAlign={'center'}>{item.ingredient.name}</Text>
                </Flex>
                <Flex>
                    <Button
                     onClick={() => addToPot()} 
                     size={isMobile ? 'xs' : 'sm'} 
                     isDisabled={quantity === 0}>
                        <AddIcon boxSize={2}/>
                    </Button>
                </Flex>
         </Flex>
        </motion.div>
    )
}

export default Pantry