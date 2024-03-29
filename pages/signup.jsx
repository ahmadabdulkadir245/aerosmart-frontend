import { app } from "../firebase";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiEye2Fill, RiEyeCloseFill, RiEyeLine, RiEyeOffFill, RiFacebookFill } from "react-icons/ri";
import Head from "next/head";
import axios from "axios";
import Loading from "../components/Loading";

function Signup() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const signInGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        router.push("/");
        sessionStorage.setItem("Token", response.user.accessToken);
        console.log(response.user);
      })
      .catch((err) => console.log(err));
  };

const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
const [success, setSuccess] = useState(null)
const [passwordVissble, setPasswordVissible] = useState(false)
const [confirmpasswordVissble, setConfirmPasswordVissible] = useState(false)
const [inputs, setInputs] = useState({
  email: '',
  password: '',
  confirmPassword: ''
})
const emailIsValid = inputs.email.includes("@");
const passwordIsValid = inputs.password.length >= 6;
const passwordIsEqual = inputs.password === inputs.confirmPassword;

  const signupHandler = async (e) => {
    e.preventDefault();
    if (emailIsValid && passwordIsValid && passwordIsEqual) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log(response.user);
          sessionStorage.setItem("Token", response.user.accessToken);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setError(err)
          setTimeout(() => {
            setError(null)
         }, 5000)
        });
    }
  };
  const inputHandler = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    let graphqlQuery = {
      query: `
      mutation CreateUser($email: String!, $password: String!) {
          createUser(userInput: {email: $email, password: $password}) {
            email
          }
        }
      `,
        variables: {
          email: (inputs.email).toString(),
          password: inputs.password,
        }
      };
      setSuccess(null)
      setError(null)
      if (emailIsValid && passwordIsValid && passwordIsEqual) {
        try{
          const res = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, graphqlQuery)
          // console.log(res.data.data.createUser.email)
          if(res.data.data.createUser.email == "false") {
            // return console.log("User exist")
            setLoading(false)
            return setError("Email has been registered")
          }
          setSuccess("Registered Successful redirecting to login")
          setInputs({
            email: '',
            password: '',
            confirmPassword: ''
          })
          setLoading(false)
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
        catch(err) {
          console.log(err)
          setError(err)
          setLoading(false)
        }
      }
      else {
        setLoading(false)
        setError('Invalid email or password do not match')
      }
    }

    if(loading) {
      return <Loading/>
    }

  return (
    <div className="py-10 md:py-0 grid grid-cols-1 place-content-center overflow-y-scroll xs:h-screen xs:palce-items-center xs:my-0  scrollbar-hide  text-gray-700 max-w-4xl m-auto text-sm">
    <Head>
     <title>Signup</title>
     <meta name="description" content="Generated by create next app" />
     <link rel="icon" href="/favicon.ico" />
   </Head>

      <h2 className="sm:mt-24 md:mt-0 text-2xl text-center font-bold mb-2  ">Sign Up</h2>
      {error && <p className="text-red-500 text-xs lg:text-lg text-center">{error}</p>}
      {success && <p className="text-green-500 text-xs lg:text-lg text-center font-poppins">{success}</p>}
      <form onSubmit={submitHandler}>
      <input
              type='email'
              className='border-[1px] lg:border-[1px] rounded-lg  border-gray-500] outline-none px-4 py-[16px] w-[90%]  m-auto flex my-5 lg:my-5'
              placeholder='Enter email '
              required
               onChange={inputHandler}
               name="email"
               value={inputs.email}
            />
            <div className="flex items-center border-[1px] lg:border-[1px] rounded-lg   outline-none px-4 py-[16px] w-[90%]  m-auto  my-5 lg:my-5 bg-white">
      <input
              type={passwordVissble ? 'text' : 'password'}
              className='w-full h-full outline-none'
              placeholder='Password'
              required
              onChange={inputHandler}
              name="password"
              value={inputs.password}
              />
              {passwordVissble ?
              <>
                <RiEyeLine className="h-4 w-5" onClick={() => setPasswordVissible(!passwordVissble)}/>

              </>
                :
              <RiEyeCloseFill className="h-4 w-5" onClick={() => setPasswordVissible(!passwordVissble)}/>
                 }
              </div>
            <div className="flex items-center border-[1px] lg:border-[1px] rounded-lg   outline-none px-4 py-[16px] w-[90%]  m-auto  my-5 lg:my-5 bg-white">
      <input
              type={confirmpasswordVissble ? 'text' : 'password'}
              className='w-full h-full outline-none'
              placeholder='Confirm Password'
              required
              onChange={inputHandler}
              name="confirmPassword"
              value={inputs.confirmPassword}
              />
              {confirmpasswordVissble ?
              <>
                <RiEyeLine className="h-4 w-5" onClick={() => setConfirmPasswordVissible(!confirmpasswordVissble)}/>

              </>
                :
              <RiEyeCloseFill className="h-4 w-5" onClick={() => setConfirmPasswordVissible(!confirmpasswordVissble)}/>
                 }
              </div>


        <Link href="/forgot-password">
         <p  className="text-[#2F89FC] capitalize text-center font-poppins">forgot password?</p>
        </Link>

        <button type="submit" className="capitalize w-[90%] h-[48px] rounded-md text-white bg-[#0E64D2] block mt-4 m-auto" 
        // onClick={submitHandler}
        >Signup</button>
        </form>

        <p className="font-poppins text-center mt-4">Dont have an account?
        <Link href="/login" className="font-poppins text-[#2F89FC] ml-4">Login</Link>
        </p>

        <div className="flex items-center justify-between px-4 mt-4">
          <span className="w-[44%] h-[1px] bg-gray-700"></span>
          <p className="font-poppins  text-lg">or</p>
          <span className="w-[44%] h-[1px] bg-gray-700"></span>
        </div>

        <button className=" w-[90%] h-[48px] rounded-md text-white bg-[#1877F2]  mt-4 m-auto flex items-center justify-between px-2 ">
        <RiFacebookFill className="w-7 h-7 "/>
          Signup with Facebook
          <div></div>
          </button>

        <button className=" w-[90%] h-[48px] rounded-md text-gray-500 border-[1px] bg-white mt-4 m-auto flex items-center justify-between px-2 "   onClick={signInGoogle}>
        <FcGoogle className="w-7 h-7 "/>
        Signup with Google
          <div></div>
          </button>
      </div>
  );
}

export default Signup;
