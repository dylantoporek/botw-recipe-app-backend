import React, {useState, useEffect, useRef} from "react";
import {Stack, Flex, Text, Button, Image, useMediaQuery} from '@chakra-ui/react'
import {motion} from 'framer-motion'

export default function FeaturedItemDisplay({targetedItem, variants, itemSwitch, isMobile}){
    return (
        <motion.div
            animate={itemSwitch ? 'open' : 'close'}
            variants={variants}>
                <Flex justifyContent={'center'} h={isMobile ? '70vh':'60vh'} borderRadius={'1em'}>
                    <Flex
                    p={5} 
                    flexDir={'column'} 
                    minH={'40vh'} 
                    w={isMobile ? '80vw' : '60vw'}
                    gap={5} 
                    alignItems={'center'} 
                    justifyContent={'center'}>
                        <Image  w={isMobile ? '100px':'120px'} h={isMobile ? '100px':'120px'} src={targetedItem?.image}/>
                        <Text mb={isMobile ? 5:2}>{targetedItem?.name}</Text>
                        <Text maxW={isMobile ? '100%':'80%'}>{targetedItem?.description}</Text>
                    </Flex>
                </Flex>
        </motion.div>
    )
}