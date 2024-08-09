import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

// Tạo 1 account sao đó save vào DB users
export async function createUserAccount(user: INewUser) {
  try {
    // Create account vào auth trong appwrite dùng để login
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    // Nếu không thành công thì throw lỗi
    if (!newAccount) throw Error;

    // Tạo 1 url cho avatar dựa trên user name được truyền vào (được appwrite support và cấu hình ở appwrite/config.ts/avatars)
    const avatarUrl = avatars.getInitials(user.name);

    // Khi đã tạo xong account thì lưu user vào db users
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//  Save account vừa vạo vào DB users
export async function saveUserToDB(user: {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL;
}) {
  try {
    // create new user vào db users (được appwrite support và cấu hình ở appwrite/config.ts/databases)
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(), // tạo 1 key unique ngẫu nhiên
      user // add thông tin user cần tạo
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// Login account
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Lấy account hiện tại
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// Lấy user hiện tại thông qua id
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    // Lấy user hiện tại thông qua $id được truyền vào
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    // Nếu có thì return ko thì báo lỗi
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log("🚀 ~ getCurrentUser ~ error:", error);
  }
}
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}
