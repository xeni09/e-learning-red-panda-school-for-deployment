require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const User = require("../src/models/User");
const Course = require("../src/models/Course");
const cloudinary = require("../src/config/cloudinaryConfig");

// IDs of items to preserve
const adminId = process.env.ADMIN_ID;
const exampleCourseId = process.env.EXAMPLE_COURSE_ID;

// Admin credentials
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

// Function to extract Cloudinary public ID from URL
const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileNameWithExtension = parts.pop().split("?")[0];
  const publicId = fileNameWithExtension.split(".")[0];
  return publicId;
};

// Data to restore
const testAdminData = {
  _id: new mongoose.Types.ObjectId(adminId),
  customId: 1,
  name: "Test Admin",
  email: adminEmail,
  password: adminPassword,
  role: "admin",
  courses: [new mongoose.Types.ObjectId(exampleCourseId)],
};

const exampleCourseData = {
  _id: new mongoose.Types.ObjectId(exampleCourseId),
  customId: 2,
  name: "Python Programming",
  category: "Programming",
  teacher: "Python Pete",
  description: `Welcome to the wonderful world of Python programming...`,
  price: 49.99,
  imageSrc:
    "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1729701504/courses/w7gtcus4i4s2ion0jxjx.jpg",
  students: [new mongoose.Types.ObjectId(adminId)],
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
    {
      _id: new mongoose.Types.ObjectId("671e851a53aa31b42f97657f"),
      title:
        "Unit 3: Python Pete’s Epic Battle with the Fearsome If-Else Monster",
      description:
        "Join Python Pete as he faces off against the legendary If-Else Monster! Can he make the right decisions to conquer this conditional foe?",
      videoUrl: "",
      sectionImage: null,
    },
    {
      _id: new mongoose.Types.ObjectId("671e857b53aa31b42f9765b9"),
      title: "Unit 4: Python Pete and the Lists of Lost Loops",
      description:
        "Pete’s found a mysterious cave filled with looping lists. He’ll need all his skills to navigate through each element without getting lost!",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdown.mp4",
      sectionImage: null,
    },
  ],
};

// Function to reset the database
const resetData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Delete all users except the specified admin
    await User.deleteMany({ _id: { $ne: adminId } });

    // Delete all courses except the example course
    await Course.deleteMany({ _id: { $ne: exampleCourseId } });

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

    // Clean up Cloudinary images for non-example courses and sections
    const coursesToDelete = await Course.find({
      _id: { $ne: exampleCourseId },
    });
    for (const course of coursesToDelete) {
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

// Call the reset function
resetData();
