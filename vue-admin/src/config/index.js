let url = location.href;
let website = '';
if(url.indexOf('8080')>-1){
  website = 'http://127.0.0.1:3000'
} else {
  website = ''
}
export default ({
  website: website
})
