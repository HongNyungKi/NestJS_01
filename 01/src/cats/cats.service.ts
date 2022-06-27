import { Cat } from "./cats.model";
import { Request, Response } from "express";


// READ 전체 조회
export const getAll = (req: Request, res: Response) => {
    try {
        const cats = Cat;

        res.status(200).send({
            success: true,
            data: { cats },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
};

// READ 단일 조회
export const getOne = (req: Request, res: Response) => {
    try {
        const params = req.params

        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        });

        res.status(200).send({
            success: true,
            data: { cat },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
};

// CREATE 정보 추가
export const createOne = (req: Request, res: Response) => {
    try {
        const newCat = req.body;

        Cat.push(newCat);

        res.status(200).send({
            success: true,
            data: { newCat },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
};

// UPDATE 정보 전체 변경
export const updateOne = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;

        let result;

        Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = body;
                result = cat;
            }
        });

        res.status(200).send({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
};

// UPDATE 정보 부분 변경
export const partUpdateOne = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;

        let result;

        Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = { ...cat, ...body };
                result = cat;
            }
        });

        res.status(200).send({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
};

// DELETE 삭제
export const deleteOne = (req: Request, res: Response) => {
    try {
        const params = req.params;

        const newCatArray = Cat.filter((cat) => cat.id !== params.id);

        res.status(200).send({
            success: true,
            data: newCatArray,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
};