import cx from 'clsx';
import { useState, useEffect } from 'react';
import {
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconSwitchHorizontal,
    IconChevronDown,
    IconHome,
    IconLogin,
    IconRegistered,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import { getCurrentUser } from '../../services/api'; 
import { useNavigate } from 'react-router-dom';


const tabs = [
    'Home',
    'Apartments',
    'Support',
];

const HeaderTabs = () => {
    const navigation = useNavigate();
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
                if (token) {
                    const data = await getCurrentUser(token);
                    setUserProfile(data);
                    console.log(data);
                }
            } catch (error) {
                console.error("Error al obtener la información del usuario", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
    };

    const isLoggedIn = !!localStorage.getItem('token'); // Verifica si el token está presente

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group gap={7}>
                        <Avatar
                            src={userProfile?.fotoPerfil || 'https://img.freepik.com/vector-gratis/hombre-diciendo-que-no-hay-ilustracion-concepto_114360-15962.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1718323200&semt=ais_user'}
                            alt={userProfile?.userName }
                            radius="xl"
                            size={30}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {userProfile?.userName || 'Usuario'}
                            
                        </Text>
                        <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={
                        <IconHome
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.red[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Home
                </Menu.Item>
                <Menu.Item
                    onClick={() => navigation('/searchApartment')}
                    leftSection={
                        <IconStar
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.yellow[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Apartments
                </Menu.Item>
                {isLoggedIn && (
                    <Menu.Item
                        onClick={handleLogout}
                        leftSection={
                            <IconLogout
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        }
                    >
                        LogOut
                    </Menu.Item>
                )}
               
               <Menu.Item
                onClick={() => navigation('/Mi perfil')}
                    leftSection={
                        <IconMessage
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Mi perfil
                </Menu.Item>
                
                <Menu.Label>Settings</Menu.Label>
                {isLoggedIn && (
                    <Menu.Item
                        leftSection={
                            <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        }
                    >
                        Account settings
                    </Menu.Item>
                )}
                {isLoggedIn && (
                    <Menu.Item
                        color="red"
                        leftSection={<IconHeart style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    >
                        Delete account
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export default HeaderTabs;
