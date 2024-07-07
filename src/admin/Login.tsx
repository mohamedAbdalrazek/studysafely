import { useState, ChangeEvent, FormEvent } from "react";
import "./login.css";
import { auth } from "../api/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | false>(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [sending, setSending] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        try {
            const userCredential: UserCredential =
                await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store the token and user information in localStorage
            const token = await user.getIdToken();
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/4ebdeab6-4058-4671-942a-258434abb061");
        } catch (err: any) {
            switch (err.code) {
                case "auth/user-not-found":
                case "auth/wrong-password":
                    setError("Incorrect email or password.");
                    break;
                case "auth/too-many-requests":
                    setError(
                        "Too many login attempts. Please try again later."
                    );
                    break;
                case "auth/network-request-failed":
                    setError("Network error. Please check your connection.");
                    break;
                default:
                    setError(
                        "An unexpected error occurred. Please try again later."
                    );
                    break;
            }
        } finally {
            setSending(false);
        }
    };
    if (token) {
        return <Navigate to="/4ebdeab6-4058-4671-942a-258434abb061" />;
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-body">
                    <div>
                        <label htmlFor="email"> Email </label>
                        <input
                            type="text"
                            required
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                                setError(false);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"> Password </label>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                        />
                    </div>
                    {error && (
                        <span style={{ color: "red", fontSize: "14px" }}>
                            {error}
                        </span>
                    )}
                    <button disabled={sending}>
                        {sending ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}
