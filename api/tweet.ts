import type { VercelRequest, VercelResponse } from '@vercel/node';
import Twit from 'twit';
import { humanizeDate } from '../src/_data/utilities';
const { isValidSignature, SIGNATURE_HEADER_NAME } = require('@sanity/webhook');

const tweet = (message: string) => {
  return new Promise((resolve, reject) => {
    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY!,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
      access_token: process.env.TWITTER_ACCESS_TOKEN!,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
    return T.post('statuses/update', { status: message }, function (err, data, response) {
      console.log('response');
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
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

  try {
    const date = humanizeDate(entry.datetime);
    const url = `https://fightfordemocracystory.co.il/l/${entry.slug.current}`;
    // test if url is live
    console.log('Checking if page is live...');
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Page not live');
      res.status(500);
      return;
    }
    const message = `${date}\n${entry.title}\n\n${url}`;
    console.log('Posting to Twitter...');
    console.log(message);
    await tweet(message);
    console.log('Posted');

    res.status(200).json({
      message: message,
    });
  } catch {
    console.log('Error posting to Twitter - skipping tweet');
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
