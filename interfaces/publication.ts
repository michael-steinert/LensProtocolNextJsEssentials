export interface Publication {
  items: Item[];
  pageInfo: PageInfo;
}

export interface Item {
  __typename: string;
  id: string;
  profile: Profile;
  stats: Stats2;
  metadata: Metadata;
  createdAt: string;
  collectModule: CollectModule;
  referenceModule: any;
  appId: any;
  hidden: boolean;
  reaction: any;
  mirrors: any[];
  hasCollectedByMe: boolean;
}

export interface Profile {
  id: string;
  name: any;
  bio: any;
  attributes: Attribute[];
  isFollowedByMe: boolean;
  isFollowing: boolean;
  followNftAddress: any;
  metadata: string;
  isDefault: boolean;
  handle: string;
  picture: any;
  coverPicture: any;
  ownedBy: string;
  dispatcher: any;
  stats: Stats;
  followModule: any;
}

export interface Attribute {
  displayType: any;
  traitType: any;
  key: string;
  value: string;
}

export interface Stats {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
}

export interface Stats2 {
  totalAmountOfMirrors: number;
  totalAmountOfCollects: number;
  totalAmountOfComments: number;
}

export interface Metadata {
  name: string;
  description: string;
  content: string;
  media: any;
  attributes: any[];
}

export interface CollectModule {
  __typename: string;
  type: string;
}

export interface PageInfo {
  prev: string;
  next: string;
  totalCount: number;
}
