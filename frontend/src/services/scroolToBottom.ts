export const scrollToBottom = () => {
	window.scroll({
		top: document.body.scrollHeight + 100,
		behavior: 'smooth'
	})
}
