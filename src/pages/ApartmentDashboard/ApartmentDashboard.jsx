import React, { useEffect, useReducer, useState } from 'react'
import { SearchApartmentFilters } from '../../components/Apartments/SearchApartmentFilters/SearchApartmentFilters'
import Apartment from '../../components/Apartments/Apartment'
import { getApartmentsPosts, getAllApartmentsPosts } from '../../services/api'
import { Button } from '@mantine/core'

const reducer = (state, action) => {
    switch (action.type) {
        case 'moneda':
            return { ...state, moneda: action.payload }
        case 'minPrecio':
            return { ...state, minPrecio: action.payload }
        case 'maxPrecio':
            return { ...state, maxPrecio: action.payload }
        case 'maxDistancia':
            return { ...state, maxDistancia: action.payload }
        default:
            return state
    }
}

const ApartmentDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const { triggerServerError } = useError();

    const filtersIniciales = {
        moneda: "SOLES",
        minPrecio: 1000,
        maxPrecio: 1500,
        maxDistancia: 50
    }

    const [currentFilters, dispatch] = useReducer(reducer, filtersIniciales)

    const fetchApartments = async () => {
        try {
            const apartment = await getApartmentsPosts(currentPage, currentFilters.maxDistancia, currentFilters.maxPrecio, currentFilters.minPrecio, currentFilters.moneda);
            setPosts(prevPosts => [...apartment]);
            setCurrentPage(currentPage + 1);
        } catch (error) {
            triggerServerError();
        }
    };

    const fetchAllApartments = async () => {
        try {
            const apartment = await getAllApartmentsPosts(currentPage);
            setPosts(prevPosts => [...apartment]);
            setCurrentPage(currentPage + 1);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, []);

    return (
        <>
            <MapPage />
            <div className='flex flex-col md:flex-row md:h-83vh md-overflow-auto' style={{ height: '83vh', overflow: 'auto' }}>
                <div className="m-5 md:sticky md:top-0 md:z-50 w-1/4 ml-10">
                    <SearchApartmentFilters dispatch={dispatch} />
                </div>
                <div className="grow flex flex-wrap justify-center gap-5 p-5 mr-20">
                    <div>
                        {posts.map((apartment, index) => {
                            return (
                                <Apartment
                                    key={index}
                                    id={apartment.id}
                                    moneda={apartment.moneda}
                                    precio={apartment.precio}
                                    ubicacion={apartment.ubicacion}
                                    calificacion={apartment.descripcion}
                                />
                            )
                        })}
                        <Button className="m-20" onClick={fetchApartments}>Load More</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApartmentDashboard