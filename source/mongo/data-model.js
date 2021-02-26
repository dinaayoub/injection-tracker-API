'use strict';

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  // we pass the user ID that we received in the request to make sure 
  // the user is getting access to their OWN information only
  get(user_id, _id) {
    console.log(`user id = ${user_id} and _id = ${_id}`);
    console.log(typeof user_id);
    if (_id && user_id) {
      return this.model.findOne({ _id, user_id }).exec();
    } else {
      return this.model.find({ user_id }).exec();
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

  post(record) {
    console.log(`RECORD = ${record}`);
    let newRecord = new this.model(record);
    return newRecord.save();
  }

  put(_id, record) {
    // console.log(`record = `, record);
    // console.log(`_id = `, _id);
    let updatedRecord = this.model.findOneAndUpdate({ _id, user_id: record.user_id }, record, { new: true });
    // console.log(`updated record = `, updatedRecord);
    return updatedRecord;
  }

  delete(_id, user_id) {
    let deletedRecord = this.model.findOneAndDelete({ _id, user_id });
    if (deletedRecord) return deletedRecord;
    else return 'Item doesn\'t exist or access is denied';
  }
}

module.exports = DataCollection;
