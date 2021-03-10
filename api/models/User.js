/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcryptjs');

module.exports = {
  datastore: "mongoDb",

    attributes: {
      email:{
      type: 'string',
      required: true,
      unique: true
      },
      password:{
      type: 'string',
      required: true
      },
      username:{
        type: 'string',
        required: true
      },
      role:{
        type: 'string',
        required: true
      }
    },

    beforeCreate: function(values, cb) {
        // Hash password
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) return cb(err);
            values.password = hash;
            cb();
        });
    }
};

