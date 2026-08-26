type SocialImageProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function SocialImage({
  eyebrow,
  title,
  description,
}: SocialImageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0b0b",
        color: "#f2f0ea",
        padding: "64px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          paddingBottom: "28px",
          color: "#a3a3a0",
          fontSize: 20,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span>James.</span>
        <span style={{ color: "#b8ff5a" }}>{eyebrow}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            maxWidth: 1020,
            fontSize: title.length > 42 ? 74 : 96,
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: "-0.055em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            maxWidth: 920,
            marginTop: 34,
            color: "#a3a3a0",
            fontSize: 27,
            lineHeight: 1.35,
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#a3a3a0",
          fontSize: 19,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#b8ff5a",
          }}
        />
        AI-Focused Software Engineer
      </div>
    </div>
  );
}
