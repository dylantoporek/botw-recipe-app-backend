import React, {useState} from "react";
import tabletop from '../Images/tabletop.png'
import rupee from '../Images/rupee.png'
import {Stack, Flex, Text, Button, Image, useMediaQuery, Link, Grid, GridItem, AlertIcon, AlertTitle, Alert } from '@chakra-ui/react'
import {motion} from 'framer-motion'

function Dish({item, sellRecipe, user, setUser}){
  const [isShown, setIsShown] = useState(false)
  const [isMobile] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false,
  })

  let priceRewrite = item.recipe.price
  if (priceRewrite === 0){
    priceRewrite = 25
  }

  function handleSellItem(){
    let newBankStatement = user.bank + priceRewrite
    sellRecipe(item)
    fetch(`/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bank: newBankStatement
      }),
    }).then((r) => {
    if (r.ok) {
      r.json().then((data)=> {
        setUser({
          ...user,
          bank: data.bank
        })
      })
    } else {
      r.json().catch((data) => console.log(data))
    }
    });
  }

  const rupeeDisplay = <img id='dish-rupee' src={rupee}/>

  let itemDisplay = <div id='dish'>
    <p id='dish-name'>{item.recipe.name}</p>
    <img id='dish-img' src={item.recipe.image}/>
    <p id='dish-value'>{rupeeDisplay} {priceRewrite}</p>
    
    {isShown ? 
    <button id='sell-dish' onClick={handleSellItem}
    style={{backgroundColor: 'gainsboro'}}
    onMouseEnter={()=> setIsShown(true)}
    onMouseLeave={()=> setIsShown(false)}>
      Sell
    </button>
    : 
    <button id='sell-dish' onClick={handleSellItem}
    onMouseEnter={()=> setIsShown(true)}
    onMouseLeave={()=> setIsShown(false)}>
      Sell
    </button>}
    <img id='dish-background' src={tabletop}/>
  </div>

console.log(item)
  return (
    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}>
      <Flex
       w={isMobile ? '150px': '200px'}
       h={isMobile ? '70px': '80px'}
       alignItems={'center'} 
       justifyContent={isMobile ? 'space-around' : 'space-between'}>
        <Flex p={1} gap={2}>
        <Image 
         alignSelf={'center'}
         w={isMobile ? '50px' : '70px'} 
         h={isMobile ? '50px': '70px'} 
         src={item.recipe.image}/>
          <Flex
           p={1} 
           minH={isMobile ? '80px': '80px'} 
           w={'130px'} 
           flexDir={'column'} 
           alignItems={'center'} 
           justifyContent={'space-between'}
           gap={1} 
           fontSize={isMobile ? 10:12}>
            <Text>{item.recipe.name}</Text>
            <Button maxW={'80px'} size={isMobile ? 'xs' : 'sm'} onClick={handleSellItem}>
              <Flex gap={1} alignItems={'center'}>
                <Text mr={1}>
                  Sell:
                </Text>
                <Image maxH={'15px'} src={rupee}/>
                <Text>{item.recipe.price}</Text>
              </Flex> 
            </Button>
          </Flex>
          
          
        </Flex>
      </Flex>
    </motion.div>
  ) 
}

export default Dish