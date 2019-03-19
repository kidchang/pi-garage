import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import * as piLib from "./libs/pi-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const doorId = uuid.v1();
  const params = {
    TableName: "doors",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      doorId: doorId,
      doorName: data.doorName,
      doorStatus: data.doorStatus,
      createdAt: Date.now()
    }
  };
  if (data.hasOwnProperty("piUrl")) {
    try {
      piLib.register(data.piUrl, doorId);
    } catch (e) {
      return failure({ status: false });
    }
  }
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
