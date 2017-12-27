import axios from 'axios'
export default (cb)=>{
  // console.log('foo');
  axios.post('/users').then(res=>{
    cb(res);
  })
}
