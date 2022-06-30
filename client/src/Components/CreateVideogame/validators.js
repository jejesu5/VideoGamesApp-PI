//Validators for inputs in Create Videogame

export function checkIfValidDate(str) {
  // Regular expression to check if string is valid date
  const dateRegexp = /^[1-2][089]\d{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/

  return dateRegexp.test(str);
}
//04/06/2001
export function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }