import db from "../models/index.js";
import msg from "../utils/response.js";
const Profile = db.profile
const Users = db.users

const _createProfile = async (req, res) => {
    try {
        const { userId, bio } = req.body;
        const updatedProfle = await Profile.update({ bio }, { where: { userId } });
        
        if (updatedProfle[0]=== 1) {
            return msg.successMsg(res, 200, { userId, bio }, "User updated successfully...");
        } else {
            const data = await Profile.create({ userId, bio });
            return msg.successMsg(res, 201, data, "Profile created successfully...");
        }
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}


const _getAllProfiles = async (req, res) => {
    try {
        const allProfile = await Profile.findAll({ include: [Users] });

        return msg.successMsg(res, 201, allProfile, "All profile returned successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getProfileByPk = async (req, res) => {
    const { profileId } = req.params;
    try {
        const data = await Profile.findByPk(profileId, { include: [Users] });

        return msg.successMsg(res, 201, data, "Profile returned successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getUserProfilesById = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await Users.findByPk(userId, { include: [Profile] });

        return msg.successMsg(res, 201, data, "User returned successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}


export default { _createProfile, _getAllProfiles, _getProfileByPk, _getUserProfilesById }