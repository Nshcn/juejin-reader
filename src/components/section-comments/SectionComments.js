import SectionCommentsItem from "../section-comments-item/SectionCommentsItem";

export default function SectionComments({ comments }) {
  return (
    <div>
      {comments.map((comment, idx) => {
        return (
          <SectionCommentsItem comment={comment} key={comment.user_id + idx} />
        );
      })}
    </div>
  );
}
