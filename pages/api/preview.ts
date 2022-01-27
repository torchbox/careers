// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function previewLandingPage(
    req: NextApiRequest,
    res: NextApiResponse<{ message: String }>
) {
    const { secret } = req.query;

    if (secret !== process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
        return res.status(401).json({ message: "Invalid token" });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});

    // Redirect to the page being viewed with preview mode
    res.redirect(307, "/");
    res.end();
}
