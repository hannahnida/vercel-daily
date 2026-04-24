import { ImageResponse } from 'next/og';

export const alt = 'Vercel Daily — News and insights for modern web developers.';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '64px',
          background: '#0a0a0a',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: '64px',
            height: '6px',
            background: '#fff',
            borderRadius: '3px',
            marginBottom: '32px',
          }}
        />

        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}
        >
          Vercel Daily
        </div>

        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 400,
          }}
        >
          News and insights for modern web developers.
        </div>
      </div>
    ),
    { ...size },
  );
}

