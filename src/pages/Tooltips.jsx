export const callStatusMessages = [
  {
    key: "NOT_SUFFICIENT_FUNDS",
    value: "The caller's account does not have enough balance.",
  },
  {
    key: "CHANUNAVAIL",
    value: "Call Failed: Channel Unavailable.",
  },
  {
    key: "IVR_AUTHENTICATION_FAILED",
    value: "IVR Authentication Failed. No input detected. ",
  },
  {
    key: "CONGESTION",
    value: "The call could not be completed due to network congestion.",
  },
  { key: "DID_NOT_ACTIVE", value: "The dialed DID number is inactive." },
  {
    key: "FORWARD_NUMBER_NOT_FOUND",
    value: "The call was supposed to be forwarded but failed.",
  },
  {
    key: "BUYER_INVALID",
    value: "The buyer (recipient) is invalid or does not exist.",
  },
  { key: "ANSWERED", value: "The call was successfully connected." },
  {
    key: "DID_CAMPAIGN_MISSING",
    value: "The dialed DID is not linked to any active campaign.",
  },
  {
    key: "DID_USER_NOT_ACTIVE",
    value: "The user associated with the DID is inactive.",
  },
  { key: "BUSY", value: "The recipient's line was busy." },
  {
    key: "BUYER_NOT_FOUND",
    value: "The system could not locate the buyer (recipient).",
  },
  { key: "NOANSWER", value: "The call rang but was not answered." },
  {
    key: "CAMPAIGN_LIMIT_REACHED",
    value: "The campaign has reached its call limit.",
  },
  { key: "CANCEL", value: "The call was canceled before it was answered." },
  {
    key: "CALLERID_BLOCKED_BY_USER",
    value: "The recipient has blocked this caller ID.",
  },
  {
    key: "BUYER_ANSWERED",
    value: "The call was successfully connected and answered.",
  },
  {
    key: "TFN_USER_NOT_ACTIVE",
    value:
      "The assigned Toll-Free Number (TFN) is linked to a user who is currently inactive and unable to receive calls.",
  },
  {
    key: "TFN_USER_SUSPENDED",
    value:
      "The assigned Toll-Free Number (TFN) belongs to a user whose account is suspended, preventing call processing.",
  },
  {
    key: "CALLER_ABANDONED",
    value:
      "The caller disconnected the call before it could be answered, often due to long wait times or disinterest.",
  },
  {
    key: "NO ANSWER",
    value:
      "The call was not answered by the recipient within the allowed ringing duration, leading to a missed call.",
  },
  { key: "USER_NOT_FOUND", value: "The user does not exist." },
  {key:"SHAKEN_VALIDATION_FAILED", value:"SHAKEN Validation Failed. Caller Id could not be verified"},
];
