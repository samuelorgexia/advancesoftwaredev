class AuthService {
    static isSignedIn() {
        return !!localStorage.getItem("jwttoken");
    }
}

export { AuthService };