const Patient = require("../models/Patient.model");
const Consultation = require("../models/Consultation.model");

exports.createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
};

exports.softDeletePatient = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { isActive: false });
  await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });
  res.json({ message: "Patient deactivated & consultations soft deleted" });
};

exports.getPatientDoctors = async (req, res) => {
  const consultations = await Consultation.find({ patientId: req.params.id, isActive: true })
    .populate("doctorId", "name specialization")
    .select("doctorId consultedAt");

  res.json(consultations);
};

exports.getMalePatients = async (req, res) => {
  const patients = await Patient.find({ gender: "Male", isActive: true });
  res.json(patients);
};