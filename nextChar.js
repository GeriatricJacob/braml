function nextChar(num, tag, whitespace) {
  whitespace = whitespace || false;
  while (true) {
    char = tag.charAt(num);
    if(whitespace == false && !/\s/.test(char)) {
      num++;
      return [num++, char];
    }
    else if (whitespace == true) {
      num++;
      return [num++, char];
    }
    else {
      num++;
    }
  }
}
module.exports = nextChar;
