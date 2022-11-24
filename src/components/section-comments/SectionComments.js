import SectionCommentsItem from '../section-comments-item/SectionCommentsItem'

export default function SectionComments({ comments }) {
  return (
    <div className="">
      {comments.map((comment) => {
        return <SectionCommentsItem comment={comment} key={comment.user_id} />
      })}
    </div>
  )
}
