const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('./db');
// const users = [
    // {id: 1,email: 'minhhoang@gmail.com', displayName:'Minh Hoang',password: '$2b$10$2EGRSBhBtJTU6Z46prgJuuoO15U7biMjLpEfqXY7QQAeoqvzQiQIe'},
    // {id: 2,email: '1760070', displayName:'Minh Hoang',password: '$2b$10$t7MhTIi5wWoSrV/nFkvX9O50RP5T4P8vVEiPfiAST0SYxvduXqEeW'},
// ];

const Model = Sequelize.Model;
class User extends Model {
  static verifyPassword(password,passwordHash){
       return bcrypt.compareSync(password,passwordHash);
   }
   static hashPassword(password){
       return bcrypt.hashSync(password, 10);
   }
    static async findUserById(id){
        return User.findByPk(id);
    
    }
    static async findAllUsers(){
      return User.findAll();
    }
    static async findUserByEmail(email){
        return User.findOne({
            where: {
                email,
            }
        });
     }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique : true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  token:{
    type: Sequelize.STRING,
  },
}, {
  sequelize: db,
  modelName: 'user',
  // options
});

module.exports = User;