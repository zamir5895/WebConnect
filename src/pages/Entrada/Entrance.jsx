import { Grid } from '@mui/material';
import React from 'react';
import { Button, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Entrance = () => {
    const navigate = useNavigate(); 

    const handleSignUp = () => {
        navigate('/register'); 
    };

    const handleLogIn = () => {
        navigate('/login'); 
    };

    return (
        <div>
            <Grid container>
                <Grid className='h-screen overflow-hidden' item xs={7}>
                    <img className='h-full w-full'
                        src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png" alt='Social Media' />
                </Grid>
                <Grid item xs={5}>
                    <div className='px-20 flex flex-col justify-center h-full'>
                        <div className='card p-2'>
                            <Paper withBorder shadow="md" p={30} mt={30} radius="md" className='logo'>
                                <div className='flex flex-col items-center mb-5 space-y-1'>
                                    <h1 className='logo text-center text-8xl' style={{color: '#3431db'}}>
                                        Connect++
                                    </h1>
                                    <p className='text-center text-sm w-[70%]' style={{color: '#3431bd'}}>
                                        Conectando vidas, compartiendo historias
                                    </p>
                                </div>
                                <div className='flex flex-col items-center space-y-4'>
                                    <Button color="blue" variant="light" className='w-full' onClick={handleSignUp}>
                                        Registrarse
                                    </Button>
                                    <Button color="blue" variant="light" className='w-full' onClick={handleLogIn}>
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Entrance;
