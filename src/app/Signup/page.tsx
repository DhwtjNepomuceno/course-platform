"use client";
import Link from "next/link";
import { useForm } from "react-hook-form"

export default function Signup() {
    const { register } = useForm()

    return (
        <div className="grid place-items-center mt-12">
            <h1>Sign Up</h1>
            <p>Enter your details below & free sign up</p>

            <div>
                <form>
                    <div>
                        <label htmlFor="email">Your  Email</label>
                        <input 
                            className="bg-gray-600" 
                            id="email" 
                            type="email" 
                            { ...register("email", { required: true }) }
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            className="bg-gray-600" 
                            id="password" 
                            type="password" 
                            { ...register("password", { required: true, minLength: 6 }) }
                        />
                    </div>

                    <button type="submit">Creat account</button>

                    <div>
                        <input type="checkbox" id="is-accepted" />
                        <label htmlFor="is-accepted">By creating an account you have to agree with our them & condication.</label>
                    </div>
                </form>

                <div>
                    <p>Already have an account？  <Link href='/Login'>Log in</Link></p>
                </div>
            </div>
        </div>
    )
}