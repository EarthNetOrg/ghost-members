declare module '@tryghost/admin-api' {
  interface GhostAdminAPIOptions {
    url: string;
    key: string;
    version?: string;
  }

  interface GhostMemberData {
    id: string;
    name?: string;
    email: string;
    status?: string;
    created_at: string;
    updated_at?: string;
    labels?: Array<{ name: string }>;
    newsletters?: Array<{ id: string; name: string }>;
    [key: string]: any;
  }

  interface GhostSiteData {
    title: string;
    [key: string]: any;
  }

  interface GhostBrowseOptions {
    page?: number;
    limit?: number;
    filter?: string;
    include?: string;
    order?: string;
  }

  interface GhostReadOptions {
    id?: string;
    email?: string;
  }

  interface GhostReadIncludeOptions {
    include?: string;
  }

  interface GhostMembersAPI {
    browse(options?: GhostBrowseOptions): Promise<GhostMemberData[]>;
    read(
      options: GhostReadOptions, 
      includeOptions?: GhostReadIncludeOptions
    ): Promise<GhostMemberData>;
  }

  interface GhostSiteAPI {
    read(): Promise<GhostSiteData>;
  }

  export default class GhostAdminAPI {
    constructor(options: GhostAdminAPIOptions);
    members: GhostMembersAPI;
    site: GhostSiteAPI;
  }
}