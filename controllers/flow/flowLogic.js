/**
 * WhatsApp Flow logic controller
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 */

export const getNextScreen = async (decryptedBody) => {
  const { screen, data, version, action, flow_token } = decryptedBody;

  // handle health check request
  if (action === "ping") {
    return {
      version,
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      version,
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow
  if (action === "INIT") {
    return {
      version,
      screen: "APPOINTMENT",
      data: {
        // custom data for the screen
        greeting: "Hey there! 👋",
      },
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      case "APPOINTMENT":
        // TODO: process flow input data
        console.info("Input name:", data?.name);

        // send success response to complete and close the flow
        return {
          version,
          screen: "SUCCESS",
          data: {
            department: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
              __example__: [
                {
                  id: "shopping",
                  title: "Shopping & Groceries",
                },
                {
                  id: "clothing",
                  title: "Clothing & Apparel",
                },
                {
                  id: "home",
                  title: "Home Goods & Decor",
                },
                {
                  id: "electronics",
                  title: "Electronics & Appliances",
                },
                {
                  id: "beauty",
                  title: "Beauty & Personal Care",
                },
              ],
            },
            location: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
              __example__: [
                {
                  id: "1",
                  title: "King’s Cross, London",
                },
                {
                  id: "2",
                  title: "Oxford Street, London",
                },
                {
                  id: "3",
                  title: "Covent Garden, London",
                },
                {
                  id: "4",
                  title: "Piccadilly Circus, London",
                },
              ],
            },
            is_location_enabled: {
              type: "boolean",
              __example__: true,
            },
            date: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
              __example__: [
                {
                  id: "2024-01-01",
                  title: "Mon Jan 01 2024",
                },
                {
                  id: "2024-01-02",
                  title: "Tue Jan 02 2024",
                },
                {
                  id: "2024-01-03",
                  title: "Wed Jan 03 2024",
                },
              ],
            },
            is_date_enabled: {
              type: "boolean",
              __example__: true,
            },
            time: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
              __example__: [
                {
                  id: "10:30",
                  title: "10:30",
                },
                {
                  id: "11:00",
                  title: "11:00",
                  enabled: false,
                },
                {
                  id: "11:30",
                  title: "11:30",
                },
                {
                  id: "12:00",
                  title: "12:00",
                  enabled: false,
                },
                {
                  id: "12:30",
                  title: "12:30",
                },
              ],
            },
            is_time_enabled: {
              type: "boolean",
              __example__: true,
            },
          },
        };
      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};
