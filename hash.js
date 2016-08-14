function randomChar() {
  var n = Math.floor( Math.random() * 62 );
  // 0-9
  if ( n < 10 ) return n;
  // A-Z
  if ( n < 36 ) return String.fromCharCode(n + 55);
  // a-z
  return String.fromCharCode(n + 61);
}

function createHash(len) {
  var str = '';
  while (str.length < len) {
    str += randomChar();
  }
  return str;
}

module.exports = createHash;
