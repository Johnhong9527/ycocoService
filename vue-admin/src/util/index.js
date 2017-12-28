import axios from 'axios'
import _ from '@/config'

export var users = function (cb) {
  axios.post(_.website+'/users').then(res=>{
    cb(res);
  })
}

export default ({
  users: function (cb) {
    axios.post('/users').then(res=>{
      cb(res);
    })
  }
})
