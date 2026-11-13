import { ImageResponse } from "next/og";

export const alt = "Zekured: save, invest, insure and lend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000",
        color: "#fff",
        padding: 72,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 700 }}
      >
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#29CBEF" }} />
        Zekured
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.05,
        }}
      >
        <span>Experience Seamless Finance with</span>
        <span style={{ color: "#29CBEF", fontStyle: "italic" }}>100% Digital Convenience</span>
      </div>
      <div style={{ fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
        Save · Invest · Insure · Lend
      </div>
    </div>,
    size,
  );
}
