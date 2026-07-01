import { ImageResponse } from "next/og";

export const alt = "Techuncos — AI, Technology & Digital, in your language";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated default social-preview image (Open Graph / Twitter). Applies to
 * every route via the file convention, so no static asset is required.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#05070D",
          padding: "80px",
          color: "#F5F8FC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "44px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #22D3EE, #3B82F6)",
            }}
          />
          <div style={{ fontSize: "36px", fontWeight: 700 }}>Techuncos</div>
        </div>

        <div style={{ display: "flex", fontSize: "72px", fontWeight: 700, lineHeight: 1.05 }}>
          Intelligence,
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#38BDF8",
          }}
        >
          rendered clearly.
        </div>

        <div style={{ display: "flex", fontSize: "30px", color: "#A6B2C4", marginTop: "32px" }}>
          AI · Technology · Digital — in your language
        </div>
      </div>
    ),
    { ...size },
  );
}
