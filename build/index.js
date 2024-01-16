"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const dotenv = __importStar(require("dotenv"));
const Post_1 = require("./model/Post");
const JobConsumer_1 = require("./queues/JobConsumer");
const PostJobHandler_1 = __importDefault(require("./queues/PostJobHandler"));
const PostAnalysisPublisher_1 = __importDefault(require("./queues/PostAnalysisPublisher"));
dotenv.config();
class App {
    constructor() {
        //setup redis connection
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
        this.jobPublish = new PostAnalysisPublisher_1.default();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            console.log("Reaced Base");
            res.send("Welcome Home");
        });
        this.app.route("/api/user").post((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Reached the user API");
            const post = req.body;
            try {
                console.log(post);
                const newPost = Post_1.Post.build({
                    id: post.id,
                    name: post.name,
                    description: post.description
                });
                yield newPost.save();
                yield this.jobPublish.publishJob(process.env.QUEUE_NAME, Object.assign({}, post));
                //Produce the message
                res.status(200).send({
                    message: `${post} is saved to DB`
                });
            }
            catch (error) {
                console.log("Post is not saved");
                res.status(400).send({
                    message: "Post can't be saved"
                });
            }
        }));
    }
}
const port = 3000;
const app = new App().app;
//Create the postJobHandler
const postJobHandler = new PostJobHandler_1.default();
app.listen(port, () => {
    console.log(`Server started successfully on ${port}!`);
    const jobConsumer = new JobConsumer_1.JobConsumer(process.env.QUEUE_NAME, postJobHandler);
});
