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

// URLs de las imágenes a conservar
const urlsToKeep = [
  "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1730065726/courses/avi8cgbpt2mgvd7lru1y.jpg",
  "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1730066691/sections/e4ovjpmi9pk9ormsqzwm.jpg",
];

const imagePublicIdsToKeep = urlsToKeep.map((url) => {
  const publicId = extractPublicId(url);
  // Agregar prefijo basado en la carpeta de origen
  if (url.includes("/courses/")) {
    return `courses/${publicId}`;
  } else if (url.includes("/sections/")) {
    return `sections/${publicId}`;
  }
  return publicId;
});

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
  description: `Welcome to the wonderful world of Python programming! Join Python Pete as he guides you through coding essentials with adventure-packed lessons designed to unlock your coding powers. Whether you're learning the basics or mastering advanced tricks, this course will turn programming into an unforgettable journey.`,
  price: 49.99,
  imageSrc:
    "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1730065726/courses/avi8cgbpt2mgvd7lru1y.jpg",
  students: [new mongoose.Types.ObjectId(adminId)],
  sections: [
    {
      _id: new mongoose.Types.ObjectId("671926a198e9fa193411eaf8"),
      title: "Unit 1: Python Pete's Super Variable Adventure",
      description:
        "Hold on to your keyboards as Python Pete embarks on his Super Variable Adventure! In this unit, Pete discovers the magical world of variables, where names hold the power to transform data. From capturing secret numbers to storing strings of wisdom, join Pete as he unlocks the hidden power of variables and learns to command data like a true coding hero! Will he be able to name them all before they vanish into the digital ether? Only one way to find out!",
      videoUrl: "",
      sectionImage:
        "https://res.cloudinary.com/dgsp4dfbt/image/upload/v1730066691/sections/e4ovjpmi9pk9ormsqzwm.jpg",
    },
    {
      _id: new mongoose.Types.ObjectId("671926ba98e9fa193411eafc"),
      title: "Unit 2: Python Pete and the Mystery of the Endless Loop",
      description:
        "Ever wondered how to make your computer repeat things over and over without stopping? Python Pete sure does, and in this unit, he stumbles upon the mystical powers of loops. But beware! Not all loops are friendly—some can go on forever if you’re not careful. Follow Pete as he braves the twists and turns of the Endless Loop Forest, mastering for and while loops to navigate his way through with clever escapes. Will Pete find his way out, or will he be trapped forever? Join him to learn the secret exit strategy!",
      videoUrl: "https://www.youtube.com/watch?v=RK1RRVR9A2g&t=9s",
      sectionImage: null,
    },
    {
      _id: new mongoose.Types.ObjectId("671e851a53aa31b42f97657f"),
      title:
        "Unit 3: Python Pete’s Epic Battle with the Fearsome If-Else Monster (no picture added)",
      description:
        "In this thrilling unit, Python Pete confronts the legendary If-Else Monster, a creature known for guarding the gateway to Conditional Land! Only those who can make the right decisions may pass, but one wrong answer, and the If-Else Monster will send you back to the start! Help Pete make wise choices using if, else, and elif, unlocking pathways based on truth and lies. Can you and Pete defeat this monster with the power of conditions, or will the If-Else Monster’s riddles prove too tricky?",
      videoUrl: "",
      sectionImage: null,
    },
    {
      _id: new mongoose.Types.ObjectId("671e857b53aa31b42f9765b9"),
      title:
        "Unit 4: Python Pete and the Lists of Lost Loops (non-youtube video added)",
      description:
        "Our adventure takes Pete to the Cave of Lists, where countless looping lists are said to hold great treasures (and a few traps)! With his trusty knowledge of loops, Pete must navigate through each element in these lists, retrieving valuable items and uncovering secrets. Along the way, he’ll learn the magic of list.append(), pop(), and indexing, helping him solve each list’s mysteries. But watch out for the Ghost of Infinite Loops—one wrong step, and you could be stuck forever! Will Pete’s bravery and skill be enough to conquer the Lists of Lost Loops?",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      sectionImage: null,
    },
  ],
};

const getCloudinaryImages = async (folderPath) => {
  const resources = [];
  let nextCursor = null;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 500,
      next_cursor: nextCursor,
    });

    resources.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources.map((resource) => resource.public_id);
};

// Limpiar las carpetas de imágenes en Cloudinary
const cleanCloudinaryFolder = async () => {
  try {
    const courseImageFolder = "courses";
    const sectionImageFolder = "sections";

    // Obtener todos los publicIds actuales en las carpetas de cursos y secciones
    const courseImages = await getCloudinaryImages(courseImageFolder);
    const sectionImages = await getCloudinaryImages(sectionImageFolder);

    // Combinar todos los publicIds de ambas carpetas
    const allImagesInFolders = [...courseImages, ...sectionImages];

    // Identificar las imágenes que no están en la lista de conservación
    const imagesToDelete = allImagesInFolders.filter(
      (publicId) => !imagePublicIdsToKeep.includes(publicId)
    );

    // Eliminar las imágenes no vinculadas
    for (const publicId of imagesToDelete) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted Cloudinary image: ${publicId}`);
    }

    console.log("Cloudinary cleanup complete. Only linked images remain.");
  } catch (error) {
    console.error("Error during Cloudinary cleanup:", error);
  }
};

// Function to reset the database
const resetData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Llama a la función de limpieza de Cloudinary primero
    await cleanCloudinaryFolder();

    // **Step 1**: Find all courses except the example course to delete Cloudinary images
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

    // **Step 2**: Delete all users except the specified admin
    await User.deleteMany({ _id: { $ne: adminId } });

    // **Step 3**: Delete all courses except the example course
    await Course.deleteMany({ _id: { $ne: exampleCourseId } });

    // **Step 4**: Reset admin user (update existing or create new)
    await User.findByIdAndUpdate(adminId, testAdminData, {
      upsert: true,
      new: true,
      overwrite: true,
    });

    // **Step 5**: Reset example course (update existing or create new)
    await Course.findByIdAndUpdate(exampleCourseId, exampleCourseData, {
      upsert: true,
      new: true,
      overwrite: true,
    });

    console.log("Database and Cloudinary reset complete");
  } catch (error) {
    console.error("Error during reset:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Call the reset function
resetData();
