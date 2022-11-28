import Avatar from "../avatar/Avatar";

export default function SectionCommentsItem({ comment }) {
  return (
    <div className="flex border-b py-2">
      <div className="w-12">
        <Avatar />
      </div>
      <div className=" flex-1">
        <div className="text-sm text-[#1d2129]">{comment.user_name}</div>
        <div className="mt-1 whitespace-pre-line text-sm text-[#415969]">
          {comment.comment_content}
        </div>
        {/* 评论回复 */}
        {comment.replys.map((reply) => {
          return (
            <div
              className="flex rounded-md border-b bg-[#f7f8fa] p-2 text-sm"
              key={reply.user_name}
            >
              <div className="w-12">
                <Avatar />
              </div>
              <div className=" flex-1">
                <div className="text-[#1d2129] ">{reply.user_name}</div>
                <div className="mt-1 text-[#415969]">{reply.reply_content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
