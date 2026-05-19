import { Children, useEffect, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
	content: string;
	components?: Components;
}

let isMermaidInitialized = false;
let mermaidApiPromise: Promise<typeof import("mermaid")["default"]> | null =
	null;
let highlightApiPromise: Promise<
	typeof import("highlight.js")["default"]
> | null = null;
let highlightStylePromise: Promise<unknown> | null = null;

const loadMermaidApi = async () => {
	if (!mermaidApiPromise) {
		mermaidApiPromise = import("mermaid").then((module) => module.default);
	}

	return mermaidApiPromise;
};

const loadHighlightApi = async () => {
	if (!highlightApiPromise) {
		highlightApiPromise = import("highlight.js").then(
			(module) => module.default,
		);
	}

	if (!highlightStylePromise) {
		highlightStylePromise = import("highlight.js/styles/github-dark.css");
	}

	await highlightStylePromise;
	return highlightApiPromise;
};

const initializeMermaid = (mermaidApi: typeof import("mermaid")["default"]) => {
	if (isMermaidInitialized) {
		return;
	}

	mermaidApi.initialize({
		startOnLoad: false,
		securityLevel: "strict",
	});
	isMermaidInitialized = true;
};

const MermaidBlock = ({ code }: { code: string }) => {
	const [svg, setSvg] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const renderMermaid = async () => {
			try {
				setErrorMessage(null);
				const mermaidApi = await loadMermaidApi();
				initializeMermaid(mermaidApi);
				const diagramId = `mermaid-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
				const { svg: renderedSvg } = await mermaidApi.render(diagramId, code);

				if (isMounted) {
					setSvg(renderedSvg);
				}
			} catch (error) {
				if (isMounted) {
					setSvg(null);
					const message =
						error instanceof Error
							? error.message
							: "mermaid図の解析・描画に失敗しました。";
					setErrorMessage(message);
				}
			}
		};

		void renderMermaid();

		return () => {
			isMounted = false;
		};
	}, [code]);

	if (errorMessage) {
		return (
			<div className="markdown-mermaid-error" role="alert">
				<p className="markdown-mermaid-error__title">
					Mermaid図をレンダリングできませんでした。
				</p>
				<p className="markdown-mermaid-error__message">{errorMessage}</p>
				<details className="markdown-mermaid-error__details">
					<summary>入力したmermaidコードを表示</summary>
					<pre className="markdown-code-block">
						<code>{code}</code>
					</pre>
				</details>
			</div>
		);
	}

	if (!svg) {
		return (
			<pre className="markdown-code-block">
				<code>{code}</code>
			</pre>
		);
	}

	return (
		<div className="markdown-mermaid-block">
			<div
				// biome-ignore lint/security/noDangerouslySetInnerHtml: mermaidが生成するSVG文字列を描画するため
				dangerouslySetInnerHTML={{ __html: svg }}
			/>
		</div>
	);
};

const HighlightedCodeBlock = ({
	code,
	language,
}: {
	code: string;
	language?: string;
}) => {
	const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const highlightCode = async () => {
			const highlightApi = await loadHighlightApi();
			const highlighted =
				language && highlightApi.getLanguage(language)
					? highlightApi.highlight(code, { language }).value
					: highlightApi.highlightAuto(code).value;

			if (isMounted) {
				setHighlightedCode(highlighted);
			}
		};

		void highlightCode();

		return () => {
			isMounted = false;
		};
	}, [code, language]);

	if (!highlightedCode) {
		return (
			<pre className="markdown-code-block">
				<code className={language ? `language-${language}` : undefined}>
					{code}
				</code>
			</pre>
		);
	}

	return (
		<pre className="markdown-code-block">
			<code
				className={language ? `hljs language-${language}` : "hljs"}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: highlight.jsのHTMLを描画するため
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
			/>
		</pre>
	);
};

const markdownComponents: Components = {
	code({ className, children, ...props }) {
		const code = Children.toArray(children)
			.map((child) =>
				typeof child === "string" || typeof child === "number"
					? String(child)
					: "",
			)
			.join("")
			.replace(/\n$/, "");
		const language = className?.replace(/^language-/, "");
		const isBlock = Boolean(language) || code.includes("\n");

		if (!isBlock) {
			return (
				<code className={className} {...props}>
					{children}
				</code>
			);
		}

		if (language === "mermaid") {
			return <MermaidBlock code={code} />;
		}

		return <HighlightedCodeBlock code={code} language={language} />;
	},
};

const MarkdownBlock = ({ content, components }: Props) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{ ...markdownComponents, ...components }}
		>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownBlock;
