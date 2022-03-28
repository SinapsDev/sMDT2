import express from "express";

export type MyContext = {
    req: Request & { session: express.Session };
    res: express.Response;
}