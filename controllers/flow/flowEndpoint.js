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
    if (!PRIVATE_KEY) {
      throw new Error(
        'Private key is empty. Please check your env variable "PRIVATE_KEY".'
      );
    }

    if (!isRequestSignatureValid(req, APP_SECRET)) {
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
    console.error("Flow endpoint error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Health check endpoint
export const getFlowStatus = (req, res) => {
  res.send(`<pre>WhatsApp Flow Endpoint is Active!
Checkout README.md to start.</pre>`);
};
