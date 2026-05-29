import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Content for Author documents
 */
interface AuthorDocumentData {
	/**
	 * Name field in *Author*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Role field in *Author*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Head Coach & Founder
	 * - **API ID Path**: author.role
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * Bio field in *Author*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.bio
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
	
	/**
	 * Photo field in *Author*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.photo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Instagram field in *Author*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.instagram
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	instagram: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Author document from Prismic
 *
 * - **API ID**: `author`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AuthorDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<AuthorDocumentData>, "author", Lang>;

type BlogPostDocumentDataBodySlice = RichTextSlice | ImageSlice | ImageWithTextSlice | QuoteCalloutSlice | VideoEmbedSlice

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
	/**
	 * Title field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Excerpt field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Short summary for cards and meta description
	 * - **API ID Path**: blog_post.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	excerpt: prismic.RichTextField;
	
	/**
	 * Cover Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.cover_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	cover_image: prismic.ImageField<"Card">;
	
	/**
	 * Publish Date field in *Blog Post*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.publish_date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	publish_date: prismic.DateField;
	
	/**
	 * Category field in *Blog Post*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Camp Life
	 * - **API ID Path**: blog_post.category
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	category: prismic.SelectField<"Surf Tips" | "Travel & Morocco" | "Camp Life" | "Wellness & News", "filled">;
	
	/**
	 * Author field in *Blog Post*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.author
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	author: ContentRelationshipFieldWithData<[{"id":"author","fields":["name","role","bio","instagram","photo"]}]>;
	
	/**
	 * `body` field in *Blog Post*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<BlogPostDocumentDataBodySlice>;/**
	 * SEO Title field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.seo_title
	 * - **Tab**: SEO
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	seo_title: prismic.KeyTextField;
	
	/**
	 * SEO Description field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.seo_description
	 * - **Tab**: SEO
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	seo_description: prismic.KeyTextField;
	
	/**
	 * SEO Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.seo_image
	 * - **Tab**: SEO
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	seo_image: prismic.ImageField<never>;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

export type AllDocumentTypes = AuthorDocument | BlogPostDocument;

/**
 * Primary content in *ImageWithText → Default → Primary*
 */
export interface ImageWithTextSliceDefaultPrimary {
	image: prismic.ImageField<never>;
	caption: prismic.KeyTextField;
	image_position: prismic.SelectField<"left" | "right", "filled">;
	mobile_image_position: prismic.SelectField<"top" | "bottom", "filled">;
	title: prismic.KeyTextField;
	content: prismic.RichTextField;
}

/**
 * Default variation for ImageWithText Slice
 *
 * - **API ID**: `default`
 * - **Description**: An image alongside a title and rich text block
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageWithTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageWithTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ImageWithText*
 */
type ImageWithTextSliceVariation = ImageWithTextSliceDefault

/**
 * ImageWithText Shared Slice
 *
 * - **API ID**: `image_with_text`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageWithTextSlice = prismic.SharedSlice<"image_with_text", ImageWithTextSliceVariation>;

/**
 * Primary content in *Image → Default → Primary*
 */
export interface ImageSliceDefaultPrimary {
	/**
	 * Image field in *Image → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption field in *Image → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Optional caption
	 * - **API ID Path**: image.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Size field in *Image → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: full
	 * - **API ID Path**: image.default.primary.size
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	size: prismic.SelectField<"full" | "narrow", "filled">;
}

/**
 * Default variation for Image Slice
 *
 * - **API ID**: `default`
 * - **Description**: A standalone image with optional caption
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Image*
 */
type ImageSliceVariation = ImageSliceDefault

/**
 * Image Shared Slice
 *
 * - **API ID**: `image`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageSlice = prismic.SharedSlice<"image", ImageSliceVariation>;

/**
 * Primary content in *QuoteCallout → Default → Primary*
 */
export interface QuoteCalloutSliceDefaultPrimary {
	/**
	 * Text field in *QuoteCallout → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Quote or callout text
	 * - **API ID Path**: quote_callout.default.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
	
	/**
	 * Attribution field in *QuoteCallout → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: — Author name or source
	 * - **API ID Path**: quote_callout.default.primary.attribution
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	attribution: prismic.KeyTextField;
	
	/**
	 * Style field in *QuoteCallout → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: quote
	 * - **API ID Path**: quote_callout.default.primary.style
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	style: prismic.SelectField<"quote" | "callout", "filled">;
}

/**
 * Default variation for QuoteCallout Slice
 *
 * - **API ID**: `default`
 * - **Description**: A styled pull quote or callout box
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type QuoteCalloutSliceDefault = prismic.SharedSliceVariation<"default", Simplify<QuoteCalloutSliceDefaultPrimary>, never>;

/**
 * Slice variation for *QuoteCallout*
 */
type QuoteCalloutSliceVariation = QuoteCalloutSliceDefault

/**
 * QuoteCallout Shared Slice
 *
 * - **API ID**: `quote_callout`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type QuoteCalloutSlice = prismic.SharedSlice<"quote_callout", QuoteCalloutSliceVariation>;

/**
 * Primary content in *RichText → Default → Primary*
 */
export interface RichTextSliceDefaultPrimary {
	/**
	 * Content field in *RichText → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: A block of rich text content
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<RichTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSlice = prismic.SharedSlice<"rich_text", RichTextSliceVariation>;

/**
 * Primary content in *VideoEmbed → Default → Primary*
 */
export interface VideoEmbedSliceDefaultPrimary {
	/**
	 * Video Embed field in *VideoEmbed → Default → Primary*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video_embed.default.primary.embed
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	embed: prismic.EmbedField
	
	/**
	 * Caption field in *VideoEmbed → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Optional video caption
	 * - **API ID Path**: video_embed.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Default variation for VideoEmbed Slice
 *
 * - **API ID**: `default`
 * - **Description**: An embedded video (YouTube, Vimeo, etc.)
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoEmbedSliceDefault = prismic.SharedSliceVariation<"default", Simplify<VideoEmbedSliceDefaultPrimary>, never>;

/**
 * Slice variation for *VideoEmbed*
 */
type VideoEmbedSliceVariation = VideoEmbedSliceDefault

/**
 * VideoEmbed Shared Slice
 *
 * - **API ID**: `video_embed`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoEmbedSlice = prismic.SharedSlice<"video_embed", VideoEmbedSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AuthorDocument,
			AuthorDocumentData,
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataBodySlice,
			AllDocumentTypes,
			ImageSlice,
			ImageSliceDefaultPrimary,
			ImageSliceVariation,
			ImageSliceDefault,
			ImageWithTextSlice,
			ImageWithTextSliceDefaultPrimary,
			ImageWithTextSliceVariation,
			ImageWithTextSliceDefault,
			QuoteCalloutSlice,
			QuoteCalloutSliceDefaultPrimary,
			QuoteCalloutSliceVariation,
			QuoteCalloutSliceDefault,
			RichTextSlice,
			RichTextSliceDefaultPrimary,
			RichTextSliceVariation,
			RichTextSliceDefault,
			VideoEmbedSlice,
			VideoEmbedSliceDefaultPrimary,
			VideoEmbedSliceVariation,
			VideoEmbedSliceDefault
		}
	}
}