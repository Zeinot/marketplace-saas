import { notFound } from "next/navigation";
import { getLaunchBySlug, getLaunchComments } from "@/lib/actions/launch";
import { LaunchDetail } from "@/components/launch/launch-detail";
import { CommentSection } from "@/components/launch/comment-section";
import { LaunchSidebar } from "@/components/launch/launch-sidebar";
import { MobileLaunchActions } from "@/components/launch/mobile-launch-actions";

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
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10 max-w-6xl mx-auto">
        <main>
          <LaunchDetail launch={data.launch} maker={data.maker} categories={(() => {
            try {
              return JSON.parse(data.categories || "[]");
            } catch {
              return [];
            }
          })()} images={data.images} />
          <MobileLaunchActions launch={data.launch} maker={data.maker} />
          <CommentSection launchId={data.launch.id} comments={comments} />
        </main>
        <aside className="hidden lg:block">
          <LaunchSidebar launch={data.launch} maker={data.maker} />
        </aside>
      </div>
    </div>
  );
}
