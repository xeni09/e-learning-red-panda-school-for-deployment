/**
 * Script para insertar cursos de prueba en la base de datos.
 *
 * Para ejecutar el script, usa el siguiente comando desde la raíz del proyecto:
 *
 *    node scripts/seedCourses.js
 *
 * Asegúrate de tener la conexión a la base de datos correctamente configurada y de que el modelo Course está disponible.
 */

const mongoose = require("mongoose");
const Course = require("../models/Course"); // Asegúrate de que la ruta al modelo sea correcta

// Conectar a la base de datos
mongoose.connect("mongodb://localhost:27017/your-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testCourses = [
  {
    category: "Programming",
    teacher: "Alpaca McFluff",
    name: "Alpaca Algorithms",
    description:
      "Learn the fundamentals of algorithms with the fluffiest coder around.",
    imageSrc: "/assets/images/alpaca.webp", // Ruta relativa
    imageAlt: "An alpaca representing the Programming course",
    participants: 150,
    positiveReviews: 98,
    price: 59.99,
  },
  {
    category: "Design",
    teacher: "Catnip Whiskers",
    name: "Cat Creations",
    description:
      "Unleash your creativity with design principles taught by a curious cat.",
    imageSrc: "/assets/images/cat.jpeg", // Ruta relativa
    imageAlt: "A cat representing the Design course",
    participants: 90,
    positiveReviews: 93,
    price: 49.99,
  },
  {
    category: "Marketing",
    teacher: "Bearington Bear",
    name: "Bear Branding",
    description:
      "Master the art of branding with the most strategic bear in the forest.",
    imageSrc: "/assets/images/bear.jpeg", // Ruta relativa
    imageAlt: "A bear representing the Marketing course",
    participants: 120,
    positiveReviews: 95,
    price: 39.99,
  },
  {
    category: "Business",
    teacher: "Camelot Humps",
    name: "Camel Commerce",
    description:
      "Navigate the business landscape with insights from a wise camel.",
    imageSrc: "/assets/images/camel.webp", // Ruta relativa
    imageAlt: "A camel representing the Business course",
    participants: 110,
    positiveReviews: 97,
    price: 69.99,
  },
  {
    category: "Programming",
    teacher: "Python Pete",
    name: "Python Programming",
    description:
      "Dive into Python programming with the expertise of Python Pete.",
    imageSrc: "/assets/images/python.jpg", // Ruta relativa
    imageAlt: "A python representing the Programming course",
    participants: 130,
    positiveReviews: 94,
    price: 59.99,
  },
  {
    category: "Art",
    teacher: "Giraffey Longneck",
    name: "Giraffe Gallery",
    description:
      "Paint the world with creativity under the guidance of a tall and talented giraffe.",
    imageSrc: "/assets/images/giraffe.jpeg", // Ruta relativa
    imageAlt: "A giraffe representing the Art course",
    participants: 70,
    positiveReviews: 94,
    price: 49.99,
  },
  {
    category: "Photography",
    teacher: "Lemur Leap",
    name: "Lemur Photography",
    description:
      "Capture moments with precision and skill from the sharp-eyed lemur.",
    imageSrc: "/assets/images/lemur.jpeg", // Ruta relativa
    imageAlt: "A lemur representing the Photography course",
    participants: 60,
    positiveReviews: 96,
    price: 39.99,
  },
  {
    category: "Design",
    teacher: "Panda Picasso",
    name: "Panda Patterns",
    description: "Explore design patterns with the artistic Panda Picasso.",
    imageSrc: "/assets/images/panda.jpg", // Ruta relativa
    imageAlt: "A panda representing the Design course",
    participants: 85,
    positiveReviews: 92,
    price: 49.99,
  },
  {
    category: "Marketing",
    teacher: "Foxie Fox",
    name: "Foxie Funnels",
    description: "Learn about marketing funnels with the clever Foxie Fox.",
    imageSrc: "/assets/images/fox.jpg", // Ruta relativa
    imageAlt: "A fox representing the Marketing course",
    participants: 100,
    positiveReviews: 93,
    price: 39.99,
  },
];

const seedCourses = async () => {
  try {
    // Limpiar la colección antes de insertar los cursos de prueba
    await Course.deleteMany({});

    // Obtener el último curso en la base de datos para determinar el próximo customId
    const lastCourse = await Course.findOne().sort({ customId: -1 });
    let newCustomId = lastCourse ? lastCourse.customId + 1 : 1;

    // Asignar customId a cada curso de prueba
    const coursesWithCustomIds = testCourses.map((course) => {
      course.customId = newCustomId++;
      return course;
    });

    // Insertar los cursos en la base de datos
    await Course.insertMany(coursesWithCustomIds);
    console.log("Courses seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding courses:", error);
    mongoose.connection.close();
  }
};

seedCourses();
