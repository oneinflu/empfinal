export const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

export const getAuthToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("adminToken");
    }
    return null;
};

export const setAuthToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", token);
    }
};

export const removeAuthToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
    }
};

export const getAuthUser = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("adminUser");
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const setAuthUser = (user: any) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("adminUser", JSON.stringify(user));
    }
};

export const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // If body is FormData, don't set Content-Type (let browser handle it)
    // If body is not FormData and not set, default to application/json
    if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        removeAuthToken();
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    }

    return response;
};
