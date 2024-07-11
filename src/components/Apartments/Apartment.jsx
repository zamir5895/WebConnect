import { Flex, Paper, Stack } from '@mantine/core'
import React from 'react'
import ConnectLogo from '../ConnectLogo/ConnectLogo'
import { useNavigate } from 'react-router-dom'

const currency = (tipo) => {
    if (tipo === 'DOLARES') {
        return '$'
    }
    else if (tipo === 'SOLES') {
        return 'S/'
    }
}

const Apartment = ({ id, moneda, precio, ubicacion }) => {
    const navigation = useNavigate();

    return (
        <Paper
            onClick={() => navigation(`/apartament/${id}`, { replace: true })}
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            className='logo w-full'
        >
            <Flex gap="md"  >
                <div id='ApartamentoImagen'>
                    <ConnectLogo />
                    {/* <image src={imagen} alt='imagen' /> */}
                </div>
                <Stack id='ApartamentoInfo' flex={1}>
                    <div>{currency(moneda)} {precio} </div>
                    <div>{ubicacion}</div>
                </Stack>
            </Flex>
        </Paper>
    );
}

export default Apartment;
