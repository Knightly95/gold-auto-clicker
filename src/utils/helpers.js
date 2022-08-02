export const capitalize = str => {
  const words = str.split(' ');
  const capitalized = [];

  for (const word of words) {
    capitalized.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  return capitalized.join(' ');
};
