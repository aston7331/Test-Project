const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const ApiUrls = {
    REGISTER: baseUrl + "Users",
    LOGIN: baseUrl + "Login",
}