import {Request, Response} from "express";
import {SearchQueryModel} from "../models/SearchQueryModel";
import {getAllQuestions} from "../db/question";
import {getFullQuestion} from "../models/db/Question";
import {levenshteinDistance} from "../levenshtein";
import {getRatingByID} from "../db/rating";
import {getAllUsers} from "../db/user";
import {FullQuestion} from "../models/FullQuestion";

export const searchRequest = async (req: Request<{}, {}, SearchQueryModel>, res: Response) => {
    if (req.body.Questions == undefined) {
        res.status(400).send({message: "You must have a Questions key!"});
        return;
    }
    if (req.body.Users == undefined) {
        res.status(400).send({message: "You must have a Users key!"});
        return;
    }
    if (req.body.SearchQuery == undefined) {
        res.status(400).send({message: "You must have a SearchQuery key!"});
        return;
    }
    if (req.body.maxDifficulty == undefined) {
        res.status(400).send({message: "You must have a max difficulty key!"});
        return;
    }
    if (req.body.minDifficulty == undefined) {
        res.status(400).send({message: "You must have a min difficulty key!"});
        return;
    }
    if (req.body.maxReadability == undefined) {
        res.status(400).send({message: "You must have a max readability key!"});
        return;
    }
    if (req.body.minReadability == undefined) {
        res.status(400).send({message: "You must have a min readability key!"});
        return;
    }
    if (req.body.tags == undefined) {
        res.status(400).send({message: "You must have a tags key!"});
        return;
    }

    if (!req.userID) {
        res.status(400).send({message: "This should be impossible!"});
        return;
    }

    let questions = await getAllQuestions();
    if (!questions) {
        res.status(500).send({message: "Something went wrong"});
        return;
    }

    questions = questions.filter((q) => q.published);
    let fullQs: FullQuestion[] = [];
    for (let question of questions) {
        try {
            const fullQ: FullQuestion = await getFullQuestion(question.question_id as number, req.userID);
            const rating = await getRatingByID(fullQ.question_id.toString());
            if (!rating) {
                res.status(500).send({message: "No ratings found!??"});
                return;
            }

            if (rating.difficulty > req.body.maxDifficulty || rating.difficulty < req.body.minDifficulty) {
                continue;
            }

            if (rating.readability > req.body.maxReadability || rating.readability < req.body.minReadability) {
                continue;
            }

            fullQs.push(fullQ);
        } catch (e: any) {
            if (e instanceof Error) {
                res.status(400).send({message: e.message});
                return;
            }
            res.status(400).send({message: "Unknown error occurred"});
        }
    }

    for (let tag of req.body.tags) {
        fullQs = fullQs.filter((fq) => {
            if (!fq.tags) {
                return false;
            }
            return (fq.tags as string[]).includes(tag);
        })
    }

    fullQs = fullQs.sort((a, b) => levenshteinDistance(a.title, req.body.SearchQuery) - levenshteinDistance(b.title, req.body.SearchQuery))

    let users = await getAllUsers()
    if (!users) {
        res.status(500).send({message: "Something went wrong"});
        return;
    }
    users = users.sort((a, b) => levenshteinDistance(a.username, req.body.SearchQuery) - levenshteinDistance(b.username, req.body.SearchQuery))
    users = users.slice(0, 10);
    users = users.map((u) => {
        u.password = "";
        return u;
    })

    if (!req.body.Users) {
        users = []
    }

    if (!req.body.Questions) {
        fullQs = []
    }

    res.status(200).send({message: "Search done!", results: {questions: fullQs, users: users}})
};
