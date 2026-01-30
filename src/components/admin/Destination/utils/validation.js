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

// ==============================
// ✅ TFN / Destination Number Validation
// ==============================

export const validateTfnNumber = (value) => {
  if (!value || value.trim() === "") {
    return {
      valid: false,
      message: "Destination number is required",
    };
  }

  // Only digits & max 11 length
  if (!/^\d{1,11}$/.test(value)) {
    return {
      valid: false,
      message: "Destination number must be 11 digits",
    };
  }

  return { valid: true };
};