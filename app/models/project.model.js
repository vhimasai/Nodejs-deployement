const projectModel = (sequelize, Sequelize)=>{
    const project = sequelize.define("Project",{
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

    return project;

}

export default projectModel