import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import TextInput from '../../components/TextInput/TextInput';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/api'; 
import ConnectLogo from '../../components/ConnectLogo/ConnectLogo';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
    });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                userName: data.username, 
                primerNombre: data.firstName,
                segundoNombre: data.secondName,
                primerApellido: data.firstSurname,
                segundoApellido: data.secondSurname,
                edad: parseInt(data.age),
                email: data.email,
                password: data.password, 
                role: data.role === 'host' ? 'host' : 'traveler', 
                genero: data.gender === 'male' ? 'Masculino' : data.gender === 'female' ? 'Femenino' : 'Otro',
                ciudad: data.city,
                pais: data.country,
                telefono: data.phone
            };
            const response = await registerUser(formattedData);
            console.log('Registro exitoso:', response);
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return (
        <div className='bg-gradient-to-r from-gray-100 to-gray-300 w-full min-h-screen flex items-center justify-center p-6'>
            <div className='w-full max-w-3xl h-auto flex bg-white rounded-2xl shadow-2xl overflow-hidden'>
                <div className='w-full h-full flex flex-col justify-center items-center p-10'>
                    <div className='w-full flex gap-2 items-center mb-10 justify-center'>
                        <div className='p-4 bg-blue-100 rounded-full text-white shadow-md'>
                            <ConnectLogo className='text-2xl' />
                        </div>
                        <span className='text-5xl italic text-gray-800 font-semibold transition duration-300 ease-in-out hover:text-blue-500 hover:brightness-125'>
                            Connect++
                        </span>
                    </div>
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-700 text-center font-semibold transition duration-300 ease-in-out hover:text-blue-400 hover:underline'>
                        Regístrate en Connect++
                    </p>
                    <span className='text-lg sm:text-xl md:text-2xl mt-2 text-gray-600 font-light transition duration-300 ease-in-out hover:text-blue-400 hover:italic'>
                        ¡Bienvenido!
                    </span>
                    <form className='py-8 flex flex-col gap-6 w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <TextInput
                                name="firstName"
                                placeholder="Primer nombre"
                                label="Primer Nombre"
                                type="text"
                                register={register("firstName", {
                                    required: "El primer nombre es requerido",
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.firstName ? errors.firstName.message : ""}
                            />
                            <TextInput
                                name="secondName"
                                placeholder="Segundo nombre"
                                label="Segundo Nombre"
                                type="text"
                                register={register("secondName")}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.secondName ? errors.secondName.message : ""}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <TextInput
                                name="firstSurname"
                                placeholder="Primer apellido"
                                label="Primer Apellido"
                                type="text"
                                register={register("firstSurname", {
                                    required: "El primer apellido es requerido",
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.firstSurname ? errors.firstSurname.message : ""}
                            />
                            <TextInput
                                name="secondSurname"
                                placeholder="Segundo apellido"
                                label="Segundo Apellido"
                                type="text"
                                register={register("secondSurname")}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.secondSurname ? errors.secondSurname.message : ""}
                            />
                        </div>   
                        <div className='flex flex-col md:flex-row gap-6'>
                            <TextInput
                                name="age"
                                placeholder="Edad"
                                label="Edad"
                                type="number"
                                register={register("age", {
                                    required: "La edad es requerida",
                                    min: { value: 0, message: "Edad no válida" },
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.age ? errors.age.message : ""}
                            />
                            <TextInput
                                name="username"
                                placeholder="Nombre de usuario"
                                label="Nombre de Usuario"
                                type="text"
                                register={register("username", {
                                    required: "El nombre de usuario es requerido",
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.username ? errors.username.message : ""}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-6'>
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
                                styles="w-full rounded-lg border-gray-300"
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
                                styles="w-full rounded-lg border-gray-300"
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
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="host"
                                    {...register("role", { required: "El rol es requerido" })}
                                    className="form-radio"
                                />
                                <span className="ml-2">Host</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="traveler"
                                    {...register("role", { required: "El rol es requerido" })}
                                    className="form-radio"
                                />
                                <span className="ml-2">Traveler</span>
                            </label>
                        </div>
                        {errors.role && <p className="text-red-600">{errors.role.message}</p>}
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="male"
                                    {...register("gender", { required: "El género es requerido" })}
                                    className="form-radio"
                                />
                                <span className="ml-2">Masculino</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="female"
                                    {...register("gender", { required: "El género es requerido" })}
                                    className="form-radio"
                                />
                                <span className="ml-2">Femenino</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="other"
                                    {...register("gender", { required: "El género es requerido" })}
                                    className="form-radio"
                                />
                                <span className="ml-2">Otro</span>
                            </label>
                        </div>
                        {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
                        <div className='flex flex-col md:flex-row gap-6'>
                            <TextInput
                                name="city"
                                placeholder="Ciudad"
                                label="Ciudad"
                                type="text"
                                register={register("city", {
                                    required: "La ciudad es requerida",
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.city ? errors.city.message : ""}
                            />
                            <TextInput
                                name="country"
                                placeholder="País"
                                label="País"
                                type="text"
                                register={register("country", {
                                    required: "El país es requerido",
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.country ? errors.country.message : ""}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <TextInput
                                name="phone"
                                placeholder="Teléfono"
                                label="Teléfono"
                                type="tel"
                                register={register("phone", {
                                    required: "El teléfono es requerido",
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: "Número de teléfono no válido"
                                    }
                                })}
                                styles="w-full rounded-lg border-gray-300"
                                labelStyle="ml-2"
                                error={errors.phone ? errors.phone.message : ""}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-6 transition duration-300 ease-in-out"
                        >
                            Registrarse
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/entrance')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4 transition duration-300 ease-in-out"
                        >
                            Volver atrás
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
