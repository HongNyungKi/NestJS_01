import { Router } from "express";
import { createOne, deleteOne, getAll, getOne, partUpdateOne, updateOne } from "./cats.service";

const router = Router();

router.get('/cats', getAll);
router.get('/cat/:id', getOne);
router.post('/cat', createOne);
router.put('/cat/:id', updateOne);
router.patch('/cat/:id', partUpdateOne);
router.delete('/cat/:id', deleteOne);

export default router;