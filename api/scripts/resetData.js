require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const User = require("../src/models/User");
const Course = require("../src/models/Course");
const cloudinary = require("../src/config/cloudinaryConfig");

// IDs of items to preserve
const adminId = process.env.ADMIN_ID; // Test Admin ID from env variables
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD; // Admin password from env variables
const exampleCourseId = process.env.EXAMPLE_COURSE_ID;

// Data to restore
const testAdminData = {
  _id: new mongoose.Types.ObjectId(adminId),
  customId: 1,
  name: "Test Admin",
  email: adminEmail,
  password: adminPassword,
  role: "admin",
  courses: [
    new mongoose.Types.ObjectId("67001dc00f968533a71ee9e7"),
    new mongoose.Types.ObjectId("6719148235e3da83b8604cbe"),
    new mongoose.Types.ObjectId(exampleCourseId),
  ],
};

const exampleCourseData = {
  _id: new mongoose.Types.ObjectId(exampleCourseId),
  customId: 2,
  name: "Python Programming",
  category: "Programming",
  teacher: "Python Pete",
  description: `Welcome to the wonderful world of Python programming...`,
  price: 133,
  imageSrc:
    "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1729701504/courses/w7gtcus4i4s2ion0jxjx.jpg",
  students: [
    new mongoose.Types.ObjectId(adminId),
    new mongoose.Types.ObjectId("67195e6ceb53edcb66acf378"),
  ],
  sections: [
    {
      _id: new mongoose.Types.ObjectId("671926a198e9fa193411eaf8"),
      title: "Unit 1: Python Pete's Super Variable Adventure",
      description: "Hold on to your keyboards as Python Pete takes you on...",
      videoUrl: "",
      sectionImage:
        "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1729715111/sections/fnf8w8m6mgexlnfcztfw.jpg",
    },
    {
      _id: new mongoose.Types.ObjectId("671926ba98e9fa193411eafc"),
      title: "Unit 2: Python Pete and the Mystery of the Endless Loop",
      description: "Ever wondered how to make your computer repeat things...",
      videoUrl: "https://www.youtube.com/watch?v=RK1RRVR9A2g&t=9s",
      sectionImage: null,
    },
    // Add other sections...
  ],
};

// Function to reset the database
const resetData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Reset admin user (update existing or create new)
    await User.findByIdAndUpdate(adminId, testAdminData, {
      upsert: true,
      new: true,
    });

    // Reset example course (update existing or create new)
    await Course.findByIdAndUpdate(exampleCourseId, exampleCourseData, {
      upsert: true,
      new: true,
    });

    // **Delete other users** (only keep the specified admin)
    await User.deleteMany({ _id: { $ne: adminId } });

    // **Delete other courses** (only keep the specified example course)
    await Course.deleteMany({ _id: { $ne: exampleCourseId } });

    // Clean up Cloudinary images that are not needed
    const courses = await Course.find({ _id: { $ne: exampleCourseId } });
    for (const course of courses) {
      if (course.imageSrc) {
        const publicId = extractPublicId(course.imageSrc);
        await cloudinary.uploader.destroy(publicId);
      }
      // Delete section images if they exist
      if (course.sections) {
        for (const section of course.sections) {
          if (section.sectionImage) {
            const sectionPublicId = extractPublicId(section.sectionImage);
            await cloudinary.uploader.destroy(sectionPublicId);
          }
        }
      }
    }
    console.log("Database and Cloudinary reset complete");
  } catch (error) {
    console.error("Error during reset:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Function to extract Cloudinary public ID from URL
const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileNameWithExtension = parts.pop();
  const publicId = fileNameWithExtension.split(".")[0];
  return publicId;
};

// Call the reset function
resetData();
