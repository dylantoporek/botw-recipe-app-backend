import React from "react";
import {Stack, Flex, Text, Button, Image, useMediaQuery, Link, Grid, GridItem, AlertIcon, AlertTitle, Alert, Switch } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import Pantry from './Pantry';
import Dish from './Dish';

export default function KitchenNav({togDisplay, handlePantryOrDish, pantries, pot, addItemToPot, removeFromPot, dishes, user, setUser, sellRecipe}) {
    const [isMobile] = useMediaQuery("(max-width: 768px)", {
        ssr: true,
        fallback: false,
    })

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      };

    const variants = {
        slideLeft: { 
          x: 0,
          transition: {
            duration: .2
          }
       },
        slideRight: {  
          x: 42,
          transition: {
            duration: .2
          }
         }, 
    }

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}> 
            <Stack
             minH={isMobile ? '10vh':'90vh'}
             position={'fixed'}
             minW={isMobile ? '100vw':'300px'}
             maxH={isMobile ? '27vh' : '90vh'}
             mt={isMobile ? 1:0}
             zIndex={1}
             p={0}
             backgroundColor={'white'}
             color={'black'}
             boxShadow={'0px 1px 2px 2px rgba(54,54,54,.2)'}>
                {/* panty / dish switch */}
                <Flex flexDir={'column'} mt={2}>
                <Text 
                 fontWeight={'bold'} 
                 alignSelf={'center'} 
                 mb={1}>
                    {togDisplay ? 'Dishes' : 'Pantry'}
                </Text>
                <Flex
                 mb={isMobile ? 0:5}
                 cursor={'pointer'}
                 alignSelf={'center'}
                 w={'70px'}
                 onClick={() => handlePantryOrDish()} 
                 backgroundColor={togDisplay ? 'lightblue' : 'lightgreen'} 
                 borderRadius={'1em'} 
                 p={1}>
                    <motion.div
                     initial={false}
                     animate={togDisplay ? 'slideRight' : 'slideLeft'}
                     variants={variants}
                     style={{
                        backgroundColor: 'white',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        transition: 'all ease-in'
                     }}
                     transition={spring} />
                </Flex>
                </Flex>
                
                {/* !togDisplay for Pantry Items, togDisplay for Dishes */}
                {!togDisplay ? 
                <Flex
                 p={2}
                 flexDir={isMobile ? 'row':'column'} 
                 maxH={isMobile ? '16vh':'76vh'}
                 alignItems={'center'}
                 justifyContent={isMobile ? 'center' : 'flex-start'}
                 flexWrap={isMobile ? 'wrap' : 'nowrap'}
                 overflowY={'scroll'}
                 gap={isMobile ? 5:3}>
                    {pantries.length > 0 ? pantries.map((pantryItem) => {
                        return <Pantry key={pantryItem.id} item={pantryItem} pot={pot} addItemToPot={addItemToPot} removeFromPot={removeFromPot}/>
                    }) : 
                    <Flex>
                        <Text>Empty</Text>
                    </Flex>}
                </Flex>
                :
                <Flex
                 p={2}
                 flexDir={isMobile ? 'row':'column'} 
                 maxH={isMobile ? '16vh':'76vh'}
                 alignItems={'center'}
                 justifyContent={isMobile ? 'center' : 'flex-start'}
                 flexWrap={isMobile ? 'wrap' : 'nowrap'}
                 overflowY={'scroll'}
                 gap={isMobile ? 5:3}>
                    {dishes.length > 0 ? dishes.map((dishItem) => {
                        return <Dish key={dishItem.id} item={dishItem} user={user} setUser={setUser} sellRecipe={sellRecipe}/>
                    }):
                    <Flex>
                        <Text>Empty</Text>
                    </Flex>}
                </Flex>}
            </Stack>
        </motion.div>
    )
}