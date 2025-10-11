import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const USERS_TABLE = process.env.USERS_TABLE || "AuraUsers";

export const handler = async (event) => {
  try {
    const { username, password, role } = JSON.parse(event.body);

    if (!username || !password || !role) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Username, password, and role are required." }),
      };
    }

    const userId = randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        id: userId,
        username,
        passwordHash,
        role,
        createdAt: new Date().toISOString(),
      },
      ConditionExpression: "attribute_not_exists(username)", // Prevent duplicate usernames
    });

    await docClient.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully",
        userId,
      }),
    };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return {
        statusCode: 409, // Conflict
        body: JSON.stringify({ message: "Username already exists." }),
      };
    }
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
