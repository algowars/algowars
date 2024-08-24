import { Api } from "@/api/api";
import { DocLink } from "../doc-link.model";
import { AxiosRequestConfig } from "axios";
import { Doc } from "../doc.model";

export class DocsService extends Api {
  private static instance: DocsService;

  private constructor() {
    super();
  }

  public static getInstance(): DocsService {
    if (!DocsService.instance) {
      DocsService.instance = new DocsService();
    }

    return DocsService.instance;
  }

  public getDocFromSlug(slug: string): Promise<Doc> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/docs",
      params: {
        slug,
      },
      headers: { "content-type": "application/json" },
    };

    return this.callExternalApi<Doc>({ config });
  }

  public getLinks(): Promise<DocLink[]> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/docs/links",
      headers: { "content-type": "application/json" },
    };

    return this.callExternalApi<DocLink[]>({ config });
  }
}
