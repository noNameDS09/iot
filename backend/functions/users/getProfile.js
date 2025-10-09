import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE || "AuraUsers";
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-for-now";

// Helper function to extract user ID from the JWT token
const getUserIdFromToken = (event) => {
  const token = event.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided");
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.id;
};

export const handler = async (event) => {
  try {
    const userId = getUserIdFromToken(event);

    const command = new GetCommand({
      TableName: USERS_TABLE,
      Key: { id: userId },
      ProjectionExpression: "id, username, #role", // Only fetch necessary fields
      ExpressionAttributeNames: { "#role": "role" },
    });

    const { Item } = await docClient.send(command);

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(Item),
    };
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid or expired token" }) };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
