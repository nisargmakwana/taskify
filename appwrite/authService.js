import { Client, Account, ID } from "appwrite";
import conf from "@/conf";

class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint("https://cloud.appwrite.io/v1")
			.setProject("6634b3e70031bace9c4d");
		this.account = new Account(this.client);
	}
	async createAccount({ email, password, name }) {
		try {
			const user = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			// console.log(user);
			return user;
		} catch (error) {
			throw error;
			console.log("Appwrite service :: createAccount :: error ", error);
		}
	}

	async login({ email, password }) {
		try {
			const session = await this.account.createEmailPasswordSession(
				email,
				password
			);
			// console.log(session);
			return session;
		} catch (error) {
			throw error;
			console.log("Appwrite service :: login :: error ", error);
		}
	}

	async getCurrentUser() {
		try {
			const currentUser = await this.account.get();
			return currentUser;
		} catch (error) {
			console.log("Appwrite service :: getCurrentUser :: error ", error);
		}
	}

	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite service :: logout :: error ", error);
			return false;
		}
	}
}

const authService = new AuthService();
export default authService;
