// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function previewLandingPage(
    req: NextApiRequest,
    res: NextApiResponse<{ message: String }>
) {
    const { secret } = req.query;

    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
        return res.status(401).json({ message: "Invalid token" });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    const url = `/`;
    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
      <script>window.location.href = '${url}'</script>
      </head>`
    );
    res.end();
}
