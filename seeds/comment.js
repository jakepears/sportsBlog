const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "No way!",
        user_id: 2,
        post_id: 3,
        
    },
    {
        comment_text: "First Comment :)",
        user_id: 2,
        post_id: 5,
        
    },
    {
        comment_text: "Is this believable?",
        user_id: 4,
        post_id: 1,
        
    },
    {
        comment_text: "Nice.",
        user_id: 3,
        post_id: 5,
        
    },
    {
        comment_text: "Groundbreaking stuff, going to follow this post closely.",
        user_id: 3,
        post_id: 4,
        
    },
    {
        comment_text: "As if!",
        user_id: 2,
        post_id: 1,
        
    },
    {
        comment_text: "Right, you're entitled to your own opinion.",
        user_id: 5,
        post_id: 3,
        
    },
    {
        comment_text: "Awesome, I'd like to know more.",
        user_id: 2,
        post_id: 1,
        
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;