export function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})
}
