import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
			toast.success(`Welcome back ${response.data.user.username} 😊`);
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			if (error.response) {
				// The server responded with an error
				const errorMessage = error.response.data.message || "Login failed";
				toast.error(errorMessage);
			} else if (error.request) {
				// The request was made but no response was received (e.g., network error)
				toast.error("No response from the server. Please check your internet connection.");
			} else {  
				// Some other error occurred in setting up the request
				toast.error("An unexpected error occurred. Please try again.");
			}
		}
	},
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/auth/authcheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
            console.log(error.message);
			// toast.error(error.response.data.message || "An error occurred");
		}
	},
}));