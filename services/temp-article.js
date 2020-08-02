const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;
class TempArticle extends Model{
  static async  findAllArticles(){
    return TempArticle.findAll();
    }
  static async deleteTempArticle(id){
    return TempArticle.destroy({
      where:{
        id,
      }
    });
  }
}
TempArticle.init({
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
    modelName: 'temparticle',
    // options
  });


module.exports = TempArticle;


