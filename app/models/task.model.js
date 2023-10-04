const taskModel = (sequelize, Sequelize)=>{
    const task = sequelize.define("Task",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return task;

}

export default taskModel