import { ip } from "@form-validation/validator-ip";

export const validateIpWithPort = (value) => {
  const [ipPart, portPart] = value.split(":");

  const ipValidationResult = ip().validate({
    value: ipPart,
    options: {
      ipv4: true,
      ipv6: false,
      message: "Invalid IP address",
    },
  });

  if (!ipValidationResult.valid) {
    return {
      valid: false,
      message: ipValidationResult.message || "Invalid IP address",
    };
  }

  if (portPart) {
    const portNumber = parseInt(portPart, 10);
    if (isNaN(portNumber) || portNumber < 0 || portNumber > 65535) {
      return {
        valid: false,
        message: "Invalid port number. Must be between 0 and 65535.",
      };
    }
  }

  return { valid: true };
};