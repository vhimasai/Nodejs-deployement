const profileModel = (sequelize, Sequelize)=>{
    const profile = sequelize.define("Profile",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        bio:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return profile;

}

export default profileModel