var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: {type: String},
  link:  {type: String},
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


/* Add an upvote() method to the Posts schema in Posts.js */
PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
  return this;
};



mongoose.model('Post', PostSchema);


/*
Here we've defined a model called Post with several attributes corresponding 
to the type of data we'd like to store. We've declared our upvotes field to be 
initialized to 0 and we've set our comments field to an array of Comment references. 
This will allow us to use Mongoose's built in populate() method to easily retrieve all 
comments associated with a given post.
*/