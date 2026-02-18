const Doctor = require("../models/Doctor.model");
const Consultation = require("../models/Consultation.model");

exports.createDoctor = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json(doctor);
};

exports.softDeleteDoctor = async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });
  await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });
  res.json({ message: "Doctor deactivated & consultations soft deleted" });
};

exports.getDoctorPatients = async (req, res) => {
  const consultations = await Consultation.find({ doctorId: req.params.id, isActive: true })
    .populate("patientId", "name age gender")
    .select("patientId consultedAt")
    .sort({ consultedAt: -1 })
    .limit(5);

  res.json(consultations);
};

exports.getDoctorConsultationCount = async (req, res) => {
  const count = await Consultation.countDocuments({ doctorId: req.params.id, isActive: true });
  res.json({ totalConsultations: count });
};