/**
 * Flow key generation controller
 */

import { generateKeyPair } from "../../utilities/flowKeyGenerator.js";

export const generateKeys = async (req, res) => {
  try {
    const { passphrase } = req.body;

    if (!passphrase) {
      return res.status(400).json({
        success: false,
        message: "Passphrase is required to generate keys",
      });
    }

    const keyPair = generateKeyPair(passphrase);

    return res.status(200).json({
      success: true,
      message: "Key pair generated successfully",
      data: {
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        passphrase: keyPair.passphrase,
        instructions: {
          step1: "Copy the PASSPHRASE and PRIVATE_KEY to your .env file",
          step2:
            "Copy the PUBLIC_KEY and upload it to your WhatsApp Business account",
          step3: "Add these to .env: PASSPHRASE and PRIVATE_KEY",
        },
      },
    });
  } catch (error) {
    console.error("Error generating keys:", error);
    return res.status(500).json({
      success: false,
      message: "Error generating key pair",
      error: error.message,
    });
  }
};
