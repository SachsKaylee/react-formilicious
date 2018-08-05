const checkForAvailableUsername = () => value => {
  return new Promise((res, rej) => setTimeout(() => value.includes("a") ? rej(false) : res(), Math.floor(Math.random() * 2500)));
};

export default checkForAvailableUsername;