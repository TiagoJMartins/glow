import { Content } from '@/lib/blocks/content/ui';
import { Header } from '@/lib/blocks/header/ui';
import { Stack } from '@/lib/blocks/stack/ui';

import { GitHubCommitsThisMonth } from './github-commits-this-month/ui-client';
import { Image } from './image/ui';
import InstagramLatestPost from './instagram-latest-post/ui-client';
import { LinkBox } from './link-box/ui';
import { Map } from './map/ui';
import SpotifyPlayingNow from './spotify-playing-now/ui-client';
import { Blocks } from './types';

export interface BlockConfig {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

export interface BlockProps {
  blockId: string;
  blockType: Blocks | 'default';
  isEditable: boolean;
  pageId: string;
}

export function renderBlock(block: any, pageId: string, isEditMode: boolean) {
  const sharedProps = {
    blockId: block.id,
    blockType: block.type,
    isEditable: isEditMode,
    pageId,
  };

  switch (block.type) {
    case 'header':
      return <Header {...sharedProps} />;
    case 'content':
      return <Content {...sharedProps} />;
    case 'stack':
      return <Stack {...sharedProps} />;
    case 'image':
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image {...sharedProps} />
      );
    case 'instagram-latest-post':
      return <InstagramLatestPost {...sharedProps} />;
    case 'github-commits-this-month':
      return (
        <GitHubCommitsThisMonth
          {...sharedProps}
          githubUsername={block.data.githubUsername}
        />
      );
    case 'spotify-playing-now':
      return <SpotifyPlayingNow {...sharedProps} />;
    case 'map':
      return <Map {...sharedProps} />;
    case 'link-box':
      return <LinkBox {...sharedProps} />;
  }
}
