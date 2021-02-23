export default {
  capitalize: function(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }
};
export const checkValuePercent = (value, num) => {
  if (typeof value === "number") {
    return value;
  } else {
    const number = parseFloat(parseInt(value.split("p")) / num);
    return number;
  }
};
export const getNumberOfStringTarget = value => {
  const newValue = value.split("target");
  if (parseInt(newValue[0])) return parseInt(newValue[0]);
  else return parseInt(newValue[1]);
};
