import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE || "AuraUsers";
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-for-now"; 

export const handler = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Username and password are required." }),
      };
    }

    const command = new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "username-index", 
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: { ":username": username },
    });

    const { Items } = await docClient.send(command);
    const user = Items && Items.length > 0 ? Items[0] : null;

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid username or password" }),
      };
    }

    const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        token: token,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
