import Avatar from '../avatar/Avatar'

export default function SectionCommentsItem({ comment }) {
  return (
    <div className="flex py-2 border-b">
      <div className="w-12">
        <Avatar />
      </div>
      <div className=" flex-1">
        <div className="text-[#1d2129] text-sm">{comment.user_name}</div>
        <div className="text-[#415969] text-sm mt-1 whitespace-pre-line">
          {comment.comment_content}
        </div>
        {/* 评论回复 */}
        {comment.replys.map((reply) => {
          return (
            <div
              className="border-b text-sm bg-[#f7f8fa] p-2 flex"
              key={reply.user_name}
            >
              <div className="w-12">
                <Avatar />
              </div>
              <div className=" flex-1">
                <div className="text-[#1d2129] ">{reply.user_name}</div>
                <div className="text-[#415969] mt-1">{reply.reply_content}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
