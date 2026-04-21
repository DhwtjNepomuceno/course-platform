"use client";
import Link from "next/link";
import { useState } from "react";

// Exemplo didático: capturando dados do formulário com useState e onSubmit
export default function Signup() {
    // Criando estados para cada campo do formulário
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);

    // Função chamada ao enviar o formulário
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
        event.preventDefault(); // Evita o recarregamento da página
        // Exibe os dados no console (poderia enviar para uma API)
        console.log({ email, password, isAccepted });
        // Aqui você pode adicionar validações ou limpar o formulário
    }

    return (
        <div className="grid place-items-center mt-12">
            <h1>Sign Up</h1>
            <p>Enter your details below & free sign up</p>

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input
                            className="bg-gray-600"
                            id="email"
                            type="email"
                            value={email} // Valor controlado pelo estado
                            onChange={e => setEmail(e.target.value)} // Atualiza o estado
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="bg-gray-600"
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="is-accepted"
                            checked={isAccepted}
                            onChange={e => setIsAccepted(e.target.checked)}
                        />
                        <label htmlFor="is-accepted">
                            By creating an account you have to agree with our terms & conditions.
                        </label>
                    </div>

                    <button type="submit">Create account</button>
                </form>

                <div>
                    <p>
                        Already have an account? <Link href='/Login'>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}