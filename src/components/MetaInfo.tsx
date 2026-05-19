import { SITE_INFO } from "@/lib/constants";

type Props = {
	title?: string;
	description?: string;
	keywords?: string;
	author?: string;
};

const MetaInfo = (props: Props) => {
	const meta_title = props.title
		? `${props.title} | ${SITE_INFO.TITLE}`
		: SITE_INFO.TITLE;
	const meta_description = props.description || SITE_INFO.DESCRIPTION;
	const meta_keywords = props.keywords || SITE_INFO.KEYWORDS;
	const meta_author = props.author || SITE_INFO.AUTHOR;

	return (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>{meta_title}</title>
			<meta name="title" content={meta_title} />
			<meta name="description" content={meta_description} />
			<meta name="keywords" content={meta_keywords} />
			<meta name="author" content={meta_author} />
			<link rel="icon" href="/favicon.ico" />
		</>
	);
};
export default MetaInfo;
