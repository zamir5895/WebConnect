import React, { useState } from 'react';
import { TbSocial } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/api';
import ConnectLogo from '../../components/ConnectLogo/ConnectLogo';
import TextInput from '../../components/TextInput/TextInput';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
    });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async data => {
        try {
            const response = await loginUser({
                email: data.email,
                password: data.password
            });

            if (response.token) {
                localStorage.setItem('token', response.token);
                console.log('Inicio de sesión exitoso', response);
                navigate('/home');
            } else {
                console.log('Error en el inicio de sesión: token no recibido');
            }
        } catch (error) {
            console.error('Error al enviar el formulario', error);
        }
    };

    return (
        <div className='bg-[#e2e2e2] w-full h-[100vh] flex items-center justify-center p-6'>
            <div className='w-full max-w-3xl h-fit lg:h-full flex bg-[#c6c6c9] rounded-xl overflow-hidden shadow-xl'>
                <div className='w-full h-full flex flex-col justify-center items-center p-8'>
                    <div className='w-full flex gap-2 items-center mb-10 justify-center'>
                        <div className='p-2 bg-[#c3c9d1] rounded text-white'>
                            <ConnectLogo className='text-lg' />
                        </div>
                        <span className='text-7xl italic text-[#16191f] font-semibold transition duration-300 ease-in-out hover:text-blue-500 hover:brightness-125'>
                        </span>
                    </div>
                    <p className='text-2x1 sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-ascent-5 text-center font-semibold transition duration-300 ease-in-out hover:text-blue-400 hover:underline'>
                        Inicia sesión en tu cuenta
                    </p>
                    <span className='text-lg sm:text-xl md:text-2xl mt-2 text-ascent-2 font-light transition duration-300 ease-in-out hover:text-blue-400 hover:italic'>
                        ¡Bienvenido de nuevo!
                    </span>
                    <form className='py-8 flex flex-col gap-5 w-full' onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            name="email"
                            placeholder="email@example.com"
                            label="Correo Electrónico"
                            type="email"
                            register={register("email", {
                                required: "El correo electrónico es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo electrónico no válido"
                                }
                            })}
                            styles="w-full rounded-full"
                            labelStyle="ml-2"
                            error={errors.email ? errors.email.message : ""}
                        />
                        <TextInput
                            name="password"
                            placeholder="Contraseña"
                            label="Contraseña"
                            type={showPassword ? "text" : "password"}
                            register={register("password", {
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña es muy corta"
                                }
                            })}
                            styles="w-full rounded-full"
                            labelStyle="ml-2"
                            error={errors.password ? errors.password.message : ""}
                        >
                            <div
                                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </TextInput>
                        <Link
                            to="/reset-password"
                            className='text-sm text-right text-[#0b092b] font-semibold w-full'
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                        >
                            Volver atrás
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;