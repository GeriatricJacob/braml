var stringOpen = false;
function nextChar(char, tag) {
  while (true) {
    if (!/\s/.test(tag.charAt(char)) && !stringOpen) {
      if (tag.charAt(char) == '`') {
        stringOpen = true;
      }
      var ret = tag.charAt(char);
      char += 1;
      return [char, ret];
    }
    else if (stringOpen) {
      var ret = tag.charAt(char);
      char += 1;
      return [char, ret];
      if (tag.charAt(char) == '`') {
        stringOpen = false;
      }
    }
    else {
      char += 1;
    }
  }
}
module.exports = nextChar;
