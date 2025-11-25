/**
 * WhatsApp Flow endpoint controller
 */

import {
  decryptRequest,
  encryptResponse,
  FlowEndpointException,
} from "../../utilities/flowEncryption.js";
import { getNextScreen } from "./flowLogic.js";
import { isRequestSignatureValid } from "../../utilities/flowSignature.js";

const { APP_SECRET, PRIVATE_KEY, PASSPHRASE = "" } = process.env;

// Main flow endpoint handler
export const handleFlowRequest = async (req, res) => {
  try {
    console.log("Flow endpoint called with method:", req.method);
    console.log("Request body:", req.body);
    console.log("Headers:", req.headers);

    // Handle health check requests (might come as POST with specific body)
    if (
      req.body &&
      typeof req.body === "object" &&
      req.body.action === "ping"
    ) {
      console.log("Health check ping received");
      return res.status(200).json({
        version: "3.0",
        data: {
          status: "active",
        },
      });
    }

    if (!PRIVATE_KEY) {
      console.error("Private key is missing from environment variables");
      throw new Error(
        'Private key is empty. Please check your env variable "PRIVATE_KEY".'
      );
    }

    if (!isRequestSignatureValid(req, APP_SECRET)) {
      console.error("Request signature validation failed");
      // Return status code 432 if request signature does not match.
      // To learn more about return error codes visit: https://developers.facebook.com/docs/whatsapp/flows/reference/error-codes#endpoint_error_codes
      return res.status(432).send();
    }

    let decryptedRequest = null;
    try {
      decryptedRequest = decryptRequest(req.body, PRIVATE_KEY, PASSPHRASE);
    } catch (err) {
      console.error(err);
      if (err instanceof FlowEndpointException) {
        return res.status(err.statusCode).send();
      }
      return res.status(500).send();
    }

    const { aesKeyBuffer, initialVectorBuffer, decryptedBody } =
      decryptedRequest;
    console.log("💬 Decrypted Request:", decryptedBody);

    // TODO: Uncomment this block and add your flow token validation logic.
    // If the flow token becomes invalid, return HTTP code 427 to disable the flow and show the message in `error_msg` to the user
    // Refer to the docs for details https://developers.facebook.com/docs/whatsapp/flows/reference/error-codes#endpoint_error_codes

    /*
    if (!isValidFlowToken(decryptedBody.flow_token)) {
      const error_response = {
        error_msg: `The message is no longer available`,
      };
      return res
        .status(427)
        .send(
          encryptResponse(error_response, aesKeyBuffer, initialVectorBuffer)
        );
    }
    */

    const screenResponse = await getNextScreen(decryptedBody);
    console.log("👉 Response to Encrypt:", screenResponse);

    res.send(
      encryptResponse(screenResponse, aesKeyBuffer, initialVectorBuffer)
    );
  } catch (error) {
    console.error("❌ Flow endpoint error:", error);
    console.error("Error stack:", error.stack);
    console.error("Request method:", req.method);
    console.error("Request URL:", req.url);
    console.error("Request body:", req.body);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// Health check endpoint
export const getFlowStatus = (req, res) => {
  console.log("GET health check called");

  const status = {
    status: "active",
    timestamp: new Date().toISOString(),
    version: "3.0",
    environment: {
      hasAppSecret: !!process.env.APP_SECRET,
      hasPrivateKey: !!process.env.PRIVATE_KEY,
      hasPassphrase: !!process.env.PASSPHRASE,
    },
  };

  res.status(200).json(status);
};
