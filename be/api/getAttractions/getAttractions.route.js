const express = require('express');
const router = express.Router();
const { getAttractions } = require('./getAttractions.service');

router.route('/')
    .get(
        async (req, res) => {
            try {
                const result = await getAttractions(req) ;
                if (result) {
                    res.status(200).json({err: null, data: result});
                } 
                else 
                {
                    throw new Error('result from attractionsService is null');
                }
            } catch (e) {
                return res.status(500).json({err: 500, data: e});
            }
        });

module.exports = router;