const mongoose = require('./config/mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const Account = require('./models/Account')

const dummyUsers = [
  { firstName: "Aman", lastName: "Verma", username: "aman_v" },
  { firstName: "Rahul", lastName: "Sharma", username: "rahul_s" },
  { firstName: "Priya", lastName: "Singh", username: "priya_s" },
  { firstName: "Sneha", lastName: "Kapoor", username: "sneha_k" },
  { firstName: "Vikram", lastName: "Aditya", username: "vikram_a" },
  { firstName: "Anjali", lastName: "Mehta", username: "anjali_m" }
]

async function seedData() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10)

    for (let u of dummyUsers) {
      const exists = await User.findOne({ username: u.username })
      if (!exists) {
        const newUser = await User.create({
          username: u.username,
          password: hashedPassword,
          firstName: u.firstName,
          lastName: u.lastName
        })

        await Account.create({
          userId: newUser._id,
          balance: Math.floor(Math.random() * 9000) + 1000
        })
        console.log(`Created user: ${u.firstName} ${u.lastName}`)
      }
    }
    console.log("All dummy users added successfully!")
    process.exit(0)
  } catch (err) {
    console.error("Error seeding data:", err)
    process.exit(1)
  }
}

// Database connect hone ke baad run karega
setTimeout(seedData, 2000)