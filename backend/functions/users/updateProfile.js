import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE || "AuraUsers";
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-for-now";

// Helper function to extract user details from the JWT token
const getAuthUser = (event) => {
  const token = event.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided");
  return jwt.verify(token, JWT_SECRET);
};

export const handler = async (event) => {
  try {
    const authUser = getAuthUser(event);
    if (authUser.role !== 'manager' && authUser.role !== 'admin') {
      return {
        statusCode: 403, // Forbidden
        body: JSON.stringify({ message: "You do not have permission to change roles." }),
      };
    }

    const targetUserId = event.pathParameters.id;
    const { role: newRole } = JSON.parse(event.body);

    if (!newRole) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "A 'role' is required in the request body." }),
      };
    }

    const command = new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { id: targetUserId },
      UpdateExpression: "set #role = :newRole",
      ExpressionAttributeNames: { "#role": "role" },
      ExpressionAttributeValues: { ":newRole": newRole },
      ReturnValues: "UPDATED_NEW",
    });

    const { Attributes } = await docClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Role updated successfully",
        updatedRole: Attributes.role
      }),
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
