import { API_URL, DEFAULT_HEADERS } from "./constants";

export type AuthOperation = "login" | "register";
export type User = {
    id: string;
    username: string;
    token: string;
};

export const loginOrRegister = async (
    operation: AuthOperation,
    username: string,
    password: string
): Promise<User> => {
    try {
        logout();
        const response = await fetch(
            `${API_URL}/auth/${operation}`,

            {
                method: "POST",
                headers: DEFAULT_HEADERS,
                body: JSON.stringify({ username, password }),
            }
        );
        const json = await response.json();
        const user = json.user as User;
        if (!response.ok) {
            return Promise.reject(json.message as string);
        }
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        return user;
    } catch {
        return Promise.reject("Network error.");
    }
};

export const getAuthInfo = () => {
    const userJson = localStorage.getItem("user");

    const user = userJson != null ? (JSON.parse(userJson) as User) : null;

    return {
        isLoggedIn: user != null,
        user,
    };
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

export const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token") as string}`,
});
