export const GA_TAG = import.meta.env.VITE_GA_TAG;

export const initGA = () => {
	if (!GA_TAG) return;

	const script1 = document.createElement("script");
	script1.async = true;
	script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`;
	document.head.appendChild(script1);

	const script2 = document.createElement("script");
	script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${GA_TAG}', {
      send_page_view: false
    });
  `;
	document.head.appendChild(script2);
};

export const sendPageView = (path: string) => {
	if (!GA_TAG || !window.gtag) return;

	window.gtag("event", "page_view", {
		page_path: path,
		page_location: window.location.href,
		page_title: document.title,
	});
};
