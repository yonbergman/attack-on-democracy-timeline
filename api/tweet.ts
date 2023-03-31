import type { VercelRequest, VercelResponse } from '@vercel/node';
import Twit from 'twit';
import { humanizeDate } from '../src/_data/utilities';
const { isValidSignature, SIGNATURE_HEADER_NAME } = require('@sanity/webhook');

const tweet = (message: string) => {
  var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token: process.env.TWITTER_ACCESS_TOKEN!,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  });
  return T.post('statuses/update', { status: message }, function (err, data, response) {
    if (err) {
      console.log(err);
    }
  });
};

interface RootObject {
  body: string;
  title: string;
  datetime: string;
  _type: string;
  categories: string[];
  _updatedAt: string;
  color: string;
  slug: Slug;
  _createdAt: string;
  _id: string;
  _rev: string;
  protesterAmount: number;
  icon: string;
}

interface Slug {
  _type: string;
  current: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readBody(req); // Read the body into a string
  if (!isValidSignature(body, signature, process.env.TWEET_WEBHOOK_TOKEN)) {
    console.warn('INVALID SIGNATURE');
    res.status(401).json({ success: false, message: 'Invalid signature' });
    return;
  }
  const entry = req.body as RootObject;
  console.log(entry);

  console.log('Waiting 15 seconds...');
  await wait(15000);
  console.log('Posting to Twitter');

  try {
    const date = humanizeDate(entry.datetime);
    const message = `${date}\n${entry.title}\n\nhttps://fightfordemocracystory.co.il/l/${entry.slug.current}`;
    console.log(message);
    await tweet(message);

    res.status(200).json({
      message: message,
    });
  } catch {
    res.status(200).json({
      message: 'Internal Server Error',
    });
  }
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
