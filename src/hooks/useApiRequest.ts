import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthHeaders, logout } from "../api/auth";
import { DEFAULT_HEADERS } from "../api/constants";

export function useApiRequest<T>(url: string) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        const run = async () => {
            setError("");
            setLoading(true);

            try {
                const response = await fetch(url, {
                    headers: { ...DEFAULT_HEADERS, ...getAuthHeaders() },
                    signal: abortController.signal,
                });
                const json = await response.json();
                if (response.ok) {
                    setData(json);
                } else {
                    setData(null);
                    setError(json.message);
                    if (response.status === 401) {
                        logout();
                        navigate(
                            `/auth?next=${
                                location.pathname + (location.search ?? "")
                            }`
                        );
                    }
                }
            } catch {
                setData(null);
                setError("Network error.");
            } finally {
                setLoading(false);
            }
        };
        run();
        return () => abortController.abort();
    }, [url]);

    return {
        data,
        loading,
        error,
    };
}
