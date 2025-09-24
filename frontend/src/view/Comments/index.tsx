import './index.css';
import {Comment} from '@jslib/common';

const Comments = (props: {comments: Comment[]}) => {
    const { comments } = props;

    return (
        <div className="comments-section">
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.publishDate} className="comment-item">
                        <div className="comment-content">
                            <div className="comment-header">
                                <span className="comment-user">{comment.user}</span>
                                <span className="comment-time">{comment.publishDate}</span>
                            </div>
                            <div className="comment-text">{comment.comment}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
