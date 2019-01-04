const express = require("express");
const router = express.Router();
const Pusher =require("pusher");
const Vote = require("../Models/Vote");
const mongoose = require("mongoose");

var pusher = new Pusher({
    appId: 'PUSHER_ID',
    key: 'YOUR_PUSHER_KEY',
    secret: 'YOUR_PUSHER_SECRET',
    cluster: 'eu',
    encrypted: true
  });
  

router.get("/", (req, res)=> {
    Vote.find().then(votes => res.json({success: true, votes : votes}));
//    res.send("hello"+"<a href='/'>Back</a>");

});

router.post("/", (req,res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(vote =>  {
        pusher.trigger('os-poll', 'os-vote', {
            points : parseInt(vote.points),
            os: vote.os
          });
      return res.json({ success: true, message : 'Thank You for Voting'});

    });  
});

module.exports = router;