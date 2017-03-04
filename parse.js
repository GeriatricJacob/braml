var nextChar = require('./nextChar.js');
function parse(tag) {
  var doiret = true;
  var html = '';
  var num = 0;
  var list = '';
  var char = '';
  var temp = '';
  var id = '';
  var props = '';
  var brack = '';
  while (true) {
    props = '';
    list = '';
    id = '';
    temp = nextChar(num, tag);
    num = temp[0];
    char = temp[1];
    if (char == '$') {//Is it an exit character?
      break;
    }
    else if (char == '`') {//is it a ` string?
      while (true) {
        temp = nextChar(num, tag, true);
        num = temp[0];
        char = temp[1];
        if (char == '`') {
          html += list;
          break;
        }
        else {
          list += char;
        }
      }
    }
    else if (char == "'") {//is it a ' string?
      while (true) {
        temp = nextChar(num, tag, true);
        num = temp[0];
        char = temp[1];
        if (char == "'") {
          html += list;
          break;
        }
        else {
          list += char;
        }
      }
    }
    else if (char == '%') {//Is it a tag?
      while (true) {//Process tag type.
        temp = nextChar(num, tag);
        num = temp[0];
        char = temp[1];
        if (char == '(') {
          id += list;
          list = '';
          while (true) {//Process properties.
            temp = nextChar(num, tag);
            num = temp[0];
            char = temp[1];
            if (char == ')') {
              props += list;
              list = '';
              while (true) {//Process child nodes.
                temp = nextChar(num, tag);
                num = temp[0];
                char = temp[1];
                if (char == '{') {
                  temp = nextChar(num, tag);
                  num = temp[0];
                  char = temp[1];
                  if (char == '}') {
                    html += `<${id} ${props}></${id}>`;
                    break;
                  }
                  else {
                    num--;
                    while (true) {
                      temp = nextChar(num, tag, true);
                      num = temp[0];
                      char = temp[1];
                      if (char == '}') {
                        if (list.charAt(0) == '%') {
                          list += '}$';
                        }
                        var x = parse(list);
                        html += `<${id} ${props}>${x[1]}</${id}>`;
                        break;
                      }
                      else {
                        list += char;
                      }
                    }
                    break;
                  }
                }
                else {
                  console.error(`Error, unexpected symbol '${char}'.`);
                  doiret = false;
                  break;
                }
              }
              break;
            }
            else {
              list += char;
            }
          }
          break;
        }
        else {
          list += char;
        }
      }
      if (doiret == false) {
        break;
      }
    }
    else {
      console.error(`Error, unexpected symbol '${char}'.`);
      doiret = false;
      break;
    }
  }
  if (doiret) {
    return [true, html];
  }
  else {
    return [false];
  }
}
module.exports = parse;
