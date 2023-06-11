const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const mariadb =require('mariadb');
// 创建sequelize实例
const sequelize = new Sequelize('opinions', 'root', 'passwd', {
  host: 'localhost',
  dialect: 'mariadb'
});

// 定义数据模型
const Opinion = sequelize.define('opinion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT }
});

// 初始化数据模型
(async () => {
  try {
    await Opinion.sync();
    console.log('Data model synchronized');
  } catch (error) {
    console.error('Unable to sync data model', error);
  }
})();

// 创建Express app实例
const app = express();
app.use(bodyParser.json());

// 定义接口路由和处理方法
app.post('/api/opinions', async (req, res) => {
  try {
    const opinion = await Opinion.create(req.body);
    res.json(opinion.toJSON());
  } catch (error) {
    console.error('Unable to create opinion', error);
    res.sendStatus(500);
  }
});

// 启动Express app
app.listen(3000, () => {
  console.log('Opinions server listening on port 3000');
});
