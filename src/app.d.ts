// the site declares this globally (src/app.d.ts there); its reference components rely on it
interface Footnote {
	text: string;
	url: string;
	year?: number;
	occurrences: number;
}
