import mongoose, { Schema } from 'mongoose';



const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    images: [{
        public_id: String,
        url: String
    }],
}, { timestamps: true });


const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
