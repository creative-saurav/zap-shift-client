import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {register, formState: { errors }, handleSubmit } = useForm();
  const {loginUser} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) =>{
    loginUser(data.email, data.password)
    .then(result =>{
      const user = result.user;
      toast.success(`Wellcome back ${user.displayName}`);
      navigate(location?.state || '/');
    })
    .catch(()=>{
      toast.error('Please enter valid login credentials.');
    })
  }

  return (
    <div >
      <div className="w-full max-w-md">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-black">Welcome Back</h1>
        <p className="mt-2 text-gray-500">Login with ZapShift</p>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              Email
            </label>

            <input
              type="email"
              placeholder="Email"
                {...register('email', {required: true})}
              className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
            />
            {
                  errors.email?.type === 'required' && (
                        <p className='text-red-500'>
                      Email is Required?
                      </p>
                  )
              } 
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
                {...register('password', {required: true})}
              className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
            />
            {
                  errors.password?.type === 'required' && (
                        <p className='text-red-500'>
                      Password is Required?
                      </p>
                  )
              } 
          </div>

          {/* Forgot Password */}
          <div>
            <Link
              to="/forgotpassword"
              className="text-sm text-gray-500 hover:text-primary hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-gray-500 mt-6">
          Don't have any account?{" "}
          <span className="text-primary font-medium cursor-pointer">
            
             <Link to='/register'>Register</Link>
          </span>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
         <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;