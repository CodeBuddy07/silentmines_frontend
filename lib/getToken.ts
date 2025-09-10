export const getToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('token');
        console.log(token);
        
        return token;
    }
    return null;
}
