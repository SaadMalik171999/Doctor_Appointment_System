const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    return res
      .status(201)
      .send({ success: true, message: "Doctor Account Applied Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        error,
        message: "Error while applying for doctor",
      });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification?.push(...notification);
    // notification = [];
    // user.seennotification = notification;
    user.notification = [];
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All Notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Error in Notification" });
  }
};

const deleteAllSeenNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    // const seennotification = user.seennotification;
    // const notification = user.notification;
    // seennotification?.push(...notification);
    // notification = [];
    // user.seennotification = notification;
    user.seennotification = [];
    const updatedUser = await user.save();
    res.status(202).send({
      success: true,
      message: "All Notifications are Deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Error in Notification" });
  }
};

module.exports = { applyDoctorController, getAllNotificationController,deleteAllSeenNotificationController };
