type TechnicalCalloutProps = Readonly<{
  title: string;
  summary: string;
  focus: string[];
}>;

export function TechnicalCallout({
  title,
  summary,
  focus,
}: TechnicalCalloutProps) {
  return (
    <div className="border-l-2 border-accent bg-surface p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
        Planned primary deep dive
      </p>
      <h3 className="mt-5 max-w-[26ch] text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
        {title}
      </h3>
      <p className="mt-5 max-w-[66ch] leading-relaxed text-secondary">{summary}</p>
      <ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
        {focus.map((item, index) => (
          <li key={item} className="bg-background p-4 text-sm text-secondary">
            <span className="mr-3 font-mono text-xs text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
