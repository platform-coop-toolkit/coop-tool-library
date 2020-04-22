const {
	fancyConcat,
	markdownFilter,
	site
} = previewUtil;

const env = nunjucks.configure();

env.addFilter('fancyConcat', fancyConcat);
env.addFilter('markdownFilter', markdownFilter);

const Preview = ({entry, path, context}) => {
	const data = context(entry.get('data').toJS());
	const html = env.render(path, {...data, site});
	return <div dangerouslySetInnerHTML={{__html: html}}/>;
};
