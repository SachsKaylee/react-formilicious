// my-own-validators/pwned.js
import sha1 from "js-sha1";

const splitAt = (string, at) => [string.substring(0, at), string.substring(at)];

const pwned = ({ errorThreshold = 5 } = {}) => async value => {
  const [requestSha, matchSha] = splitAt(sha1(value).toUpperCase(), 5);
  const apiResultHttp = await fetch(`https://api.pwnedpasswords.com/range/${requestSha}`);
  const apiResult = await apiResultHttp.text();

  const regex = new RegExp("^" + matchSha + ":(\\d+)$", "im");
  const exec = apiResult.match(regex);
  const breachCount = exec ? parseInt(exec[1], 10) : 0;

  if (breachCount > errorThreshold) return `Oh Jolly! This password has been used by ${breachCount} other people.`;
  if (breachCount > 0) return {
    validated: "hint",
    message: `So - You could use this password, like the other ${breachCount} people who did and regretted it, or just choose a more secure one.`
  };
};

export default pwned;