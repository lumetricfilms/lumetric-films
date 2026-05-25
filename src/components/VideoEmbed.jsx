const embedSources = {
  youtube: ({ videoId }) =>
    videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '',
  drive: ({ fileId }) =>
    fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '',
};

export default function VideoEmbed({ project, title = project?.title }) {
  const sourceFactory = embedSources[project?.platform];
  const src = sourceFactory ? sourceFactory(project) : '';
  const hasPlaceholderId =
    project?.videoId === 'VIDEO_ID_HERE' ||
    project?.fileId === 'GOOGLE_DRIVE_FILE_ID_HERE';

  if (!src || hasPlaceholderId) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-cyan-950/20">
        <div className="relative flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,.22),transparent_28%),linear-gradient(135deg,rgba(39,39,42,.78),rgba(9,9,11,.96))]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
          <div className="relative h-16 w-16 rounded-full border border-cyan-200/40 bg-cyan-300/10 shadow-[0_0_42px_rgba(34,211,238,.45)]">
            <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/3 -translate-y-1/2 border-y-[13px] border-l-[20px] border-y-transparent border-l-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-cyan-950/20">
      <iframe
        className="h-full w-full"
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
