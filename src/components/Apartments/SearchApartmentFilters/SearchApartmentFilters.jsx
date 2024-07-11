import { useState } from 'react';
import {
    IconCurrencyDollar,
    IconMoneybag,
    IconLocation
} from '@tabler/icons-react';
import { Paper, NativeSelect } from '@mantine/core';
import classes from './SearchApartmentFilters.module.css';
import { RangeSlider } from '@mantine/core';
import { Slider } from '@mantine/core';
import { Button } from '@mantine/core';


const data = [
    { label: 'Precio', icon: IconMoneybag },
    { label: 'Moneda', icon: IconCurrencyDollar },
    { label: 'Distancia', icon: IconLocation }
];

export function SearchApartmentFilters({ dispatch }) {
    const [active, setActive] = useState(null);

    const dropdowns = (label) => {
        if (label === 'Precio') return (
            <div className='mt-10'>
                <RangeSlider
                    defaultValue={[1000, 1500]}
                    onChangeEnd={(value) => {
                        dispatch({ type: 'minPrecio', payload: value[0] });
                        dispatch({ type: 'maxPrecio', payload: value[1] });
                    }}
                    min={0}
                    minRange={100}
                    max={5000}
                    step={10}
                    label={(value) => `S/${value}`}
                    labelAlwaysOn
                />
            </div>
        );
        else if (label === 'Moneda') return (
            <div className='my-5'>
                <NativeSelect
                    placeholder='SOLES, DOLARES'
                    onChange={(value) => {
                        dispatch({ type: 'moneda', payload: value });
                    }}
                    data={['SOLES', 'DOLARES']}
                />
            </div>
        );
        else if (label === 'Distancia') return (
            <div className='mt-7'>
                <Slider
                    defaultValue={50}
                    onChangeEnd={(value) => {
                        dispatch({ type: 'maxDistancia', payload: value });
                    }}
                    step={1}
                    min={0}
                    max={100}
                    label={(value) => `${value} km`}
                    labelAlwaysOn
                />
            </div>
        );

    }

    const filters = data.map((item) => (
        <>
            <div key={item.label}
                className=" rounded cursor-pointer"
                onClick={(event) => {
                    event.preventDefault();
                    setActive(item.label === active ? null : item.label);
                }}>

                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
            </div>
            <div>
                {active === item.label && (
                    <>
                        {dropdowns(item.label)}
                    </>
                )}
            </div>
        </>
    ));

    return (
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" >
            <div className='flex flex-col gap-5'>
                {filters}
            </div>
            <Button className='mt-5' variant="filled" color="blue" size="xl" fullWidth>Buscar</Button>
        </Paper>
    );
}