const userModel = (sequelize, Sequelize)=>{
    const User = sequelize.define("User",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        contact:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        }  
    });

    return User;

}

export default userModel