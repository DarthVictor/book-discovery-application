import React, { FormEvent, MouseEventHandler, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";

import { AuthOperation, loginOrRegister } from "../../api/auth";

import "./Auth.css";

export const Auth = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [operation, setOperation] = useState<AuthOperation>("login");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleOperationChange = (
        event: React.SyntheticEvent,
        newValue: AuthOperation
    ) => {
        setOperation(newValue);
    };
    const isFormEmpty = !Boolean(user) || !Boolean(password);

    const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError("");
            await loginOrRegister(operation, user, password);
            navigate(searchParams.get("next") ?? "/");
        } catch (error) {
            setLoading(false);
            setError(typeof error === "string" ? error : "Unknown error");
        }
    };

    return (
        <div className="Auth">
            <Tabs
                value={operation}
                onChange={handleOperationChange}
                aria-label="basic tabs example"
            >
                <Tab label="Login" value="login" />
                <Tab label="Register" value="register" />
            </Tabs>
            <form className="Auth-form" onSubmit={onSubmitForm}>
                <TextField
                    id="user"
                    label="Username"
                    variant="outlined"
                    value={user}
                    onChange={({ target }) => {
                        setUser(target.value);
                        setError("");
                    }}
                    className="Auth-field"
                    size="small"
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={({ target }) => {
                        setPassword(target.value);
                        setError("");
                    }}
                    className="Auth-field"
                    error={Boolean(error)}
                    helperText={error}
                    size="small"
                />

                <Button
                    type="submit"
                    disabled={isFormEmpty || loading}
                    variant="outlined"
                    className="Auth-submit"
                    size="small"
                >
                    {operation === "login" ? "Login" : "Register"}
                </Button>
            </form>
        </div>
    );
};
