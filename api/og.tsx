import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// export default (req: Request) => {
//   return new Response(`Hello, from ${req.url} I'm now an Edge Function!`);
// };

console.log(new URL('../assets/TYPEWR__.ttf', import.meta.url))
const font = fetch(new URL('../assets/TYPEWR__.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function () {
  const fontData = await font
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

      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Typewriter',
          data: fontData,
          style: 'normal',
        }
      ]
    },
  );
}