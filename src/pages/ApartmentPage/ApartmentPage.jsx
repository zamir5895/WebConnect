import React, { useEffect, useState } from 'react';
import { Container, Grid, Image, Text, Title, Badge, Group, Paper, Button, List, ThemeIcon, Rating, Avatar } from '@mantine/core';
import { fetchPostInfoByApartmentId } from '../../services/api';
import Review from '../../components/Review/Review';
import { useNavigate, useParams } from 'react-router-dom';


const ApartmentPage = () => {
    const { id } = useParams(); //id de apartamento, no es de post
    const navigation = useNavigate();
    const [publicacionInfo, setPublicacionInfo] = useState(
        {
            "id": 0,
            "titulo": "",
            "descripcion": "",
            "alojamientoMultimedia": [
            ],
            "autorFullName": "",
            "autorPhotoUrl": "",
            "cantidadReviews": 0,
            "promedioRating": 0,
            "latitue": 0,
            "longitud": 0,
            "direccion": "",
            "ciudad": "",
            "pais": "",
            "fechaPublicacion": "",
            "reviews": [
            ],
            "price": 0,
            "tipoMoneda": ""
        });

    const [images, setImages] = useState([])
    const [reviews, setReviews] = useState([])

    const getApartmentPost = async (id) => {
        try {
            const apartment = await fetchPostInfoByApartmentId(id);
            setPublicacionInfo(apartment);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getApartmentPost(id);
        setImages(publicacionInfo.alojamientoMultimedia);
        setReviews(publicacionInfo.reviews);
    }, []);


    const handleClick = async () => {

    }
    console.log(publicacionInfo)
    return (
        <Container>
            <Title align="center" my="lg">{publicacionInfo.titulo}</Title>
            <Grid>
                <Grid.Col span={12} md={6}>
                    <Group>
                        {images.filter(image => image.tipo == 'VIDEO').map((image, index) => (
                            <>
                                <Image className='w-full'
                                    key={index}
                                    src={image.url_contenido}
                                    alt="Apartment Image"
                                    radius="md" />
                            </>
                        ))}
                    </Group>
                </Grid.Col >

                <Grid.Col span={12} md={6}>
                    <Paper shadow="sm" p="md" radius="md">
                        <Group className='my-4'>
                            <Avatar src={publicacionInfo.autorPhotoUrl}
                                alt='user' />
                            <Text size="lg" weight={500}>{publicacionInfo.autorFullName}</Text>
                            <Text size="lg" weight={500}>{publicacionInfo.ciudad}, {publicacionInfo.pais}</Text>
                            <Text size="lg" weight={500}>Desde el {publicacionInfo.fechaPublicacion.split('T')[0]}</Text>
                        </Group>
                        <Group>
                            <Badge color="teal" variant="filled">{publicacionInfo.tipoMoneda}</Badge>
                            <Badge color="teal" variant="filled">Rating {publicacionInfo.promedioRating.toFixed(1)}</Badge>
                            <Rating value={publicacionInfo.promedioRating} readOnly />
                            <Text size="sm" weight={500}>{publicacionInfo.cantidadReviews} Reviews</Text>
                            <Text size="xl" weight={700}> {publicacionInfo.tipoMoneda == "DOLARES" ? "$" : "S/"}{publicacionInfo.price.toFixed(2)} </Text>
                        </Group>
                        <Text size="lg" my="md">
                            {publicacionInfo.descripcion}
                        </Text>
                        <Button fullWidth mt="md" radius="md" onClick={handleClick}>
                            Contactarse ahora!!</Button>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Paper shadow="sm" p="md" mt="xl" radius="md">
                <Title order={2}>Reviews</Title>
                <Group direction="column" >
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <Review
                                key={index}
                                name={review.autorFullName}
                                imgurl={review.url}
                                date={review.datetime.split('T')[0]}
                                rating={review.calificacion}
                                text={review.contenido}
                            />
                        ))
                    ) : (
                        <Text>No Reviews Yet</Text>
                    )}
                </Group>
            </Paper>
        </Container>
    );
};



export default ApartmentPage;
