import Head from "next/head";

const UniversalHead = () => {
  const seo_image = {
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/default/social_media_share.jpg`,
    width: "1250",
    height: "600",
  };

  return (
    <Head>
      <title key="title">{process.env.NEXT_PUBLIC_SITE_NAME}</title>

      <meta key="oglocale" property="og:locale" content="en" />
      <meta key="ogimage" property="og:image" content={seo_image.url} />
      <meta
        key="ogimageheight"
        property="og:image:height"
        content={seo_image.height}
      />
      <meta
        key="ogimagewidth"
        property="og:image:width"
        content={seo_image.width}
      />
      <meta key="ogimagetype" property="og:image:type" content="image/jpeg" />
      <meta
        key="descripton"
        name="description"
        content="Publisher PWA general description"
      />
      <meta
        property="og:site_name"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta
        key="ogdescription"
        property="og:description"
        content="Publisher PWA general description"
      />
    </Head>
  );
};

export default UniversalHead;
