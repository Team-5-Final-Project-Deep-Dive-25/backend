/**
 * WhatsApp Flow key generator utility
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import crypto from "crypto";

export const generateKeyPair = (passphrase) => {
  if (!passphrase) {
    throw new Error("Passphrase is required to generate the keys");
  }

  try {
    const keyPair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
        cipher: "des-ede3-cbc",
        passphrase,
      },
    });

    return {
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
      passphrase,
    };
  } catch (err) {
    throw new Error(
      "Error while creating public private key pair: " + err.message
    );
  }
};
