export function GetUserModel(loggedInId) {
    return {
  user_first_name : '',
  user_last_name : '',
  email : '',
  password : '',
  created_date : new Date(),
  modified_date : new Date(),
  isdeleted : 0,
  created_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
  modifided_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
    }
  }

  export function GetMRModel(loggedInId) {
    return {
  mr_first_name : '',
  mr_last_name : '',
  email : '',
  password : '',
  created_date : new Date(),
  modified_date : new Date(),
  isdeleted : 0,
  created_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
  modifided_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
  user_id : ''
    }
  }