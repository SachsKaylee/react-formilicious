const checkForAvailableUsername = () => value => {
  return new Promise((res, rej) => setTimeout(() => value.includes("a")
    ? rej("For some strange reason, all usernames containing an 'a' are already used...")
    : res(), Math.floor(Math.random() * 1500)));
};

export default checkForAvailableUsername;