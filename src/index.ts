import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import * as dotenv from "dotenv";
import { Post } from "./model/Post";
import { JobConsumer } from "./queues/JobConsumer";
import PostAnalysisJobHandler from "./queues/PostJobHandler";
import PostAnalysisPublisher from "./queues/PostAnalysisPublisher";
dotenv.config();


class App {
    public app: Application;
    private jobPublish: PostAnalysisPublisher;

    constructor() {
        //setup redis connection
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
        this.jobPublish = new PostAnalysisPublisher()
    }
    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
      }
    
      protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
      }
    

    protected routes(): void{
        this.app.route("/").get((req: Request, res: Response) => {
            console.log("Reaced Base");
            res.send("Welcome Home");
        });
        this.app.route("/api/user").post(async (req: Request, res: Response) => {
            console.log("Reached the user API");
            const post = req.body;
            try {
                console.log(post)
                const newPost = Post.build({
                    id: post.id,
                    name: post.name,
                    description: post.description
                });

                await newPost.save();
                await this.jobPublish.publishJob(process.env.QUEUE_NAME as string, {...post})

                //Produce the message

                res.status(200).send({
                    message: `${post} is saved to DB`
                })
            } catch (error) {
                console.log("Post is not saved");
                res.status(400).send({
                    message: "Post can't be saved"
                });
                await this.jobPublish.publishJob(process.env.QUEUE_NAME as string, {...post})
            }
        })
    }
}

const port: number = 3000;
const app = new App().app;

//Create the postJobHandler
const postJobHandler = new PostAnalysisJobHandler();

app.listen(port, () => {
  console.log(`Server started successfully on ${port}!`);

  const jobConsumer = new JobConsumer(process.env.QUEUE_NAME as string, postJobHandler);
});