import { axiosInstance } from ".";


// register user
export const RegisterUser = async(payload)=>{
    const response = await axiosInstance('post', '/api/users/register', payload);

    return response;
}



// login user

export const LoginUser = async(payload)=>{
    const response = await axiosInstance('post', '/api/users/login', payload);

    return response;
}


