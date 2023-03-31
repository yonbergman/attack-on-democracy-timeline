import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// export default (req: Request) => {
//   return new Response(`Hello, from ${req.url} I'm now an Edge Function!`);
// };


export default async function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: '"Typewriter"',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
      ]
    },
  );
}