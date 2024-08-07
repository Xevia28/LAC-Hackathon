// import required modules
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const express = require("express")
const http = require("http");
const cors = require("cors")
const session = require("express-session")
const store = new session.MemoryStore()
const { Server } = require("socket.io");
const app = express()

// import the routers
const UserRoute = require("./controllers/userController")
const CaseRoute = require("./controllers/caseController")
const DocxRoute = require("./controllers/documentController")
const MsgRoute = require("./controllers/messageController")
const CDRoute = require("./controllers/courtdateController")
const ConversationRoute = require("./controllers/conversationController")

// load environment variables from .env file into process.env 
dotenv.config({ path: "./.env" })

// connect to database using mongoose
mongoose.connect(process.env.DATABASE).then((con) => {
    console.log("DB connection successful")
}).catch(error => console.log(error));

// middlewares
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 18000000, sameSite: "lax" }, resave: false, saveUninitialized: false, store }));
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use("/api/v1/users", UserRoute)
app.use("/api/v1/cases", CaseRoute)
app.use("/api/v1/documents", DocxRoute)
app.use("/api/v1/messages", MsgRoute)
app.use("/api/v1/courtdates", CDRoute)
app.use("/api/v1/conversations", ConversationRoute)

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

const port = process.env.PORT || 3000
server.listen(3001, () => {
    console.log(`Server running on port: 3001`);
});

app.listen(port, () => { console.log(`Server started on port: ${port}`) })