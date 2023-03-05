export interface Profile {
  id: string;
  name: string;
  bio: string;
  attributes: Attribute[];
  followNftAddress: string;
  metadata: string;
  isDefault: boolean;
  picture: Picture;
  handle: string;
  coverPicture: CoverPicture;
  ownedBy: string;
  dispatcher: any;
  stats: Stats;
  followModule: any;
}

export interface Attribute {
  displayType: null;
  traitType: null;
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

export interface Picture {
  original: Original;
  __typename: string;
}

export interface CoverPicture {
  original: Original;
  __typename: string;
}

export interface Original {
  url: string;
  mimeType: any;
}
