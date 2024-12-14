import type {
  PartialPostMeta,
  Post,
  PostMeta,
} from './types';
import { promises as Fs } from 'fs';
import path from 'path';

async function loadMeta (path: string): Promise<PartialPostMeta> {
  try {
    const metaBuffer = await Fs.readFile(path);

    return JSON.parse(await metaBuffer.toString());
  } catch (error) {
    if ((error as Error).message.includes('ENOENT')) {
      return {};
    }

    throw error;
  }
}

export default class BlogPost implements Post {
  content?: string;
  created: Date;
  slug: string;
  title: string;
  updated?: Date;

  private path: string;

  constructor (path: string, meta: PostMeta) {
    this.created = new Date(meta.created);
    this.slug = meta.slug;
    this.title = meta.title;
    this.updated = meta.updated ? new Date(meta.updated) : undefined;
    this.path = path;

    return this;
  }

  async loadContent () {
    if (typeof this.content === 'string') {
      return this.content;
    }

    const contentBuffer = await Fs.readFile(path.join(this.path, 'content.md'));

    this.content = await contentBuffer.toString();

    return this.content;
  }

  static async fromPath (postPath: string) {
    const defaultSlug = path.basename(postPath);

    const [
      meta,
      defaultStats,
    ] = await Promise.all([
      loadMeta(path.join(postPath, 'meta.json')),
      Fs.lstat(postPath),
    ]);

    const defaults: PostMeta = {
      created: defaultStats.ctime.toISOString(),
      slug: defaultSlug,
      title: defaultSlug,
    };

    return new BlogPost(postPath, {
      ...defaults,
      ...meta,
    });
  }
}
