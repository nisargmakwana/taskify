import { Client, Databases, Query, ID } from "appwrite";
import conf from "@/conf";

class AppService {
	client = new Client();
	databases;

	constructor() {
		this.client
			.setEndpoint("https://cloud.appwrite.io/v1")
			.setProject("6634b3e70031bace9c4d");
		this.databases = new Databases(this.client);
	}

	async getTasks(userId) {
		try {
			const tasks = await this.databases.listDocuments(
				"6635e63200214e20b3ea", // databaseId
				"6635e63b001379f6b55d", // collectionId
				[Query.equal("userid", userId)]
			);
			return tasks;
		} catch (error) {
			console.log("Appwrite service :: getTasks :: error ", error);
		}
	}

	async createTask({ task, userid, date }) {
		try {
			const taskData = await this.databases.createDocument(
				"6635e63200214e20b3ea",
				"6635e63b001379f6b55d",
				ID.unique(),
				{ task, userid, date, completed: false }
			);
			return taskData;
		} catch (error) {
			console.log("Appwrite service :: createTask :: error ", error);
		}
	}

	async deleteTask(id) {
		try {
			const deletedTask = await this.databases.deleteDocument(
				"6635e63200214e20b3ea",
				"6635e63b001379f6b55d",
				id
			);
			return deletedTask;
		} catch (error) {
			console.log("Appwrite service :: deleteTask :: error ", error);
		}
	}

	async updateTask(docId, { task, userid, date, completed }) {
		try {
			const updatedTask = await this.databases.updateDocument(
				"6635e63200214e20b3ea",
				"6635e63b001379f6b55d",
				docId,
				{ task, userid, date, completed }
			);
			return updatedTask;
		} catch (error) {
			console.log(error);
		}
	}
}

const appwriteService = new AppService();
export default appwriteService;
