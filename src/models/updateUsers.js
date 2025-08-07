const mongoose = require("mongoose");
 // Adjust the path if needed

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/User", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Function to update existing users
async function updateExistingUsers() {
  try {
    const result = await User.updateMany(
      {}, 
      { 
        $set: { 
          name: "Unknown", 
          contact: 451585575, 
          designation: "Not Provided", 
          dob: new Date("2000-01-01") 
        } 
      }
    );
    
    console.log(`${result.modifiedCount} users updated successfully!`);
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    mongoose.connection.close(); // ✅ Close the DB connection after execution
  }
}

// ✅ Run the function
updateExistingUsers();
