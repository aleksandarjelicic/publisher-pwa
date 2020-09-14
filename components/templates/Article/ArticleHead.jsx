import Head from "next/head";
import { useAmp } from "next/amp";
import moment from "moment";

const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const fallback_rendition_name = "1250x600";

const ArticleHead = ({ data, route }) => {
  const isAmp = useAmp();
  const title = data.title;
  const description =
    data.swp_article_seo_metadata &&
    data.swp_article_seo_metadata.meta_description
      ? data.swp_article_seo_metadata.meta_description
      : data.lead.replace(/<[^>]+>/g, "");
  const url = domain + data.swp_route.staticprefix + "/" + data.slug;

  let author = data.swp_article_authors.reduce(
    (acc, val, index) =>
      index ? acc + ", " + val.swp_author.name : acc + val.swp_author.name,
    ""
  );
  if (!author.length) author = "Publisher PWA";

  let seo_image = null;
  if (
    data.swp_article_seo_metadata &&
    data.swp_article_seo_metadata.seo_media &&
    data.swp_article_seo_metadata.seo_media.swp_image
  ) {
    seo_image = {
      url: `${media_url}${data.swp_article_seo_metadata.seo_media.swp_image.asset_id}.${data.swp_article_seo_metadata.seo_media.swp_image.file_extension}`,
      width: data.swp_article_seo_metadata.seo_media.swp_image.width,
      height: data.swp_article_seo_metadata.seo_media.swp_image.height,
    };
  }

  if (!seo_image && data.swp_article_feature_media) {
    let fallbackImage = data.swp_article_feature_media.renditions.find(
      (rendition) => rendition.name === fallback_rendition_name
    );
    if (fallbackImage) {
      seo_image = {
        url: `${media_url}${fallbackImage.image.asset_id}.${fallbackImage.image.file_extension}`,
        width: fallbackImage.image.width,
        height: fallbackImage.image.height,
      };
    }
  }

  if (!seo_image) {
    seo_image = {
      url: `${domain}/default/social_media_share.jpg`,
      width: "1250",
      height: "600",
    };
  }

  let og_image = null;
  if (
    data.swp_article_seo_metadata &&
    data.swp_article_seo_metadata.seo_og_media &&
    data.swp_article_seo_metadata.seo_og_media.swp_image
  ) {
    og_image = {
      url: `${media_url}${data.swp_article_seo_metadata.seo_og_media.swp_image.asset_id}.${data.swp_article_seo_metadata.seo_og_media.swp_image.file_extension}`,
      width: data.swp_article_seo_metadata.seo_og_media.swp_image.width,
      height: data.swp_article_seo_metadata.seo_og_media.swp_image.height,
    };
  }

  if (!og_image) og_image = seo_image;

  let twitter_image = null;
  if (
    data.swp_article_seo_metadata &&
    data.swp_article_seo_metadata.seo_twitter_media &&
    data.swp_article_seo_metadata.seo_twitter_media.swp_image
  ) {
    twitter_image = {
      url: `${media_url}${data.swp_article_seo_metadata.seo_twitter_media.swp_image.asset_id}.${data.swp_article_seo_metadata.seo_twitter_media.swp_image.file_extension}`,
      width: data.swp_article_seo_metadata.seo_twitter_media.swp_image.width,
      height: data.swp_article_seo_metadata.seo_twitter_media.swp_image.height,
    };
  }

  if (!twitter_image) twitter_image = seo_image;

  return (
    <Head>
      <title key="title">
        {title} | {process.env.NEXT_PUBLIC_SITE_NAME}
      </title>
      <meta key="description" name="description" content={description} />

      <meta
        key="ogtitle"
        property="og:title"
        content={
          data.swp_article_seo_metadata &&
          data.swp_article_seo_metadata.og_title
            ? data.swp_article_seo_metadata.og_title
            : title
        }
      />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />

      <meta
        key="ogdescription"
        property="og:description"
        content={
          data.swp_article_seo_metadata &&
          data.swp_article_seo_metadata.og_description
            ? data.swp_article_seo_metadata.og_description
            : description
        }
      />
      <meta
        property="article:published_time"
        content={moment(data.published_at).format("YYYY-MM-DD HH:mm:ss")}
      />
      <meta key="oglocale" property="og:locale" content={data.locale} />
      <meta
        property="article:section"
        content={data.swp_route ? data.swp_route.name : ""}
      />

      <meta name="author" content={author} />
      <meta itemProp="name" content={title} />

      <meta name="twitter:widgets:theme" content="light" />
      <meta name="twitter:widgets:link-color" content="#98b96a" />
      <meta name="twitter:widgets:border-color" content="#98b96a" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sourcefabric" />
      <meta name="twitter:creator" content="@sourcefabric" />
      <meta
        name="twitter:title"
        content={
          data.swp_article_seo_metadata &&
          data.swp_article_seo_metadata.twitter_title
            ? data.swp_article_seo_metadata.twitter_title
            : title
        }
      />
      <meta
        name="twitter:description"
        content={
          data.swp_article_seo_metadata &&
          data.swp_article_seo_metadata.twitter_description
            ? data.swp_article_seo_metadata.twitter_description
            : description
        }
      />

      {og_image ? (
        <>
          <meta key="ogimage" property="og:image" content={og_image.url} />
          <meta
            key="ogimageheight"
            property="og:image:height"
            content={og_image.height}
          />
          <meta
            key="ogimagewidth"
            property="og:image:width"
            content={og_image.width}
          />
        </>
      ) : null}

      {twitter_image ? (
        <meta name="twitter:image" content={twitter_image.url} />
      ) : null}
      {isAmp ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
          "@context": "http://chema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": "${domain + route.incomingUri}",
          "headline": "${title}",
          "datePublished": "${moment(data.published_at).format(
            "YYYY-MM-DD HH:mm:ss"
          )}",
          "dateModified": "${moment(data.updated_at).format(
            "YYYY-MM-DD HH:mm:ss"
          )}",
          "description": "${description}",
          "author": {
            "@type": "Person",
            "name": "${author}"
          },
          "publisher": {
            "@type": "Organization",
            "logo": {
              "@type": "ImageObject",
              "url": "${domain}/logo.png",
              "width": 150,
              "height": 66
            },
            "name": "${process.env.NEXT_PUBLIC_SITE_NAME}"
          },
            "image": {
              "@type": "ImageObject",
              "url": "${seo_image.url}",
              "height": ${seo_image.height},
              "width": ${seo_image.width}
            }
          }`,
          }}
        />
      ) : null}
    </Head>
  );
};

export default ArticleHead;
