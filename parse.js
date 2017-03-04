var nextChar = require('./nextChar.js');
function parse(tag) {
  var html = '';
  var num = 0;
  var list = '';
  var char = '';
  var temp = '';
  var id = '';
  var props = '';
  var brack = '';
  while (true) {
    brack = '';
    props = '';
    id = '';
    list = '';
    temp = nextChar(num, tag);
    num = temp[0];
    char = temp[1];
    if (char == '%') {//Is it a tag?
      while (true) {//Parse id
        temp = nextChar(num, tag);
        num = temp[0];
        char = temp[1];
        if (char != '(') {
          id += char;
        }
        else if (char == '(') {
          while (true) {//Parse properties
            temp = nextChar(num, tag);
            num = temp[0];
            char = temp[1];
            if (char != ')') {
              props += char;
            }
            else if (char == ')') {
              temp = nextChar(num, tag);
              num = temp[0];
              char = temp[1];
              if (char == '{') {
                while (true) {//Parse Block
                  temp = nextChar(num, tag);
                  num = temp[0];
                  char = temp[1];

                  if (char != '}') {
                    num--;
                    while (true) {
                      temp = nextChar(num, tag);
                      num = temp[0];
                      char = temp[1];
                      if(char != '$') {
                        brack += char;
                      }
                      else if (char == '$') {
                        brack += '$';
                        var x = parse(brack);
                        html += `<${id} ${props}>${x}</${id}>`;
                        num--;
                        break;
                      }
                    }
                    break;
                  }
                  else if (char == '}') {
                    html += `<${id} ${props}></${id}>`;
                    break;
                  }
                }
              }
              else {
                throw `Error, '${char}' was not expected at this time.`
              }
              break;
            }
          }
          break;
        }
      }
    }
    else if (char == '`') {
      while (true) {
        temp = nextChar(num, tag);
        num = temp[0];
        char = temp[1];
        if (char != '`') {
          list += char;
        }
        else {
          html += list;
          break;
        }
      }
    }
    else if (char == '$') {
      break;
    }
  }
  return html;
}
module.exports = parse;
