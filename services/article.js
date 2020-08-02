const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;
class Article extends Model{
  static async  findAllArticles(){
    return Article.findAll();
  }
}
Article.init({
    // attributes
    link:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    publishedAt:{
        type: Sequelize.DATE
    }
  }, {
    sequelize: db,
    modelName: 'article',
    // options
  });


module.exports = Article;


