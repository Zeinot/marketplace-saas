import { notFound } from "next/navigation";
import { getLaunchBySlug, getLaunchComments } from "@/lib/actions/launch";
import { LaunchDetail } from "@/components/launch/launch-detail";
import { CommentSection } from "@/components/launch/comment-section";

export default async function LaunchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getLaunchBySlug(slug);

  if (!data) {
    notFound();
  }

  const comments = await getLaunchComments(data.launch.id);

  return (
    <div className="container py-8 max-w-4xl">
      <LaunchDetail launch={data.launch} maker={data.maker} categories={JSON.parse(data.categories || "[]")} images={data.images} />
      <CommentSection launchId={data.launch.id} comments={comments} />
    </div>
  );
}
