'use strict';

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  // we pass the user ID that we received in the request to make sure 
  // the user is getting access to their OWN information only
  get(user_id, _id) {
    if (_id && user_id) {
      return this.model.find({ _id, user_id });
    } else {
      return this.model.find({ user_id });
    }
  }

  // getByUser(_id, user_id) {
  //   try {
  //     if (_id) {
  //       return this.model.find({ _id, user_id });
  //     } else {
  //       return this.model.find({ user_id });
  //     }
  //   }
  //   catch (error) {
  //     return null;
  //   }
  // }

  post(record, user_id) {
    let newRecord = new this.model(record);
    if (newRecord.user_id === user_id) return newRecord.save();
  }

  put(_id, record, user_id) {
    return this.model.findByIdAndUpdate(_id, record, user_id, { new: true });
  }

  delete(_id, user_id) {
    return this.model.findByIdAndDelete(_id, user_id);
  }
}

module.exports = DataCollection;
