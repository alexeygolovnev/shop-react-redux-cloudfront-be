module.exports.handler = async function (event) {
  try {
    const { GITHUB_ACCOUNT_NAME, GITHUB_ACCOUNT_PASSWORD } = process.env;
    if (
      !event?.headers?.authorization ||
      event?.headers?.authorization.indexOf("Basic ") === -1
    ) {
      return {
        isAuthorized: false,
        context: {
          payload: JSON.stringify({
            message: "Authorization header is not provided",
          }),
        },
      };
    }

    const base64Token = event.headers.authorization.split(" ")[1];

    const credentials = new Buffer.from(base64Token, "base64").toString(
      "ascii"
    );

    const [userName, password] = credentials.split(":");

    if (
      userName !== GITHUB_ACCOUNT_NAME ||
      password !== GITHUB_ACCOUNT_PASSWORD
    ) {
      return {
        isAuthorized: false,
        context: {
          payload: JSON.stringify({
            message: "Invalid Authentication Credentials",
          }),
        },
      };
    }

    return {
      isAuthorized: true,
      context: {
        payload: JSON.stringify({
          message: "Success",
        }),
      },
    };
  } catch (e) {
    console.log({ e });
  }
};
