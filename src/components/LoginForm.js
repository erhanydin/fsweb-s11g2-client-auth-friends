import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
    
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    const onSubmitLogin = (data) => {
        // axios
        //     .post("http://localhost9000/api/login", data, {header: {"Content-Type": "application/json"}})
        //     .then((res) => JSON.parse(console.log(res.data)))
        //     .catch((err) => console.log(err));

        const config = { 
            method: 'post',
            url: 'http://localhost:9000/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((res) => {
                console.log(JSON.stringify(res.data));
                localStorage.setItem("token", res.data.token);
                history.push("/friends-list");
            })
            .catch((err) => console.log(err));

    }

    return (
        <div>
            <h1 className='login-header'>Login</h1>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <div>
                    <input className='inputs' type="text" placeholder='username' {...register("username", { required: "Bu alan zorunludur.",minLength: {
                        min: 5,
                        message: "Kullanıcı adı en az 5 karakter içermelidir"
                    } })} />
                </div>
                <div>
                    <input className='inputs' type="password" placeholder='password' {...register("password", {required: "Bu alan zorunludur."})}/>
                </div>
                <button className='buton' type='submit'>SUBMIT</button>
            </form>
        </div>
    );

}