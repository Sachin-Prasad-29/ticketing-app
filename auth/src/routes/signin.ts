import express from 'express';
const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send('Hi From sign In');
});

export { router as signInRouter };
