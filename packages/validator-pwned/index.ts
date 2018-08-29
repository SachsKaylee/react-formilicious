import sha1 from "js-sha1";

const splitAt = (string: string, at: number) => [string.substring(0, at), string.substring(at)];

const pwned = ({
  errorThreshold = 5,
  messages = {
    error: "This password is insecure. It has been leaked in {x} security breaches. You may not use a compromised password.",
    hint: "This password is insecure. It has been leaked in {x} security breaches. Consider using a safer one."
  }
} = {}) => async (value: string) => {
  const [requestSha, matchSha] = splitAt(sha1(value).toUpperCase(), 5);
  const apiResultHttp = await fetch(`https://api.pwnedpasswords.com/range/${requestSha}`);
  const apiResult = await apiResultHttp.text();

  const regex = new RegExp("^" + matchSha + ":(\\d+)$", "im");
  const exec = apiResult.match(regex);
  const breachCount = exec ? parseInt(exec[1], 10) : 0;

  if (breachCount > errorThreshold) return messages.error.replace(/{x}/, breachCount.toLocaleString());
  if (breachCount > 0) return {
    validated: "hint",
    message: messages.hint.replace(/{x}/, breachCount.toLocaleString())
  };
};


export default pwned;