import React from "react";
import {Stack, Flex, Text, Button, Image, useMediaQuery, Link, Grid, GridItem, AlertIcon, AlertTitle, Alert } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import chef from '../Images/pot.png'

function Pot({pot}){
    const [isMobile] = useMediaQuery("(max-width: 768px)", {
        ssr: true,
        fallback: false,
    })

    return (
        <Stack justifyContent={'center'}>
            <Flex>
                <Image 
                w={isMobile ? '250px':'400px'} 
                h={isMobile ? '300px':'400px'} 
                src={chef}/>
            </Flex>
            <Flex
             justifyContent={isMobile ? 'space-around':'center'}
             gap={isMobile ? '1px' : '5px'}
             flexWrap={'wrap'}
             maxW={isMobile ? '100px' : '130px'}
             left={isMobile ? '50px' : '120px'}
             position={'relative'}
             top={isMobile ? '-110px' : '-140px'}>
                {pot.map((item) => {
                    return (
                        <motion.div 
                         initial={{opacity: 0}}
                         animate={{opacity: 1}}>
                            <Image 
                            p={1}
                            borderRadius={'50%'}
                            bgColor={'rgba(255, 255, 255, .8)'}
                            w={isMobile ? '25px': '30px'} 
                            h={isMobile ? '25px': '30px'} 
                            src={item.ingredient.image}/>
                        </motion.div>
                        
                    )
                })}
            </Flex>
        </Stack>
    )
}

export default Pot